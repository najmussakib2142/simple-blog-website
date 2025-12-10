// /app/(protected)/
"use client";

import { useState, useEffect } from 'react';
import { PencilIcon, TrashIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';

// Function to fetch data from your local API endpoint
async function fetchUsers() {
    const res = await fetch('/api/users', { cache: 'no-store' });
    try {

        if (!res.ok) {
            throw new Error(`Failed to fetch users: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();

        return data.users || data;

    } catch (error) {
        console.error("Error fetching users:", error);
        throw error; // Propagate error for UI display
    }
}


export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const data = await fetchUsers();
                // Ensure data is an array before setting state
                if (Array.isArray(data)) {
                    setUsers(data);
                } else {
                    throw new Error("API response was not a list of users.");
                }
            } catch (err) {
                // Display a user-friendly error message
                setError(err.message || 'Failed to load user data.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadUsers();
    }, []);

    // Placeholder functions for actions (connect these to your actual logic)
    const handleEdit = (userId) => {
        alert(`Editing user: ${userId}`);
    };

    const handleDelete = (userId) => {
        if (window.confirm(`Are you sure you want to delete user ${userId}?`)) {
            alert(`Deleting user: ${userId}`);
        }
    };

    if (loading) {
        return <div className="text-center p-10 text-lg text-gray-600">Loading users...</div>;
    }

    if (error) {
        return <div className="text-center p-10 text-lg text-red-600">Error: {error}</div>;
    }

    return (
        <div className="space-y-8">
            <div className='flex justify-between items-center border-b pb-4 border-gray-200'>
                <h1 className="text-3xl font-bold mb-6 text-gray-900">👥 User Management</h1>
                <div className="flex justify-end mb-4">
                    <Link
                        href="/admin/users/new"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        Add New User
                    </Link>
                </div>
            </div>

            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                #
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>

                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Role
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                                Joined
                            </th>
                            <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                                    {index + 1}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-8 w-8">
                                            {user && user.photoURL ? (
                                                <Image
                                                    src={user.photoURL}
                                                    alt="User Avatar"
                                                    width={40}
                                                    height={40}
                                                    className="h-8 w-8 rounded-full object-cover border "
                                                />
                                            ) : (
                                                <UserCircleIcon className="h-8 w-8 text-gray-400" />
                                            )}

                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                            <div className="text-xs text-gray-500 sm:hidden">ID: {user.id}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                                    {user.email}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'admin'
                                        ? 'bg-red-100 text-red-800'
                                        : 'bg-green-100 text-green-800'
                                        }`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                                    {/* Format date only if user.createdAt exists */}
                                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => handleEdit(user.id)}
                                        className="text-indigo-600 hover:text-indigo-900 p-1 mx-1 rounded-md hover:bg-indigo-50"
                                        title="Edit"
                                    >
                                        <PencilIcon className="h-5 w-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className="text-red-600 hover:text-red-900 p-1 mx-1 rounded-md hover:bg-red-50"
                                        title="Delete"
                                    >
                                        <TrashIcon className="h-5 w-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {users.length === 0 && !loading && (
                <p className="text-center text-gray-500 mt-8">No users found.</p>
            )}
        </div>
    );
}