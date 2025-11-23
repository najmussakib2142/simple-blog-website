"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link'; // Import Link for the Register link
import { loginUser } from "@/lib/auth";
import { ArrowRight, Eye, EyeOff, Loader2 } from 'lucide-react'; // Example icons (assuming you use lucide-react or similar)

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false); // State for password visibility


    const handleChange = (e) =>
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const { email, password } = formData;
            await loginUser(email, password);
            router.push("/");
        } catch (err) {
            // Display only the message portion of the error
            setError(err.message || "An unknown error occurred during login.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex bg-gray-50 justify-center items-center min-h-screen py-10 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-lg space-y-8">

                {/* Header/Title Section */}
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-indigo-700 tracking-tight">
                        Welcome Back
                    </h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Sign in to access your dashboard and create new posts.
                    </p>
                </div>

                {/* Login Card */}
                <div className="bg-white py-8 px-4 shadow-2xl rounded-xl sm:px-10 border border-gray-100">

                    <h2 className="text-xl font-bold mb-6 text-center text-black/70">Login to SimpleBlog</h2>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm mb-5 text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email address
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                required
                                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out sm:text-sm shadow-sm"
                            />
                        </div>

                        {/* Password Input */}
                        <div className="relative">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                required
                                className="appearance-none relative block w-full px-3 py-3 pr-10 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out sm:text-sm shadow-sm"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 top-2.5 bottom-2.5 h-full flex items-center pr-3 text-gray-500 hover:text-indigo-700 transition-colors focus:outline-none"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>

                        {/* Forgot Password / Remember Me */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                {/* Optional: Remember Me checkbox */}
                                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4  text-indigo-700 focus:ring-indigo-500 border-gray-300 rounded" />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>
                            <div className="text-sm">
                                <a href="#" className="font-medium text-indigo-700 hover:text-indigo-500 transition-colors">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white shadow-md transition duration-200 ease-in-out
                                ${loading
                                        ? "bg-indigo-400 cursor-not-allowed"
                                        : "bg-indigo-700 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    }`}
                            >
                                {loading ? (
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                ) : (
                                    <ArrowRight className="h-5 w-5 mr-2 -ml-1 opacity-80 group-hover:opacity-100 transition-opacity" />
                                )}
                                {loading ? "Signing In..." : "Sign In"}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Register Link */}
                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Don&apos;t have an account?
                        <Link href="/auth/register" className="font-medium text-indigo-700 hover:text-indigo-500 ml-1 transition-colors">
                            Sign up here
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
}