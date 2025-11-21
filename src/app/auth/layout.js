// src/app/auth/layout.js
import { AuthProvider } from "@/context/AuthContext";

export default function AuthLayout({ children }) {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
}
