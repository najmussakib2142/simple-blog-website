"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import EditBlogModal from "@/components/EditBlogModal";
import DeleteButton from "@/components/DeleteButton";

export default function BlogActions({ blog, id }) {
    const { user } = useAuth();

    // Only show buttons if logged-in user owns the blog
    const isOwner = user && blog.authorUid === user.uid;

    return (
        <div className="flex items-center justify-between gap-4">
            <Link
                href="/blogs"
                className="inline-flex items-center px-4 py-2 bg-black/90 text-white rounded-lg hover:bg-black transition"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to All Blogs
            </Link>

            {isOwner && (
                <>
                    <EditBlogModal blog={blog} id={id} />
                    <DeleteButton id={id} />
                </>
            )}
        </div>
    );
}
