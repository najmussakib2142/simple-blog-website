import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  photoURL: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  role: { type: String, default: "user", enum: ["user", "admin"] },
  bookmarks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],


}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
