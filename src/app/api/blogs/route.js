import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { NextResponse } from "next/server";

function calculateReadingTime(text) {
  const wordsPerMinute = 200; // average reading speed
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wordsPerMinute);
  return `${time} min read`;
}

export async function GET(req) {
  await connectDB();

  try {
    const search = req.nextUrl.searchParams.get("search") || "";
    const category = req.nextUrl.searchParams.get("category") || "";
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

    let filter = {};

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } }
      ];
    }

    if (category) {
      filter.category = category;
    }

    const totalBlogs = await Blog.countDocuments(filter);
    const totalPages = Math.ceil(totalBlogs / limit);

    const blogs = await Blog.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return new Response(
      JSON.stringify({ blogs, totalPages, currentPage: page }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500
    });
  }
}


export async function POST(req) {
  await connectDB();

  try {
    const body = await req.json();
    const {
      title,
      description,
      content,
      imageUrl,
      author,
      authorUid,
      authorEmail,
      authorImage,
      category,
      tags,
      featured,
      status,
      slug,
    } = body;

    console.log("POST body:", body);

    // Validate required fields
    if (!title || !content || !authorUid || !slug) {
      return new Response(
        JSON.stringify({ error: "Title, content, slug, and authorUid are required" }),
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existing = await Blog.findOne({ slug });
    if (existing) {
      return new Response(
        JSON.stringify({ error: "Slug already exists. Please use a different title." }),
        { status: 400 }
      );
    }

    const readingTime = calculateReadingTime(content);

    const blog = await Blog.create({
      title,
      slug,
      description: description || "",
      content,
      imageUrl: imageUrl || null,
      author: author || "Unknown Author",
      authorImage: authorImage || null,
      authorUid,
      authorEmail: authorEmail || "",
      category: category || "General",
      tags: tags || [],
      featured: featured || false,
      status: status || "published",
      readingTime,
    });

    return new Response(JSON.stringify(blog), { status: 201 });
  } catch (error) {
    console.error("POST error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
