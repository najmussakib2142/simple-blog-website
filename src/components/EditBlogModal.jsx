"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// Import the correct icon from lucide-react (assuming this is used for the close button)
import { X } from 'lucide-react';
import { useAuth } from "@/context/AuthContext";
// Import SweetAlert2
import Swal from 'sweetalert2';

// Assuming you have an icon for the edit button, using the lucide X and a placeholder for the edit icon
const EditIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 18.07a4.99 4.99 0 0 1-1.636 1.487l-2.484.83a.75.75 0 0 1-.951-.951l.83-2.484a4.99 4.99 0 0 1 1.487-1.636L16.862 4.487Zm0 0L19.5 7.125" />
    </svg>
);


export default function EditBlogModal({ blog, id, context = 'detail' }) {
    const { user } = useAuth();
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState(blog);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();

    // 1. Logic: Handle ESC key press to close the modal
    useEffect(() => {
        const handleKeydown = (event) => {
            if (event.key === 'Escape' && !isLoading) { // Prevent closing if loading
                setOpen(false);
            }
        };
        if (open) {
            document.addEventListener('keydown', handleKeydown);
            // document.getElementById('modal-close-button')?.focus();
        }
        return () => {
            document.removeEventListener('keydown', handleKeydown);
        };
    }, [open, isLoading]);


    const handleChange = (e) => {
        // Clear any previous error when the user starts typing
        if (error) setError(null);
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const token = await user.token;

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

                // 🛑 REPLACED alert() with SweetAlert2 
                Swal.fire({
                    title: "Updated!",
                    text: "Blog updated successfully!",
                    icon: "success",
                    confirmButtonColor: "#000000",
                    timer: 3000,
                    showConfirmButton: false
                });

            } else {
                // Error path
                const data = await res.json();
                const apiError = data.message || "Failed to update blog. Please try again.";
                setError(apiError);

                // 🛑 SweetAlert2 for API Error
                Swal.fire({
                    title: "Update Failed",
                    text: apiError,
                    icon: "error",
                    confirmButtonColor: "#000000"
                });
            }
        } catch (err) {
            const networkError = "A network error occurred. Check your connection.";
            setError(networkError);

            // 🛑 SweetAlert2 for Network Error
            Swal.fire({
                title: "Error",
                text: networkError,
                icon: "error",
                confirmButtonColor: "#000000"
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* 2. Button: Non-traditional button based on context (Black/White/Grayscale Theme) */}
            {context === 'table' ? (
                // Table Button: Icon-only, subtle, border-based for a cleaner row action
                <button
                    onClick={() => setOpen(true)}
                    className="p-1.5 text-black border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-150 transform hover:shadow-sm"
                    aria-label="Edit Blog"
                    disabled={isLoading}
                >
                    <EditIcon className="w-4 h-4" />
                </button>
            ) : (
                // Detail/Author Button: Prominent, floating style action
                <button
                    onClick={() => setOpen(true)}
                    // Monochrome Button Style
                    className="flex items-center space-x-2 px-4 py-2.5 bg-white border border-black text-black text-sm font-medium shadow-md transition duration-150 transform hover:shadow-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading}
                >
                    <EditIcon className="w-5 h-5" />
                    <span>Edit Blog Details</span>
                </button>
            )}

            {/* 3. Conditional Render: Only render the modal structure if 'open' is true */}
            {open && (
                <div
                    // Monochrome Backdrop: Dark and blurred
                    className="fixed inset-0 pt-10 pb-20 overflow-y-auto z-50 bg-black/90 backdrop-blur-sm transition-opacity duration-300 ease-out"
                    aria-modal="true"
                    role="dialog"
                    onClick={(e) => {
                        // Prevent closing if loading or if click is on the modal content
                        if (e.target === e.currentTarget && !isLoading) {
                            setOpen(false);
                        }
                    }}
                >
                    {/* Modal Content Container: Black and White Theme */}
                    <div
                        className="bg-white p-8 rounded-xl shadow-2xl max-w-3xl w-full mx-auto my-0 relative border border-gray-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button inside modal for better UX */}
                        <button
                            id="modal-close-button"
                            onClick={() => !isLoading && setOpen(false)}
                            disabled={isLoading}
                            // Monochrome Close Button
                            className="absolute top-4 right-4 p-1 rounded-full text-black hover:bg-gray-100 transition disabled:opacity-50"
                            aria-label="Close modal"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <h2 className="text-2xl font-extrabold text-black mb-6 border-b border-gray-300 pb-2">
                            📝 Edit Blog Post
                        </h2>

                        {/* 4. Error Display (Kept the alert box style as a local visual indicator alongside Swal) */}
                        {error && (
                            <div className="p-3 mb-4 text-sm text-red-700 rounded-lg bg-red-50 border border-red-200" role="alert">
                                ❌ {error}
                            </div>
                        )}

                        <form onSubmit={handleUpdate} className="space-y-5">
                            {/* Input Fields: Monochrome focus style */}
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-black mb-1">Title</label>
                                <input
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    // Monochrome Input Style
                                    className="w-full text-gray-800 border border-gray-400 bg-white p-3 rounded-none focus:ring-0 focus:border-black transition duration-150"
                                    placeholder="The exciting title of your blog post"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-black mb-1">Short Description</label>
                                <input
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    // Monochrome Input Style
                                    className="w-full text-gray-800 border border-gray-400 bg-white p-3 rounded-none focus:ring-0 focus:border-black transition duration-150"
                                    placeholder="A brief summary for previews"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="content" className="block text-sm font-medium text-black mb-1">Content</label>
                                <textarea
                                    id="content"
                                    name="content"
                                    value={formData.content}
                                    onChange={handleChange}
                                    rows={6}
                                    // Monochrome Input Style
                                    className="w-full text-gray-800 border border-gray-400 bg-white p-3 rounded-none focus:ring-0 focus:border-black transition duration-150 resize-y"
                                    placeholder="Write the full content of your blog post here..."
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="imageUrl" className="block text-sm font-medium text-black mb-1">Image URL</label>
                                <input
                                    id="imageUrl"
                                    name="imageUrl"
                                    value={formData.imageUrl}
                                    onChange={handleChange}
                                    // Monochrome Input Style
                                    className="w-full text-gray-800 border border-gray-400 bg-white p-3 rounded-none focus:ring-0 focus:border-black transition duration-150"
                                    placeholder="https://example.com/image.jpg"
                                />
                            </div>

                            {/* Action Buttons: Non-traditional/minimalist look */}
                            <div className="flex justify-end gap-4 pt-4">
                                {/* Cancel Button: Ghost/text button style */}
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    disabled={isLoading}
                                    // Monochrome Ghost Button Style
                                    className="px-6 py-2 text-sm font-medium text-black hover:text-black border border-transparent hover:border-gray-400 transition duration-150 disabled:opacity-50"
                                >
                                    Cancel
                                </button>

                                {/* Save Button: Solid Black block style */}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    // Monochrome Solid Button Style
                                    className="px-6 py-2 text-sm font-medium text-white bg-black rounded-none shadow-lg hover:bg-gray-800 transition duration-150 disabled:bg-gray-500 disabled:cursor-not-allowed"
                                >
                                    {/* Display Loading Text */}
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