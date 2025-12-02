"use client";

import Link from "next/link";
import { Suspense } from "react";
import RegisterForm from "@/components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="flex bg-gray-50 py-12 md:py-16 min-h-screen justify-center items-center  px-4 sm:px-6">
      
        <Suspense fallback={<div>Loading form...</div>}>
          <RegisterForm />
        </Suspense>

        
    </div>
  );
}
