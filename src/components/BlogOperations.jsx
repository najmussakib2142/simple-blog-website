"use client";

import { useEffect, useState } from "react";
import { Bookmark, Heart, Share2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function BlogActions({ id }) {
  const { user } = useAuth(); // ✅ YOUR AUTH
  const [bookmarked, setBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ CHECK ON LOAD
  useEffect(() => {
    if (!user?.uid) return;

    fetch("/api/bookmarks/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        blogId: id,
        uid: user.uid,
      }),
    })
      .then((res) => res.json())
      .then((data) => setBookmarked(data.bookmarked));
  }, [id, user?.uid]);

  // ✅ TOGGLE BOOKMARK
  const toggleBookmark = async () => {
    if (!user?.uid) {
      alert("Please login first");
      return;
    }

    setLoading(true);

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
    setLoading(false);
  };

  return (
    <div className="flex items-center gap-6 text-gray-600">
      
      {/* ✅ LIKE (Future) */}
      <button className="flex items-center gap-1 hover:text-black">
        <Heart size={20} />
        <span className="text-sm">0</span>
      </button>

      {/* ✅ BOOKMARK */}
      <button
        onClick={toggleBookmark}
        disabled={loading}
        className={`hover:text-black transition ${
          bookmarked ? "text-black" : ""
        }`}
      >
        <Bookmark
          size={20}
          fill={bookmarked ? "black" : "none"}
        />
      </button>

      {/* ✅ SHARE (Future) */}
      <button className="hover:text-black">
        <Share2 size={20} />
      </button>

    </div>
  );
}
