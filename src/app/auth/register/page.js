"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Eye, EyeOff, Loader2 } from "lucide-react"; // Import Lucid icons

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Basic client-side validation for minimum password length
      if (formData.password.length < 6) {
        throw new Error("Password must be at least 6 characters long.");
      }

      const userCredential = await createUserWithEmailWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Update display name
      await updateProfile(userCredential.user, {
        displayName: formData.name,
      });

      // Clear form data on success (optional)
      setFormData({ name: "", email: "", password: "" });

      // Use router.replace to prevent going back to register page after successful login
      router.replace("/blogs");

    } catch (err) {
      // Improve error message parsing for better UX
      const errorCode = err.code;
      let errorMessage = "Registration failed. Please try again.";

      if (errorCode === "auth/email-already-in-use") {
        errorMessage = "This email address is already in use.";
      } else if (errorCode === "auth/invalid-email") {
        errorMessage = "The email address is not valid.";
      } else if (errorCode === "auth/weak-password") {
        errorMessage = "The password is too weak. Must be at least 6 characters.";
      } else {
        // Fallback for other errors
        errorMessage = err.message.replace("Firebase: ", "");
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-gray-50 justify-center items-center min-h-screen px-4 sm:px-6">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8 sm:p-10 border border-gray-200">

        {/* Header */}
        <h2 className="text-3xl font-extrabold mb-2 text-center text-indigo-700">
          Join SimpleBlog
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Create an account to start sharing your stories.
        </p>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded-lg mb-4 text-center" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Input */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 text-gray-900 py-3 border border-gray-300 rounded-lg placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          />

          {/* Email Input */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-lg placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          />

          {/* Password Input with Toggle */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password (min. 6 characters)"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full px-4 pr-12 py-3 text-gray-900 border border-gray-300 rounded-lg placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-indigo-700 transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center py-3 bg-indigo-700 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Registering...
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>

        {/* Link to Login */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/auth/login" className="font-medium text-indigo-700 hover:text-indigo-500">
            Log In
          </Link>
        </p>

      </div>
    </div>
  );
}