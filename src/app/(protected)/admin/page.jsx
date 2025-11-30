// This component assumes it is a Server Component, meaning fetch can be used directly.

// Helper function to fetch data from a specific endpoint
async function getCount(endpoint) {
    try {
        const response = await fetch(`http://localhost:3000${endpoint}`, {
            // Optional: Disable caching if you want fresh counts on every visit (use 'no-store')
            // or revalidate periodically (use 'revalidate: 60')
            cache: 'no-store',
        });

        if (!response.ok) {
            // Log the status but allow the app to continue with a default value
            console.error(`Failed to fetch data from ${endpoint}. Status: ${response.status}`);
            return 0;
        }

        const data = await response.json();

        // --- IMPORTANT LOGIC ---
        // Assuming your API returns an array or an object with a 'count' field.
        // We will default to returning the length if it's an array, or 0 otherwise.
        if (Array.isArray(data)) {
            return data.length;
        } else if (data && typeof data.count === 'number') {
            return data.count;
        }

        // Fallback for unexpected format
        console.warn(`Unexpected data format from ${endpoint}:`, data);
        return 0;

    } catch (error) {
        console.error(`Error fetching data from ${endpoint}:`, error);
        return 0; // Return 0 on network error
    }
}

export default async function AdminHome() {
    // Fetch all counts concurrently
    const [userCount, blogCount, categoryCount] = await Promise.all([
        getCount('/api/users'),
        getCount('/api/blogs'),
        getCount('/api/categories'),
    ]);

    // Data for the dashboard cards
    const dashboardStats = [
        { title: "Total Users", count: userCount },
        { title: "Total Blogs", count: blogCount },
        { title: "Total Categories", count: categoryCount },
        { title: "Recent Comments", count: 9 }, // Keeping the hardcoded example for now
    ];


    return (
        <section>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-8 border-b pb-4 border-gray-200">
                👋 Welcome to SimpleBlog Admin
            </h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {dashboardStats.map((stat) => (
                    <div
                        key={stat.title}
                        className="bg-white p-6 shadow-lg rounded-xl border border-gray-100 hover:shadow-xl transition duration-300"
                    >
                        <p className="text-sm font-semibold text-gray-500 mb-1">{stat.title}</p>
                        <h2 className="text-4xl font-bold text-gray-900">{stat.count}</h2>
                    </div>
                ))}
            </div>

            {/* Placeholder for Recent Activity/Charts */}
            <div className="mt-10 p-8 bg-white shadow-lg rounded-xl border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Activity Overview</h3>
                <p className="text-gray-500">
                    [Placeholder for recent activity list or chart component]
                </p>
            </div>
        </section>
    );
}