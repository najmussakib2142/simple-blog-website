export default function AuthLayout({ children }) {
    
    return (
        <div className=" flex py-20 items-center justify-center bg-gray-900 px-4">
            {/* Container with max width */}
            <div className="w-full max-w-3xl bg-gray-200 p-8 rounded-lg shadow-lg">
                {children}
            </div>
        </div>
    );
}
