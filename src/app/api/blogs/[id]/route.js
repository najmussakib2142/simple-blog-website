import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import mongoose from "mongoose";
// import { verifyUser } from "@/lib/verifyUser"
import User from "@/models/User";
import { withAuth } from "@/middleware/withAuth";
import { verifyToken } from "@/lib/auth/verifyToken";
import connectDB from "@/lib/mongodb";
// import { verifyUser } from "@/lib/verifyUser";



export async function GET(req, { params }) {
  await connectDB();

  const { id } = await params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid blog ID" }, { status: 400 });
    }

    const blog = await Blog.findById(id);

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export const PATCH = withAuth(async (req, { params, user }) => {
  await connectDB();

  // Await params to access id properly
  const unwrappedParams = await params; // Unwrap the Promise
  const id = unwrappedParams?.id;

  if (!id) {
    return NextResponse.json({ error: "Missing ID" }, { status: 400 });
  }

  const blog = await Blog.findById(id);
  if (!blog) {
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });
  }

  const isOwner = blog.authorUid === user.uid;
  const isAdmin = user.role === "admin";

  if (!isOwner && !isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const body = await req.json();

  // 🔒 Whitelist of fields user is allowed to update
  const updatableFields = [
    "title",
    "description",
    "content",
    "imageUrl",
    "category",
    "status",
    "tags",
  ];

  const updatedData = {};

  // Assign only allowed fields
  updatableFields.forEach((field) => {
    if (body[field] !== undefined) {
      updatedData[field] = body[field];
    }
  });

  // Make sure tags are always an array
  if (body.tags && !Array.isArray(body.tags)) {
    updatedData.tags = blog.tags;
  }

  // ⭐ Admin-only: allow updating "featured"
  if (isAdmin) {
    updatedData.featured = body.featured ?? blog.featured;
  }

  // Always update timestamp
  updatedData.updatedAt = new Date();

  const updatedBlog = await Blog.findByIdAndUpdate(id, updatedData, {
    new: true,
  });

  return NextResponse.json(updatedBlog, { status: 200 });
});





// export const PATCH = withAuth(async (req, { params, user }) => {
//   await connectDB();

//   const unwrappedParams = await params;
//   const id = unwrappedParams?.id;

//   if (!id) {
//     return NextResponse.json({ error: "ID is missing in params" }, { status: 400 });
//   }

//   const blog = await Blog.findById(id);
//   if (!blog) {
//     return NextResponse.json({ error: "Blog not found" }, { status: 404 });
//   }

//   const isOwner = blog.authorUid === user.uid;
//   const isAdmin = user.role === "admin";

//   if (!isOwner && !isAdmin) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
//   }

//   const body = await req.json();

//   // Only allow updating certain fields
//   const updatedData = {
//     title: body.title || blog.title,
//     content: body.content || blog.content,
//   };

//   const updatedBlog = await Blog.findByIdAndUpdate(id, updatedData, { new: true });

//   return NextResponse.json(updatedBlog, { status: 200 });
// });



// ----------------


// export async function DELETE(req, { params }) {
//   await connectDB();

//   // Unwrap params using await
//   const unwrappedParams = await params; // Ensure params are awaited
//   // console.log("RAW params:", unwrappedParams);  // should be { id: '...' }

//   const id = unwrappedParams?.id; // Access the id after unwrapping
//   // console.log("ID:", id);

//   if (!id) {
//     return NextResponse.json({ error: "ID is missing in params" }, { status: 400 });
//   }

//   const blog = await Blog.findById(id);
//   if (!blog) {
//     return NextResponse.json({ error: "Blog not found" }, { status: 404 });
//   }

//   await blog.deleteOne();

//   return NextResponse.json({ message: "Blog deleted" }, { status: 200 });
// }



export const DELETE = withAuth(async (req, { params, user }) => {
  await connectDB();

  const unwrappedParams = await params;
  const id = unwrappedParams?.id;

  if (!id) {
    return NextResponse.json({ error: "ID is missing in params" }, { status: 400 });
  }

  const blog = await Blog.findById(id);
  if (!blog) {
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });
  }

  const isOwner = blog.authorUid === user.uid;
  const isAdmin = user.role === "admin";

  if (!isOwner && !isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  await blog.deleteOne();
  return NextResponse.json({ message: "Blog deleted" }, { status: 200 });
});
