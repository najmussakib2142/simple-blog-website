"use client";
import { useState } from "react";

export default function HeroWarningMessage() {
  // ✅ Lazy state initialization (NO setState in useEffect)
  const [show, setShow] = useState(() => {
    try {
      const hasSeen = localStorage.getItem("hero-warning-seen");
      if (!hasSeen) {
        localStorage.setItem("hero-warning-seen", "true");
        return true; // ✅ show only once
      }
      return false;
    } catch {
      return true; // ✅ fallback if localStorage fails
    }
  });

  if (!show) return null;

  return (
    <div className="relative bg-yellow-100 border border-yellow-300 text-yellow-900 px-6 py-4 rounded-lg mb-4 text-sm text-center shadow-sm">
      
      {/* Close Button */}
      <button
        onClick={() => setShow(false)}
        className="absolute top-2 right-3 text-yellow-900 font-bold hover:opacity-70"
        aria-label="Close warning"
      >
        ✕
      </button>

      🚧 <strong>This website is currently under development.</strong> You may experience some minor issues.
      <br />
      🔐 <strong>We are actively working on improving security and stability.</strong>
      <br />
      ✨ Thank you for your patience — exciting updates are on the way!
    </div>
  );
}
