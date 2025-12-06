import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import User from "@/models/User";
import { NextResponse } from "next/server";
// import connectDB from "@/lib/mongodb";
// import User from "@/models/User";  // ← Match your filename
// import Blog from "@/models/Blog";  // ← Match your filename

export async function POST(req) {
  try {
    await connectDB();

    const { uid, blogId } = await req.json();

    console.log("🔍 Checking like status:", { uid, blogId });

    if (!uid || !blogId) {
      return NextResponse.json({ liked: false, likes: 0 });
    }

    const user = await User.findOne({ uid });
    const blog = await Blog.findById(blogId);

    if (!user || !blog) {
      console.log("⚠️ User or blog not found");
      return NextResponse.json({ liked: false, likes: 0 });
    }

    // ✅ Handle missing fields safely
    const likedBlogs = user.likedBlogs || [];
    const likes = typeof blog.likes === 'number' ? blog.likes : 0;

    const liked = likedBlogs.some(
      (id) => id.toString() === blogId
    );

    console.log("✅ Check result:", { liked, likes });

    return NextResponse.json({
      liked,
      likes,
    });

  } catch (err) {
    console.error("❌ LIKE CHECK ERROR:", err);
    return NextResponse.json({ liked: false, likes: 0 });
  }
}