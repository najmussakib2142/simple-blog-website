import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const { uid, blogId } = await req.json();


    if (!uid || !blogId) {
      return NextResponse.json({ liked: false, likes: 0 });
    }

    const user = await User.findOne({ uid });
    const blog = await Blog.findById(blogId);

    if (!user || !blog) {
      // console.log(" User or blog not found");
      return NextResponse.json({ liked: false, likes: 0 });
    }

    const likedBlogs = user.likedBlogs || [];
    const likes = typeof blog.likes === 'number' ? blog.likes : 0;

    const liked = likedBlogs.some(
      (id) => id.toString() === blogId
    );


    return NextResponse.json({
      liked,
      likes,
    });

  } catch (err) {
    console.error("❌ LIKE CHECK ERROR:", err);
    return NextResponse.json({ liked: false, likes: 0 });
  }
}