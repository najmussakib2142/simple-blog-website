// /models/Blog.js
import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true }, // SEO-friendly URL
    description: { type: String },
    content: { type: String, required: true },
    imageUrl: { type: String, default: null },
    author: { type: String, default: "Unknown Author" },
    authorUid: { type: String, required: true },
    authorEmail: { type: String },
    authorImage: { type: String, default: null },
    category: { type: String, default: "General" },
    tags: { type: [String], default: [] },
    featured: { type: Boolean, default: false },
    status: { type: String, enum: ["draft", "published"], default: "published" },
    readingTime: { type: String }, // e.g., "5 min read"
  },
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
