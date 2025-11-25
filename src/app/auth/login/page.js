// app/auth/login/page.js
"use client";
import LoginForm from "@/components/LoginForm";
import Link from "next/link";
import { Suspense } from "react";

export default function LoginPage() {
    return (
        <div className="flex bg-gray-50 justify-center items-center min-h-screen py-10 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                {/* Header */}
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
                    <h2 className="text-xl font-bold mb-6 text-center text-black/70">
                        Login to SimpleBlog
                    </h2>

                    {/* Client-side LoginForm */}
                    <Suspense fallback={<div>Loading login form...</div>}>
                        <LoginForm />
                    </Suspense>
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
