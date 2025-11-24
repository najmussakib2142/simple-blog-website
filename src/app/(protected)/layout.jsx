"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If not loading AND user not logged in → redirect
    if (!loading && !user) {
      router.replace("/auth/login");
    }
  }, [user, loading, router]);

  // Show loader while checking auth
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg">
        Checking authentication...
      </div>
    );
  }

  // Prevent flashing UI
  if (!user) return null;

  return <>{children}</>;
}
