import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";

export async function GET(req) {
  await connectDB();

  try {
    const blogs = await Blog.find({}).lean(); // Use lean() to get plain objects
    return new Response(JSON.stringify(blogs), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function POST(req) {
  await connectDB();

  try {
    const body = await req.json();
    
    const { title, description, content, imageUrl } = body;

    // Validate required fields
    if (!title || !content) {
      return new Response(
        JSON.stringify({ error: "Title and content are required" }),
        { status: 400 }
      );
    }

    const blog = await Blog.create({
      title,
      description,
      content,
      imageUrl: imageUrl || null
    });

    return new Response(JSON.stringify(blog), { status: 201 });
  } catch (error) {
    console.error("POST error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
}
