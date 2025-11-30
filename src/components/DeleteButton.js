// // /admin/blogs/DeleteButton.js (or similar path)
// "use client"; // 👈 MARKED AS CLIENT COMPONENT

// import { Trash2 } from 'lucide-react';

// const deleteButtonClass = "text-red-600 hover:text-red-800 transition duration-150 ml-4";

// // This function can now be safely defined and used here
// const handleDelete = (id) => {
//     if (window.confirm(`Are you sure you want to delete blog ID: ${id}?`)) {
//         // Implement API call to DELETE /api/blogs/${id} here
//         console.log(`Deleting blog: ${id}`);
//     }
// };

// export default function DeleteButton({ blogId }) {
//     return (
//         <button
//             onClick={() => handleDelete(blogId)}
//             className={deleteButtonClass}
//         >
//             <Trash2 className="w-5 h-5 inline-block mr-1 align-middle" />
//             <span className="sr-only sm:not-sr-only">Delete</span>
//         </button>

        
//     );
// }