export default function AuthLayout({ children }) {
    
    return (
        <div className=" flex bg-gray-50 py-20 items-center justify-center  px-4">
            {/* Container with max width */}
            <div className="w-full max-w-4xl   rounded-lg ">
                {children}
            </div>
        </div>
    );
}
