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


    <div className="mt-12 max-w-3xl mx-auto">
      {/* Section heading */}
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Comments</h2>

      {/* Add Comment form */}
      <div className="mb-8">
        <CommentForm blogId={blogId} reload={() => setLoading(true)} />
      </div>

      {/* Comment list */}
      {loading ? (
        <p className="text-gray-500 italic">Loading comments...</p>
      ) : comments.length === 0 ? (
        <p className="text-gray-400 italic">No comments yet. Be the first to comment!</p>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <CommentItem key={comment._id} comment={comment} />
          ))}
        </div>
      )}
    </div>


  );
}
