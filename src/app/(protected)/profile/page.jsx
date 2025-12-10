// /app/(protected)/profile/page.jsx
"use client"
import { useState, useEffect } from 'react';
// import { useAuth } from "@/context/AuthContext"
import Image from "next/image";
import Link from 'next/link';
import BlogCard from '@/components/BlogCard'; // Assumed component for displaying each blog post
import { Facebook, Linkedin, PenLine, Twitter } from 'lucide-react';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { useAuth } from '@/context/AuthContext';


export default function UserProfile() {
    // const { user, loading, logout } = useAuth();
    const { user, loading } = useAuth();
    const [posts, setPosts] = useState([]);
    const [postsLoading, setPostsLoading] = useState(true);
    const [error, setError] = useState(null);


    // useEffect(() => {
    //     if (!user) return;

    //     async function fetchPosts() {
    //         setPostsLoading(true);
    //         setError(null);

    //         try {
    //             const token = await user.getToken(); // ✅ correct method

    //             const res = await fetch(`/api/users/posts?authorUid=${user.uid}`, {
    //                 method: "GET",
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                 },
    //             });

    //             const result = await res.json();

    //             if (!res.ok) {
    //                 console.error("Failed:", result);
    //                 return;
    //             }

    //             setPosts(result.data || []);
    //         } catch (error) {
    //             console.error("Fetch error:", error);
    //             setError("Something went wrong while fetching posts.");
    //         } finally {
    //             setPostsLoading(false);  // 🔥 stop loading
    //         }
    //     }
    //     // async function fetchPosts(authorId) {
    //     //     let token = null;

    //     //     if (user) {
    //     //         token = await user.getToken();
    //     //     }

    //     //     const res = await fetch(`/api/user-posts/${authorId}`, {
    //     //         headers: token ? { Authorization: `Bearer ${token}` } : {},
    //     //     });

    //     //     return res.json();
    //     // }



    //     // fetchPosts();



    // }, [user]);

    useEffect(() => {
        if (!user) return;

        async function fetchPosts() {
            setPostsLoading(true);   // 🔥 start loading
            setError(null);

            try {
                const token = await user.getToken();

                const res = await fetch(`/api/users/posts?authorUid=${user.uid}`, {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` },
                });

                const result = await res.json();

                if (!res.ok) {
                    setError(result.error || "Failed to load posts");
                    return;
                }

                setPosts(result.data || []);
            } catch (error) {
                console.error("Fetch error:", error);
                setError("Something went wrong while fetching posts.");
            } finally {
                setPostsLoading(false);  // 🔥 stop loading
            }
        }

        fetchPosts();
    }, [user]);




    // --- Loading and Auth Protection Guards ---
    { postsLoading && <p className="text-gray-500">Fetching your blog posts...</p> }
    if (loading) return <div className="p-10 text-center text-lg text-indigo-500">Loading profile and authentication state...</div>;
    if (!user) return <div className="p-10 text-center text-2xl text-red-600 font-bold">Please log in to view your profile.</div>;

    const totalBlogs = posts.length;
    // --- Rendered Profile ---
    return (
        <div className="bg-[#F2F3E8]">
            <div className="max-w-6xl  min-h-screen mx-auto py-12 md:py-18 px-8 pt-12">

                {/* 👤 HEADER/IDENTITY SECTION */}
                <div className="flex flex-col items-center justify-center  border-b border-b-gray-100 pb-6 mb-8">
                    {user.photoURL && (
                        <Image
                            src={user.photoURL}
                            alt={`${user.displayName || 'User'}'s Avatar`}
                            width={180}
                            height={180}
                            className="object-cover pb-6"
                        />
                    )}

                    <h1 className="text-4xl font-semibold text-gray-900 mb-2">
                        {user.displayName || 'Guest Author'}
                    </h1>
                    {!postsLoading && posts.length !== 0 && (
                        <p className="text-xl text-black/90 pb-2">Author</p>
                        // <p className="text-xl text-black/90">{user.role}</p>
                    )}
                    {/* <p className="text-xl text-black/90 pb-2">Author</p> */}
                    {/* <p className="text-xl text-gray-500 pb-2">{user.email}</p> */}
                    <p className='text-md text-gray-900 inline-flex items-center'> <PenLine className="w-4 h-4 mr-2" /> <span className="text-black font-semibold mr-1"> {totalBlogs.toString().padStart(2, "0")}</span> Published posts   </p>

                    <div className='flex items-center text-gray-900 gap-10 pt-3 text-lg font-medium'>
                        <p className='inline-flex items-center gap-2'><Twitter className='w-5 h-5' /> Twitter</p>
                        <p className='inline-flex items-center gap-2'><Facebook className='w-5 h-5' /> Facebook</p>
                        <p className='inline-flex items-center gap-2'><Linkedin className='w-5 h-5' /> Linkedin</p>

                    </div>
                </div>

                {/* 📝 CONTENT MANAGEMENT SECTION */}
                <section className="mt-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 flex justify-between items-center">
                        <div>
                            <span className='text-gray-700'>Post of</span> {user.displayName || 'Guest Author'}
                        </div>
                        <Link
                            href="/create"
                            className="text-base text-black bg-gray-50 hover:bg-gray-100 border border-gray-300 px-3 py-1.5 rounded-md font-medium"
                        >
                            + Create New Post
                        </Link>
                    </h2>

                    {/* <div>
                    <p className='text-xl text-gray-800'>Posts of</p>
                    <h3>{user.displayName || 'Guest Author'}</h3>
                </div> */}

                    {/* Status Messages */}
                    {/* {postsLoading && <p className="text-gray-500">Fetching your blog posts...</p>} */}
                    {error && <p className="text-red-500 font-medium">Error loading posts: {error}</p>}

                    {/* Empty State */}
                    {!postsLoading && posts.length === 0 && (
                        <div className="p-8 border-dashed border-2 border-gray-300 rounded-lg text-center">
                            <p className="text-lg text-gray-500 italic mb-3">You haven&apos;t written any blogs yet.</p>
                            <Link href="/create" className="text-indigo-600 hover:text-indigo-800 font-semibold">
                                Start writing your first post!
                            </Link>
                        </div>
                    )}

                    {/* Posts Grid - Using BlogCard for display */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((blog) => (
                            <BlogCard key={blog._id} blog={blog} isAuthorView={true} />
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
}