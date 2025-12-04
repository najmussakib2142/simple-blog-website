// "use client"; // ← important, marks this as a client component

// import BlogsClient from "./BlogsClient";

// export default function BlogsPage() {
//   return <BlogsClient />;
// }


import { Suspense } from "react";
import BlogsClient from "./BlogsClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogsClient />
    </Suspense>
  );
}
