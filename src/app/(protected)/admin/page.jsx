import AdminLayout from "./layout";

export default function AdminHome() {
    return (
        <section className="p-6 bg-white text-gray-900">
            <h1 className="text-2xl font-bold mb-6">Welcome, Admin</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-4 shadow rounded">Total Users: 123</div>
                <div className="bg-white p-4 shadow rounded">Total Blogs: 45</div>
                <div className="bg-white p-4 shadow rounded">Total Categories: 7</div>
            </div>
        </section>
    );
}
