"use client";

import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

export default function CommentSection({ blogId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) return; // Only fetch when loading = true

    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comments/get?blogId=${blogId}`);
        const data = await res.json();

        setComments(data.comments || []);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [blogId, loading]); // 👈 add loading here


  return (
    <div className="mt-12 max-w-2xl">
      <h2 className="text-lg font-semibold mb-4">Comments</h2>

      {/* Add Comment */}
      <CommentForm blogId={blogId} reload={() => setLoading(true)} />

      {/* Comment List */}
      {loading ? (
        <p className="text-gray-600">Loading comments...</p>
      ) : comments.length === 0 ? (
        <p className="text-gray-500">No comments yet. Be the first!</p>
      ) : (
        <div className="space-y-4 mt-4">
          {comments.map((comment) => (
            <CommentItem key={comment._id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
}
