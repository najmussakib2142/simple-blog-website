"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import Swal from "sweetalert2";

export default function BlogForm() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    imageUrl: "",
    author: "Unknown Author",
    authorUid: "",
    authorEmail: "",
    authorImage: "",
    category: "",
    tags: [],
    featured: false,
    status: "published",
    slug: "",
  });
  const [imageUploading, setImageUploading] = useState(false);


  // Set author info from user
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        author: user.displayName || user.email || "Unknown Author",
        authorUid: user.uid,
        authorEmail: user.email,
        authorImage: user.photoURL || "",
      }));
    }
  }, [user]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "tags") {
      // Convert comma-separated string into array
      setFormData((prev) => ({ ...prev, tags: value.split(",").map(tag => tag.trim()) }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Auto-generate slug from title
    if (name === "title") {
      const slug = value
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "");
      setFormData((prev) => ({ ...prev, slug }));
    }
  };

  // Handle image upload via Cloudinary
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageUploading(true); // start loader

    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD}/image/upload`,

        // "https://api.cloudinary.com/v1_1/dgamudw6a/image/upload",
        {
          method: "POST",
          body: form,
        }
      );

      const data = await res.json();

      setFormData((prev) => ({
        ...prev,
        imageUrl: data.secure_url,
      }));
    } catch (err) {
      console.error(err);
    } finally {
      setImageUploading(false); // stop loader
    }
  };


  // Submit blog
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = await user.getIdToken();
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        Swal.fire({ icon: "error", title: "Error", text: error.error || "Failed to create blog" });
      } else {
        Swal.fire({ icon: "success", title: "Success!", text: "Blog created successfully!", timer: 1500, showConfirmButton: false });
        router.push("/blogs");
      }
    } catch (err) {
      Swal.fire({ icon: "error", title: "Error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  console.log(" FOrm data", formData)

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Title */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">Title</label>
        <input type="text" name="title" value={formData.title} onChange={handleInputChange} required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
          placeholder="Enter your blog title" />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">Description</label>
        <input type="text" name="description" value={formData.description} onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
          placeholder="Brief description of your post" />
      </div>

      {/* Content */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">Content</label>
        <textarea name="content" value={formData.content} onChange={handleInputChange} required rows="10"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
          placeholder="Write your full blog content here..." />
      </div>

      <div className="flex-col md:flex gap-10 md:justify-between md:flex-row md:items-center">
        {/* Category */}
        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-900 mb-2">Category</label>
          <select name="category" value={formData.category} onChange={handleInputChange} required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-gray-900">
            <option className="" value="">Select category</option>
            <option value="Tech">Tech</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Business">Business</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
            <option value="Travel">Travel</option>
          </select>
        </div>

        {/* Status */}
        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-900 mb-2">Status</label>
          <select name="status" value={formData.status} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-gray-900">
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">Tags (comma separated)</label>
        <input type="text" name="tags" value={formData.tags.join(", ")} onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
          placeholder="React, Next.js, Cloudinary" />
      </div>

      {/* Featured */}
      <div className="flex items-center gap-2">
        <input type="checkbox" name="featured" checked={formData.featured} onChange={handleInputChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded" />
        <label className="text-sm text-gray-900">Mark as Featured</label>
      </div>



      {/* Image Upload */}
      <div className="w-full">
        <label className="block text-sm font-semibold text-gray-900 mb-2">Upload Image</label>

        {/* Modern File Input */}
        <label className="flex items-center justify-center w-full h-16 px-4 py-3 bg-white border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-colors duration-200 text-gray-600">
          <span className="mr-2">📁</span>
          <span className="text-sm">Click or drag to upload</span>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
        </label>

        {/* Loader */}
        {imageUploading && (
          <div className="mt-4 p-4 bg-white rounded-xl border border-gray-200 shadow-sm flex items-center gap-3">
            <div className="border-4 border-gray-300 border-t-indigo-600 rounded-full w-8 h-8 animate-spin"></div>
            <p className="text-sm text-gray-600">Uploading image…</p>
          </div>
        )}

        {/* Preview */}
        {!imageUploading && formData.imageUrl && (
          <div className="mt-4 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
            <p className="text-sm text-gray-600 mb-3 font-medium">Image Preview</p>
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


      {/* Submit */}
      <div className="flex gap-3 pt-4">
        <button type="submit" disabled={loading} className={`flex-1 py-3 rounded-lg font-medium transition-colors ${loading ? "bg-gray-400 text-white cursor-not-allowed" : "bg-indigo-700 text-white hover:bg-indigo-700"}`}>
          {loading ? "Publishing..." : "Publish Post"}
        </button>
        <button type="button" onClick={() => router.push("/blogs")} className="flex-1 bg-gray-200 text-gray-900 py-3 rounded-lg hover:bg-gray-300 font-medium transition-colors">
          Cancel
        </button>
      </div>
    </form>
  );
}
