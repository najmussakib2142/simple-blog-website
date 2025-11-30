import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import mongoose from "mongoose";
import { verifyUser } from "@/lib/verifyUser"
import User from "@/models/User";

// export async function GET(req, { params }) {
//   await connectDB();

//   const { id } = await params;

//   try {
//     const blog = await Blog.findById(id);

//     if (!blog) {
//       return NextResponse.json(
//         { error: "Blog not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(blog, { status: 200 });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Invalid blog ID" },
//       { status: 400 }
//     );
//   }
// }


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


// api/blogs/[id]/route.js
// export async function PATCH(req, { params }) {
//   await connectDB();
//   const { id } = await params; 
//   const body = await req.json();

//   console.log("Updating blog with id:", id);
//   console.log("Body received:", body);

//   const updatedBlog = await Blog.findByIdAndUpdate(id, { $set: body }, { new: true });
//   if (!updatedBlog) {
//     return new Response(JSON.stringify({ error: "Blog not found" }), { status: 404 });
//   }
//   return new Response(JSON.stringify(updatedBlog), { status: 200 });
// }

export async function PATCH(req, { params }) {
  await connectDB();
  const { id } = await params;
  const body = await req.json();

  // console.log("Updating blog with id:", id);
  // console.log("Body received:", body);

  try {
    const decoded = await verifyUser(req); // Firebase user
    const blog = await Blog.findById(id);

    if (!blog) {
      return new Response(JSON.stringify({ error: "Blog not found" }), { status: 404 });
    }

    const userFromDB = await User.findOne({ uid: decoded.uid });

    const isOwner = blog.authorUid === decoded.uid;
    const isAdmin = userFromDB && userFromDB.role === 'admin';

    if (!isOwner && !isAdmin) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 403 });
    }
    // if (blog.authorUid !== decoded.uid) {
    //   return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 403 });
    // }

    const updatedBlog = await Blog.findByIdAndUpdate(id, { $set: body }, { new: true });
    return new Response(JSON.stringify(updatedBlog), { status: 200 });
  } catch (error) {
    console.error("Mongoose/API PATCH Error:", error.message, error.name, error);
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }

}





// export async function DELETE(req, { params }) {
//   await connectDB();
//   const { id } = await params;
//   try {
//     // validate ObjectId
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
//     }

//     const deleted = await Blog.findByIdAndDelete(id);

//     if (!deleted) {
//       return NextResponse.json({ error: "Blog not found" }, { status: 404 });
//     }

//     return NextResponse.json({ message: "Blog deleted" }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: error.message || "Delete failed" }, { status: 500 });
//   }
// }

export async function DELETE(req, { params }) {
  await connectDB();
  const { id } = await params;

  try {
    const decoded = await verifyUser(req);

    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    const userFromDB = await User.findOne({ uid: decoded.uid });


    const isOwner = blog.authorUid === decoded.uid;
    const isAdmin = userFromDB && userFromDB.role === 'admin';

    if (!isOwner && !isAdmin) { // Block if NOT the owner AND NOT an admin
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // if (blog.authorUid !== decoded.uid) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    // }

    await blog.deleteOne();
    return NextResponse.json({ message: "Blog deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

