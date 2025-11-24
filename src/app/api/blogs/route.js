import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { NextResponse } from "next/server";

// export async function GET(req) {
//   await connectDB();

//   try {
//     const blogs = await Blog.find({}).lean(); // Use lean() to get plain objects
//     return new Response(JSON.stringify(blogs), { status: 200 });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: error.message }), { status: 500 });
//   }
// }


// export async function GET(req) {
//   await connectDB();

//   try {
//     const page = Number(req.nextUrl.searchParams.get("page")) || 1;
//     const limit = Number(req.nextUrl.searchParams.get("limit")) || 6;

//     const totalBlogs = await Blog.countDocuments();

//     const totalPages = Math.ceil(totalBlogs / limit);

//     const blogs = await Blog.find()
//       .sort({ createdAt: -1 })
//       .skip((page - 1) * limit)
//       .limit(limit);

//     return new Response(
//       JSON.stringify({ blogs, totalPages, currentPage: page }),
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("GET /api/blogs error:", error);
//     return new Response(
//       JSON.stringify({ error: error.message || "Failed to fetch blogs" }),
//       { status: 500 }
//     );
//   }
// }

export async function GET(req) {
  await connectDB();

  try {
    const pageParam = req.nextUrl.searchParams.get("page");
    const limitParam = req.nextUrl.searchParams.get("limit");

    if (!pageParam && !limitParam) {
      // No pagination → return all blogs
      const blogs = await Blog.find({}).lean();
      return new Response(JSON.stringify(blogs), { status: 200 });
    }

    // Pagination logic
    const page = Number(pageParam) || 1;
    const limit = Number(limitParam) || 6;

    const totalBlogs = await Blog.countDocuments();
    const totalPages = Math.ceil(totalBlogs / limit);

    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return new Response(
      JSON.stringify({ blogs, totalPages, currentPage: page }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}


export async function POST(req) {
  await connectDB();

  try {
    const body = await req.json();
    console.log("Incoming Body:", body);

    const { title, description, content, imageUrl, author, authorUid, authorEmail } = body;

    // Validate required fields
    if (!title || !content || !authorUid) {
      return new Response(
        JSON.stringify({ error: "Title, content, and authorUid are required" }),
        { status: 400 }
      );
    }

    const blog = await Blog.create({
      title,
      description,
      content,
      imageUrl: imageUrl || null,
      author: author || "Unknown Author",
      authorUid,
      authorEmail,
    });

    console.log("Saving Blog:", {
      title,
      description,
      content,
      imageUrl,
      author,
      authorUid,
      authorEmail,
    });


    return new Response(JSON.stringify(blog), { status: 201 });
  } catch (error) {
    console.error("POST error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
}
