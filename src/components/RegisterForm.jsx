"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/blogs";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    imageUrl: "", // Added here for preview
  });

  const [image, setImage] = useState(null); // raw File object
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  async function uploadToCloudinary(file) {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD}/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    const result = await res.json();
    return result.secure_url;
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageUploading(true);
    setImage(file); // save raw file for submit

    try {
      const url = await uploadToCloudinary(file);
      setFormData((prev) => ({ ...prev, imageUrl: url }));
    } catch (err) {
      console.error(err);
      setError("Image upload failed.");
    } finally {
      setImageUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (formData.password.length < 6) {
        throw new Error("Password must be at least 6 characters long.");
      }

      let photoURL = formData.imageUrl || "";

      // Register user in Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Update Firebase profile
      await updateProfile(userCredential.user, {
        displayName: formData.name,
        photoURL: photoURL || null,
      });

      // Save user to MongoDB
      await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: userCredential.user.uid,
          name: formData.name,
          email: formData.email,
          photoURL: photoURL || "",
        }),
      });

      setFormData({ name: "", email: "", password: "", imageUrl: "" });
      setImage(null);
      router.replace(redirect);
    } catch (err) {
      let msg = err.message || "Registration failed.";
      if (msg.includes("Firebase:")) msg = msg.replace("Firebase: ", "");
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5 bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8 sm:p-10 border border-gray-200">
        <h2 className="text-3xl font-extrabold mb-2 text-center text-indigo-700">
          Join SimpleBlog
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Create an account to start sharing your stories.
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-lg"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-lg"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password (min. 6 characters)"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full px-4 pr-12 py-3 text-gray-900 border border-gray-300 rounded-lg"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          {/* Image Upload */}
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Upload Image (optional)
            </label>
            <label className="flex items-center justify-center w-full h-16 px-4 py-3 bg-white border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-colors duration-200 text-gray-600">
              <span className="mr-2">📁</span>
              <span className="text-sm">Click or drag to upload</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>

            {imageUploading && (
              <div className="mt-4 p-4 bg-white rounded-xl border border-gray-200 shadow-sm flex items-center gap-3">
                <Loader2 className="h-5 w-5 animate-spin text-indigo-600" />
                <p className="text-sm text-gray-600">Uploading image…</p>
              </div>
            )}

            {formData.imageUrl && !imageUploading && (
              <div className="mt-4 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                <p className="text-sm text-gray-600 mb-3 font-medium">Preview</p>
                <div className="relative w-full h-56 rounded-lg overflow-hidden bg-gray-100 shadow-inner">
                  <Image
                    src={formData.imageUrl}
                    alt="Preview"
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center py-3 bg-indigo-700 text-white rounded-lg hover:bg-indigo-800 font-semibold shadow-md disabled:opacity-70"
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

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href={`/auth/login?redirect=${redirect}`}
            className="font-medium text-indigo-700 hover:text-indigo-500"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
