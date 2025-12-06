import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const { uid, blogId } = await req.json();

    console.log("📥 Received toggle request:", { uid, blogId });

    if (!uid || !blogId) {
      return NextResponse.json(
        { error: "Missing uid or blogId" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ uid });
    if (!user) {
      console.error("❌ User not found:", uid);
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
      console.error("❌ Blog not found:", blogId);
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }

    // ✅ Initialize fields if missing (safety check)
    if (!user.likedBlogs) {
      user.likedBlogs = [];
    }

    if (typeof blog.likes !== 'number') {
      blog.likes = 0;
    }

    const alreadyLiked = user.likedBlogs.some(
      (id) => id.toString() === blogId
    );

    console.log("📊 Current state:", { 
      alreadyLiked, 
      currentLikes: blog.likes,
      userLikedBlogs: user.likedBlogs.length 
    });

    if (alreadyLiked) {
      // UNLIKE
      user.likedBlogs = user.likedBlogs.filter(
        (id) => id.toString() !== blogId
      );
      blog.likes = Math.max(0, blog.likes - 1);
      console.log("👎 Unliked");
    } else {
      // LIKE
      user.likedBlogs.push(blogId);
      blog.likes += 1;
      console.log("👍 Liked");
    }

    await user.save();
    await blog.save();

    console.log("✅ Successfully saved:", { 
      liked: !alreadyLiked, 
      newLikes: blog.likes 
    });

    return NextResponse.json({
      success: true,
      liked: !alreadyLiked,
      likes: blog.likes,
    });

  } catch (err) {
    console.error("❌ LIKE TOGGLE ERROR:", err);
    return NextResponse.json(
      { error: "Server error", details: err.message },
      { status: 500 }
    );
  }
}