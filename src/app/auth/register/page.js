"use client";

import Link from "next/link";
import { Suspense } from "react";
import RegisterForm from "@/components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="flex bg-gray-50 py-12 md:py-16 min-h-screen justify-center items-center  px-4 sm:px-6">
      {/* <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8 sm:p-10 border border-gray-200"> */}
        {/* <h2 className="text-3xl font-extrabold mb-2 text-center text-indigo-700">
          Join SimpleBlog
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Create an account to start sharing your stories.
        </p> */}

        {/* ✅ Wrap RegisterForm in Suspense */}
        <Suspense fallback={<div>Loading form...</div>}>
          <RegisterForm />
        </Suspense>

        {/* <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/auth/login" className="font-medium text-indigo-700 hover:text-indigo-500">
            Log In
          </Link>
        </p> */}
      {/* </div> */}
    </div>
  );
}
