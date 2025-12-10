"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { X } from "lucide-react";
import Swal from "sweetalert2";
import { useAuth } from "@/context/AuthContext";
import { getAuthToken } from "@/lib/auth/authHelpers";
import DrawOutlineButton from "./DrawOutlineButton";

export default function EditBlogModal({ blog, id, context = "detail" }) {
    const { user } = useAuth();
    const router = useRouter();

    const [mounted, setMounted] = useState(false); // hydration-safe
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [imageUploading, setImageUploading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState(blog);

    useEffect(() => setMounted(true), []);

    // ESC key to close modal
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "Escape" && !isLoading) setOpen(false);
        };
        if (open) document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [open, isLoading]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name === "tags") {
            setFormData((prev) => ({
                ...prev,
                tags: value.split(",").map((tag) => tag.trim()).filter(Boolean),
            }));
        } else if (type === "checkbox") {
            setFormData((prev) => ({ ...prev, [name]: checked }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }

        if (name === "title") {
            const slug = value
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^\w-]+/g, "");
            setFormData((prev) => ({ ...prev, slug }));
        }
    };

    // Cloudinary Image Upload
    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setImageUploading(true);
        try {
            const form = new FormData();
            form.append("file", file);
            form.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET);

            const res = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD}/image/upload`,
                { method: "POST", body: form }
            );
            const data = await res.json();

            if (!data?.secure_url) throw new Error("Upload failed");

            setFormData((prev) => ({ ...prev, imageUrl: data.secure_url }));
        } catch (err) {
            Swal.fire("Error", "Image upload failed", "error");
        } finally {
            setImageUploading(false);
        }
    };

    // Submit update
    const handleUpdate = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            if (!user) throw new Error("You must be logged in");

            const token = await getAuthToken();

            const res = await fetch(`/api/blogs/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Update failed");

            setOpen(false);
            router.refresh();
            Swal.fire({ title: "Updated!", text: "Blog updated successfully!", icon: "success", timer: 2000, showConfirmButton: false });
        } catch (err) {
            setError(err.message);
            Swal.fire("Error", err.message, "error");
        } finally {
            setIsLoading(false);
        }
    };

    if (!mounted) return null;

    return (
        <>
            {/* Trigger Button */}
            <button
                onClick={() => setOpen(true)}
                className={context === "table"
                    ? "p-1.5 text-black border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-150"
                    : "flex items-center space-x-2 px-4 py-2.5 bg-white border border-gray-600 hover:border-black text-black text-sm font-medium shadow-md hover:shadow-lg hover:bg-gray-50"}
            >
                <X className="w-5 h-5" />
                {context !== "table" && <span>Edit Blog</span>}
            </button>

            {/* <DrawOutlineButton>
                <span className="flex text-black items-center space-x-1">
                    <span>Edit Blog</span>
                </span>
            </DrawOutlineButton> */}

            {/* Modal */}
            {open && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center px-4 py-4 md:py-10 bg-black/80 backdrop-blur-sm overflow-y-auto"
                    onClick={(e) => e.target === e.currentTarget && !isLoading && setOpen(false)}
                >
                    <div
                        className="relative w-full max-w-3xl bg-white rounded-sm shadow-2xl max-h-[90vh] overflow-y-auto overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close */}
                        <button
                            className="absolute top-4 right-4 p-2 bg-gray-300 rounded-full hover:bg-gray-500"
                            onClick={() => setOpen(false)}
                        >
                            <X size={22} />
                        </button>

                        <div className="px-4 md:px-6  py-8 md:py-8 space-y-6">
                            <h2 className="text-2xl text-black font-bold">📝 Edit Blog</h2>

                            {error && <div className="p-3 bg-red-50 text-red-700 rounded-lg">{error}</div>}

                            <form className="space-y-5" onSubmit={handleUpdate}>
                                {/* Title */}
                                <div>
                                    <label className="block text-sm font-semibold text-black mb-1">Title</label>
                                    <input type="text" name="title" value={formData.title} onChange={handleChange} required
                                        className="w-full text-gray-900 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/40 bg-white" />
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-semibold text-black mb-1">Description</label>
                                    <input type="text" name="description" value={formData.description} onChange={handleChange}
                                        className="w-full px-4 text-gray-900 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/40 bg-white" />
                                </div>

                                {/* Content */}
                                <div>
                                    <label className="block text-sm font-semibold text-black mb-1">Content</label>
                                    <textarea name="content" value={formData.content} onChange={handleChange} rows={8}
                                        className="w-full text-gray-900 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/40 bg-white" />
                                </div>

                                {/* Category + Status */}
                                <div className="flex flex-col md:flex-row gap-4">
                                    <div className="flex-1">
                                        <label className="block text-sm font-semibold text-black mb-1">Category</label>
                                        <select name="category" value={formData.category} onChange={handleChange} required
                                            className="w-full px-4 py-3 border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/40 bg-white">
                                            <option value="">Select category</option>
                                            <option value="Tech">Tech</option>
                                            <option value="Lifestyle">Lifestyle</option>
                                            <option value="Business">Business</option>
                                            <option value="Health">Health</option>
                                            <option value="Education">Education</option>
                                            <option value="Travel">Travel</option>
                                        </select>
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-sm font-semibold text-black mb-1">Status</label>
                                        <select name="status" value={formData.status} onChange={handleChange}
                                            className="w-full px-4 text-gray-900 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/40 bg-white">
                                            <option value="published">Published</option>
                                            <option value="draft">Draft</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Tags */}
                                <div>
                                    <label className="block text-sm font-semibold text-black mb-1">Tags (comma separated)</label>
                                    <input type="text" name="tags" value={formData.tags.join(", ")} onChange={handleChange}
                                        className="w-full text-gray-900 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/40 bg-white"
                                        placeholder="React, Next.js, Cloudinary" />
                                </div>

                                {/* Featured */}
                                {user?.role === "admin" && (
                                    <div className="flex items-center gap-2">
                                        <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} />
                                        <label className="text-black font-medium">Mark as Featured</label>
                                    </div>
                                )}

                                {/* Image */}
                                <div className="w-full">
                                    <label className="block text-sm font-semibold text-black mb-1">Image</label>
                                    <label className="flex items-center justify-center w-full h-16 px-4 py-3 bg-white border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-black/40 hover:bg-gray-50 transition-colors duration-200 text-gray-600">
                                        <span className="mr-2">📁</span>
                                        <span className="text-sm">Click or drag to upload</span>
                                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                    </label>

                                    {imageUploading && (
                                        <div className="mt-4 p-4 bg-white rounded-xl border border-gray-200 shadow-sm flex items-center gap-3">
                                            <div className="border-4 border-gray-300 border-t-black/40 rounded-full w-8 h-8 animate-spin"></div>
                                            <p className="text-sm text-gray-600">Uploading image…</p>
                                        </div>
                                    )}

                                    {!imageUploading && formData.imageUrl && (
                                        <div className="mt-4">
                                            <div className="relative w-full h-56 rounded-lg overflow-hidden bg-gray-100">
                                                <Image src={formData.imageUrl} alt="Preview" fill className="object-cover transition-transform duration-300 hover:scale-105" />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Buttons */}
                                <div className="flex gap-3 pt-4">
                                    <button type="submit" disabled={isLoading || imageUploading}
                                        className={`flex-1 py-3  font-medium transition-colors ${isLoading ? "bg-gray-400 text-white cursor-not-allowed" : "bg-black text-white hover:bg-gray-900"}`}>
                                        {isLoading ? "Updating..." : "Save Changes"}
                                    </button>

                                    <button type="button" onClick={() => setOpen(false)}
                                        className="flex-1 py-3  text-red-600 border border-red-600 font-medium bg-gray-100 hover:font-semibold">
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
