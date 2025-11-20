"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function BlogForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    imageUrl: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create blog");
      }

      alert("Blog created successfully!");
      router.push("/blogs");
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* Title */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
          placeholder="Enter your blog title"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">Description</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
          placeholder="Brief description of your post"
        />
      </div>

      {/* Content */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">Content</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleInputChange}
          required
          rows="10"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
          placeholder="Write your full blog content here..."
        />
      </div>

      {/* Image URL */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">Image URL</label>
        <input
          type="url"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
          placeholder="https://example.com/image.jpg"
        />
        {formData.imageUrl && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600 mb-3 font-medium">Image Preview</p>
            <div className="relative h-48 w-full rounded-lg overflow-hidden bg-gray-100">
              <Image src={formData.imageUrl} alt="Preview" fill className="object-cover" />
            </div>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex gap-3 pt-4">
  <button
    type="submit"
    disabled={loading}
    className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
      loading
        ? "bg-gray-400 text-white cursor-not-allowed"
        : "bg-indigo-600 text-white hover:bg-indigo-700"
    }`}
  >
    {loading ? "Publishing..." : "Publish Post"}
  </button>
  <button
    type="button"
    onClick={() => router.push("/blogs")}
    className="flex-1 bg-gray-200 text-gray-900 py-3 rounded-lg hover:bg-gray-300 font-medium transition-colors"
  >
    Cancel
  </button>
</div>
    </form>
  );
}
