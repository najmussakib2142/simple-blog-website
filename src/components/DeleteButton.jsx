"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { useAuth } from "@/context/AuthContext";

export default function DeleteButton({ id }) {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    // Show confirmation dialog
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000000",
      cancelButtonColor: "#6b7280", // gray-500


      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return; // user canceled

    setLoading(true);
    try {
      const token = await user.getIdToken();
      // console.log(token);

      const res = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(res);

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: data.error || "Failed to delete the blog",
        });
        setLoading(false);
        return;
      }

      // Success
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "The blog has been deleted.",
        timer: 1500,
        showConfirmButton: false,
      });

      // navigate back to blog list
      router.push("/blogs");
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to delete the blog",
      });
      setLoading(false);
    }
  }


  return (
    <button
      onClick={handleDelete}
      className=" inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
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
