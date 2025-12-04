"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { subscribeToAuth, logoutUser } from "@/lib/auth";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // loading for Firebase + MongoDB role

  // useEffect(() => {
  //   const unsubscribe = subscribeToAuth(async (firebaseUser) => {
  //     if (!firebaseUser) {
  //       setUser(null);
  //       setLoading(false);
  //       return;
  //     }

  //     setLoading(true);
  //     try {
  //       const token = await firebaseUser.getIdToken();

  //       const res = await fetch(`/api/users/${firebaseUser.uid}`, {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       if (!res.ok) throw new Error("Failed to fetch user data");
  //       const dbUser = await res.json();

  //       console.log("Fetched dbUser:", dbUser);
  //       console.log("Firebase UID:", firebaseUser.uid);
  //       console.log("DB user fetched:", dbUser);


  //       setUser({
  //         uid: firebaseUser.uid,
  //         displayName: firebaseUser.displayName,
  //         email: firebaseUser.email,
  //         photoURL: firebaseUser.photoURL,
  //         role: dbUser.role || "user",
  //         token, // from firebaseUser.getIdToken()
  //       });
  //     } catch (err) {
  //       console.error(err);
  //       setUser({ ...firebaseUser, role: "user" }); // fallback
  //     } finally {
  //       setLoading(false);
  //     }
  //   });


  //   return () => unsubscribe();
  // }, []);


  useEffect(() => {
    const unsubscribe = subscribeToAuth(async (firebaseUser) => {
      // 1️⃣ If user logs out or session expires
      if (!firebaseUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        // 2️⃣ Always fetch a FRESH token (prevents expired-token bugs)
        const token = await firebaseUser.getIdToken(true);

        // 3️⃣ Fetch role & extra user data from your DB
        const res = await fetch(`/api/users/${firebaseUser.uid}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch user data from DB");
        }

        const dbUser = await res.json();

        // 4️⃣ Build your SAFE custom user object
        setUser({
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName,
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL,
          role: dbUser.role || "user",
          token, // ✅ ALWAYS stored
        });

      } catch (err) {
        console.error("AuthContext error:", err);

        // 5️⃣ ✅ SAFE FALLBACK (token is STILL GUARANTEED)
        try {
          const fallbackToken = await firebaseUser.getIdToken(true);

          setUser({
            uid: firebaseUser.uid,
            displayName: firebaseUser.displayName,
            email: firebaseUser.email,
            photoURL: firebaseUser.photoURL,
            role: "user",
            token: fallbackToken, // ✅ CRITICAL FIX
          });

        } catch (fallbackErr) {
          console.error("Token fallback failed:", fallbackErr);
          setUser(null); // last-resort logout safety
        }

      } finally {
        // 6️⃣ Auth state is now fully resolved
        setLoading(false);
      }
    });

    // 7️⃣ Cleanup listener on unmount
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
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
