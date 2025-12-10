"use client";

import { useEffect, useState } from "react";
import { Bookmark, Share2 } from "lucide-react";
// import { useAuth } from "@/context/AuthContext";
import { FaHandsClapping } from "react-icons/fa6";
import { useAuth } from "@/context/AuthContext";

export default function BlogOperations({ id, blog }) {
  const { user } = useAuth();
  const [bookmarked, setBookmarked] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [loading, setLoading] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const checkStatus = async () => {
      try {
        // Check bookmark status
        const bookmarkRes = await fetch("/api/bookmarks/check", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            blogId: id,
            uid: user?.uid || null,
          }),
        });
        const bookmarkData = await bookmarkRes.json();
        setBookmarked(bookmarkData.bookmarked);

        // Check like status
        const likeRes = await fetch("/api/likes/check", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            blogId: id,
            uid: user?.uid || null,
          }),
        });
        const likeData = await likeRes.json();
        setLiked(likeData.liked);
        setLikes(likeData.likes);
      } catch (error) {
        console.error("Error checking status:", error);
      }
    };

    checkStatus();
  }, [id, user?.uid]);

  const toggleLike = async () => {
    if (!user?.uid) {
      alert("Please login to clap 👏");
      return;
    }

    // console.log("🔵 Attempting to toggle like for blog:", id);
    // console.log("🔵 User UID:", user.uid);

    setLikeLoading(true);

    try {
      const res = await fetch("/api/likes/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blogId: id, uid: user.uid }),
      });

      console.log("🔵 Response status:", res.status);

      const data = await res.json();
      console.log("🔵 Response data:", data);

      if (data.error) {
        alert(data.error);
        return;
      }

      setLiked(data.liked);
      setLikes(data.likes);
      console.log("✅ Like toggled successfully");
    } catch (error) {
      console.error("❌ Toggle like error:", error);
      alert("Failed to update like. Please try again.");
    } finally {
      setLikeLoading(false);
    }
  };

  const toggleBookmark = async () => {
    if (!user?.uid) {
      alert("Please login first");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/bookmarks/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          blogId: id,
          uid: user.uid,
        }),
      });

      const data = await res.json();
      setBookmarked(data.bookmarked);
    } catch (error) {
      console.error("Toggle bookmark error:", error);
      alert("Failed to update bookmark. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-6 text-gray-600">
      {/* ✅ LIKE */}
      <button
        onClick={(e) => {
          // console.log("🖱️ Button clicked!");
          e.preventDefault();
          e.stopPropagation();
          toggleLike();
        }}
        disabled={likeLoading}
        className={`flex items-center gap-2 hover:text-black transition ${liked ? "text-black" : ""
          } ${likeLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        style={{ pointerEvents: 'auto', zIndex: 10 }} // ← Add this temporarily
      >
        <FaHandsClapping size={20} />
        <span className="text-sm text-black">{likes}</span>
      </button>

      {/* ✅ BOOKMARK */}
      <button
        onClick={toggleBookmark}
        disabled={loading}
        className={`hover:text-black transition ${bookmarked ? "text-black" : ""
          } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <Bookmark size={20} fill={bookmarked ? "black" : "none"} />
      </button>

      {/* ✅ SHARE */}
      <button className="hover:text-black">
        <Share2 size={20} />
      </button>
    </div>
  );
}