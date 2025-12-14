import Blog from "@/models/Blog";

export async function GET() {
    try {
        const topAuthors = await Blog.aggregate([
            {
                $group: {
                    _id: "$authorUid",
                    authorName: { $first: "$author" },
                    authorEmail: { $first: "$authorEmail" },
                    authorImage: { $first: "$authorImage" },
                    totalBlogs: { $sum: 1 },
                },
            },
            { $sort: { totalBlogs: -1 } },
            { $limit: 5 },
        ]);

        return new Response(JSON.stringify(topAuthors), { status: 200 });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500 }
        );
    }
}
