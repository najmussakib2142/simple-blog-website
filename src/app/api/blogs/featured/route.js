import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
// import Blog from "@/models/Blog";

// export async function GET() {
//   try {
//     await connectDB();

//     // ✅ Only featured + published blogs
//     const blogs = await Blog.find({
//       featured: true,
//       status: "published",
//     })
//       .select("_id title authorImage slug description imageUrl author  createdAt readingTime")
//       .lean();

//     // ✅ Fisher-Yates shuffle (true random)
//     for (let i = blogs.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [blogs[i], blogs[j]] = [blogs[j], blogs[i]];
//     }

//     // ✅ Take only 4
//     const featuredFour = blogs.slice(0, 4);

//     return new Response(
//       JSON.stringify({ success: true, data: featuredFour }),
//       { status: 200, headers: { "Content-Type": "application/json" } }
//     );
//   } catch (error) {
//     console.error("Featured blogs error:", error);
//     return new Response(
//       JSON.stringify({ success: false, message: "Failed to fetch featured blogs" }),
//       { status: 500, headers: { "Content-Type": "application/json" } }
//     );
//   }
// }


export async function GET() {
  try {
    console.log("Connecting to DB...");
    await connectDB();
    console.log("DB connected");

    const blogs = await Blog.find({
      featured: true,
      status: "published",
    })
      .select("_id title authorImage slug description imageUrl author createdAt readingTime")
      .lean();

    console.log("Blogs fetched:", blogs.length);

    const featuredFour = blogs.slice(0, 4);

    return new Response(
      JSON.stringify({ success: true, data: featuredFour }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Featured blogs error:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Failed to fetch featured blogs", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
