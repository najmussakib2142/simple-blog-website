"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminGuard({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) router.replace("/auth/login"); // not logged in
      else if (user.role !== "admin") router.replace("/"); // not admin
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg">
        Checking admin access...
      </div>
    );
  }

  if (!user || user.role !== "admin") return null;

  return <>{children}</>;
}
