export default function Features() {
    const features = [
        {
            title: "Create Blogs",
            description: "Write and publish your blogs easily with our user-friendly editor.",
            icon: "📝",
        },
        {
            title: "Read Blogs",
            description: "Explore blogs from other authors and gain new insights.",
            icon: "📚",
        },
        {
            title: "Secure Authentication",
            description: "Register and log in to manage your blogs securely.",
            icon: "🔒",
        },
        {
            title: "Responsive Design",
            description: "Access your favorite blogs from any device, anytime.",
            icon: "📱",
        },
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl text-black font-bold text-center mb-12">Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-gray-200 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 text-center"
                        >
                            <div className="text-4xl mb-4">{feature.icon}</div>
                            <h3 className="text-xl text-black font-semibold mb-2">{feature.title}</h3>
                            <p className="text-gray-500">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
