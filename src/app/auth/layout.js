// src/app/auth/layout.js
import { AuthProvider } from "@/context/AuthContext";

export default function AuthLayout({ children }) {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
}


// export default function AuthLayout({ children }) {
//     return (
//         <html lang="en">
//             <body className="min-h-screen bg-gray-50 flex items-center justify-center">
//                 {children}
//             </body>
//         </html>
//     );
// }
