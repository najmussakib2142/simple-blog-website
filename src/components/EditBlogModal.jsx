"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X } from 'lucide-react';
import { useAuth } from "@/context/AuthContext";
export default function EditBlogModal({ blog, id }) {
    const { user } = useAuth();
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState(blog);
    const [isLoading, setIsLoading] = useState(false); // New: Loading state for UX
    const [error, setError] = useState(null); // New: Error state
    const router = useRouter();

    // 1. Logic: Handle ESC key press to close the modal
    useEffect(() => {
        const handleKeydown = (event) => {
            if (event.key === 'Escape') {
                setOpen(false);
            }
        };
        if (open) {
            document.addEventListener('keydown', handleKeydown);
            // Focus trap (simple implementation: focus the close button when opened)
            // document.getElementById('modal-close-button')?.focus();
        }
        return () => {
            document.removeEventListener('keydown', handleKeydown);
        };
    }, [open]);


    const handleChange = (e) => {
        // Clear any previous error when the user starts typing
        if (error) setError(null);
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Start loading
        setError(null); // Clear previous errors

        try {
            const token = await user.getIdToken();

            const res = await fetch(`/api/blogs/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                // Success path
                setOpen(false);
                router.refresh();
                alert("Blog updated successfully!"); // Refresh content on the page
                // Consider adding a toast notification here instead of alert()
            } else {
                // Error path
                const data = await res.json();
                // Set a specific error message from the API or a generic one
                setError(data.message || "Failed to update blog. Please try again.");
            }
        } catch (err) {
            setError("A network error occurred. Check your connection.");
        } finally {
            setIsLoading(false); // Stop loading regardless of outcome
        }
    };

    return (
        <>
            {/* 2. Button: Updated for better visual and to open the modal */}
            <button
                onClick={() => setOpen(true)}
                className="px-4 py-2.5  text-sm font-medium rounded-md bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 transition duration-150 transform hover:scale-[1.02]"
            >
                ✏️ Edit Blog
            </button>

            {/* 3. Conditional Render: Only render the modal structure if 'open' is true */}
            {open && (
                <div
                    className="fixed inset-0 pt-10 pb-20 overflow-y-auto z-50 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ease-out"
                    aria-modal="true"
                    role="dialog"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            setOpen(false);
                        }
                    }}
                >
                    {/* Modal Content Container */}
                    <div
                        className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl max-w-2xl w-full mx-auto my-0 relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button inside modal for better UX */}
                        <button
                            id="modal-close-button"
                            onClick={() => setOpen(false)}
                            className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                            aria-label="Close modal"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">
                            📝 Edit Blog Post
                        </h2>

                        {/* 4. Error Display */}
                        {error && (
                            <div className="p-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-900 dark:text-red-300" role="alert">
                                ❌ {error}
                            </div>

                        )}
                        {/* console.log(error.message) */}

                        <form onSubmit={handleUpdate} className="space-y-5">
                            {/* Input Fields (Styling kept from your provided upgraded version) */}
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                                <input id="title" name="title" value={formData.title} onChange={handleChange} className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150" placeholder="The exciting title of your blog post" required />
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Short Description</label>
                                <input id="description" name="description" value={formData.description} onChange={handleChange} className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150" placeholder="A brief summary for previews" required />
                            </div>

                            <div>
                                <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Content</label>
                                <textarea id="content" name="content" value={formData.content} onChange={handleChange} rows={6} className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 resize-y" placeholder="Write the full content of your blog post here..." required />
                            </div>

                            <div>
                                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image URL</label>
                                <input id="imageUrl" name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150" placeholder="https://example.com/image.jpg" />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    disabled={isLoading} // Disable cancel button during loading
                                    className="px-6 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-150 disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading} // 5. Disable during loading
                                    className="px-6 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 disabled:bg-indigo-400 disabled:cursor-not-allowed"
                                >
                                    {/* 6. Display Loading Text */}
                                    {isLoading ? (
                                        <div className="flex items-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Updating...
                                        </div>
                                    ) : (
                                        'Save Changes'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}