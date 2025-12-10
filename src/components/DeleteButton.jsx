"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { useAuth } from "@/context/AuthContext";
// import { getAuth } from "firebase/auth";
import { auth } from "@/lib/auth/firebase";
import { getAuthToken } from "@/lib/auth/authHelpers";
// import { useAuth } from "@/context/AuthContext";

export default function DeleteButton({ id }) {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    console.log("Delete button clicked for ID:", id); // Log ID

    const result = await Swal.fire({
        title: "Are you sure?",
        text: "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#000000",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    setLoading(true);
    try {
        const token = await getAuthToken();
        console.log("Token retrieved:", token); // Log token

        const res = await fetch(`/api/blogs/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await res.json();
        console.log("Response data:", data); // Log response data

        if (!res.ok) {
            return Swal.fire("Error", data.error || "Delete failed", "error");
        }

        Swal.fire("Deleted!", "The blog has been deleted.", "success");
        router.push("/blogs");

    } catch (err) {
        console.error("DELETE ERROR:", err);
        Swal.fire("Error", "Failed to delete blog", "error");
    } finally {
        setLoading(false);
    }
}



  return (
    <button
      onClick={handleDelete}
      // 🛑 Upgraded Monochrome/Non-Traditional Button Style
      className=" inline-flex items-center px-4 py-2.5 text-sm font-medium text-white 
                  bg-red-600 border border-red-700 rounded-none shadow-md
                  hover:bg-red-700 hover:shadow-lg transition duration-150
                  disabled:bg-red-400 disabled:cursor-not-allowed"
      disabled={loading}
    >
      {loading ? (
        <div className="flex items-center">
          {/* Loading Spinner */}
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Deleting...
        </div>
      ) : (
        <>
          <Trash2 className="mr-2 h-4 w-4" /> {/* Lucid Icon */}
          Delete
        </>
      )}
    </button>
  );
}