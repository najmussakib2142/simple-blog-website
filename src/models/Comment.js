import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
    {
        blogId: { type: String, required: true },
        uid: { type: String, required: true },
        username: { type: String, required: true },
        photoURL: { type: String, default: "" },
        comment: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.models.Comment ||
    mongoose.model("Comment", CommentSchema);
