"use client";
// import { useState } from "react";

export default function RegisterPage() {
  return (
    <div className="flex justify-center items-center p-20 ">
      <div className="card  w-full max-w-sm  p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Create Account</h2>

        <form className="space-y-4">
          <input type="text" placeholder="Name" className="input input-bordered w-full" />
          <input type="email" placeholder="Email" className="input input-bordered w-full" />
          <input type="password" placeholder="Password" className="input input-bordered w-full" />

          <button className="btn border border-gray-500 w-full mt-2">Register</button>
        </form>
      </div>
    </div>
  );
}
