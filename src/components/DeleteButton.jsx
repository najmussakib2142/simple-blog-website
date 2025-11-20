"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export default function DeleteButton({ id }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    const ok = confirm("Are you sure you want to delete this blog? This action cannot be undone.");
    if (!ok) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.error || "Failed to delete the blog");
        setLoading(false);
        return;
      }

      // navigate back to blog list
      router.push("/blogs");
    } catch (err) {
      console.error(err);
      alert("Failed to delete the blog");
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="md: ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
      disabled={loading}
    >
      {loading ? (
        "Deleting..."
      ) : (
        <>
          <Trash2 className="mr-2 h-4 w-4" /> {/* Lucid Icon */}
          Delete
        </>
      )}
    </button>
  );
}
