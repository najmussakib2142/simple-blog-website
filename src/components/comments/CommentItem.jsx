import Image from "next/image";

export default function CommentItem({ comment }) {
    return (
        <div className="border border-gray-200 p-4 rounded-lg bg-white shadow-sm">
            <div className="flex items-center gap-3 mb-2">
                <div className="relative w-8 h-8 rounded-full overflow-hidden">
                    <Image
                        src={comment.photoURL || "/default-avatar.png"}
                        className="object-cover"
                        fill
                        alt="avatar"
                    />
                </div>
                <div>
                    <p className="font-semibold text-gray-700">{comment.username}</p>
                    <p className="text-xs text-gray-500">
                        {new Date(comment.createdAt).toLocaleString()}
                    </p>
                </div>
            </div>

            <p className="text-gray-800">{comment.comment}</p>
        </div>
    );
}
