import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { withAuth } from "@/middleware/withAuth";
import { NextResponse } from "next/server";

// ✅ Utility
function calculateReadingTime(text) {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wordsPerMinute);
  return `${time} min read`;
}


export async function GET(req) {
  await connectDB();

  try {
    const search = req.nextUrl.searchParams.get("search") || "";
    const category = req.nextUrl.searchParams.get("category") || "";
    const page = Number(req.nextUrl.searchParams.get("page")) || 1;
    const limit = Number(req.nextUrl.searchParams.get("limit")) || 6;

    let filter = { status: "published" };

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ];
    }

    if (category) filter.category = category;

    const totalBlogs = await Blog.countDocuments(filter);
    const totalPages = Math.ceil(totalBlogs / limit);

    const blogs = await Blog.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return NextResponse.json(
      { blogs, totalPages, currentPage: page },
      { status: 200 }
    );

  } catch (error) {
    console.error("GET BLOGS ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}


export const POST = withAuth(async (req, { user }) => {
  try {
    await connectDB();

    const body = await req.json();

    const {
      title,
      description,
      content,
      imageUrl,
      category,
      tags = [],
      featured = false,
      status = "published",
    } = body;

    // ✅ Strong Validation
    if (!title || !description || !content || !imageUrl || !category) {
      return new Response(
        JSON.stringify({ error: "All required fields must be filled" }),
        { status: 400 }
      );
    }

    // ✅ Secure Slug
    const slug = title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

    const slugExists = await Blog.findOne({ slug });
    if (slugExists) {
      return new Response(
        JSON.stringify({ error: "Blog with this title already exists" }),
        { status: 400 }
      );
    }

    // ✅ Admin-only Feature Blogs
    if (featured === true && user.role !== "admin") {
      return new Response(
        JSON.stringify({ error: "Only admin can feature blogs" }),
        { status: 403 }
      );
    }

    // ✅ Clean Tags
    const cleanTags = tags.filter(tag => tag.trim().length > 0);

    const readingTime = calculateReadingTime(content);

    const blog = await Blog.create({
      title,
      slug,
      description,
      content,
      imageUrl,
      author: user.name,
      authorUid: user.uid,
      authorEmail: user.email,
      authorImage: user.photoURL,
      category,
      tags: cleanTags,
      featured,
      status,
      readingTime,
    });

    return new Response(JSON.stringify(blog), { status: 201 });

  } catch (error) {
    console.error("BLOG POST ERROR:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
});
