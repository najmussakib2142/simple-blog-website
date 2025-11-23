import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";  // <-- FIXED
import Blog from "@/models/Blog";
import mongoose from "mongoose";

export async function GET(req, { params }) {
  await connectDB();

  const { id } = await params;

  try {
    const blog = await Blog.findById(id);

    if (!blog) {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid blog ID" },
      { status: 400 }
    );
  }
}

// api/blogs/[id]/route.js
export async function PATCH(req, { params }) {
  await connectDB();
  const { id } = await params; 
  const body = await req.json();

  console.log("Updating blog with id:", id);
  console.log("Body received:", body);

  const updatedBlog = await Blog.findByIdAndUpdate(id, { $set: body }, { new: true });
  if (!updatedBlog) {
    return new Response(JSON.stringify({ error: "Blog not found" }), { status: 404 });
  }
  return new Response(JSON.stringify(updatedBlog), { status: 200 });
}


export async function DELETE(req, { params }) {
  await connectDB();

  const { id } = await params;

  try {
    // validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const deleted = await Blog.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Blog deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Delete failed" }, { status: 500 });
  }
}
