"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function CommentForm({ blogId, reload }) {
    const { user } = useAuth();
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

    if (!user) {
        return (
            <p classgallery="text-gray-600 italic mb-4">
                Please log in to write a comment.
            </p>
        );
    }

    const handleSubmit = async () => {
        if (!text.trim()) return;

        setLoading(true);

        const res = await fetch("/api/comments/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                blogId,
                uid: user.uid,
                username: user.displayName || "Anonymous",
                photoURL: user.photoURL || "",
                comment: text,
            }),
        });

        await res.json();
        setText("");
        reload();
        setLoading(false);
    };

    return (
        <div className="max-w-3xl mx-auto flex gap-3 mb-6">
            <input
                className="flex-1 border text-black border-gray-500 p-2 rounded"
                placeholder="Write a comment..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-black text-white px-4 py-2 rounded"
            >
                {loading ? "Posting…" : "Post"}
            </button>
        </div>
    );
}
