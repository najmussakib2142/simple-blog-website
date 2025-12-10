"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { subscribeToAuth, logoutUser } from "@/lib/auth/authHelpers";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToAuth(async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        // Get fresh token
        const token = await firebaseUser.getIdToken(true);

        // Fetch user role from your backend
        const res = await fetch(`/api/users/${firebaseUser.uid}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch user data");

        const dbUser = await res.json();

        // Store user with token
        setUser({
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName,
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL,
          role: dbUser.role || "user",
          getToken: () => firebaseUser.getIdToken(true), // ✅ Method to get fresh token
        });

      } catch (error) {
        console.error("Auth error:", error);
        
        // Fallback: basic user without DB data
        setUser({
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName,
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL,
          role: "user",
          getToken: () => firebaseUser.getIdToken(true),
        });
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, logout: logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}