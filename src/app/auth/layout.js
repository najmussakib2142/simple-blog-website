export default function AuthLayout({ children }) {
    
    return (
        <div className=" flex py-20 items-center justify-center bg-gray-900 px-4">
            {/* Container with max width */}
            <div className="w-full max-w-4xl   rounded-lg shadow-lg">
                {children}
            </div>
        </div>
    );
}
