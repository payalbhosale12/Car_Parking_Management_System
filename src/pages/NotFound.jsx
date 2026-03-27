const NotFound = ()=>{
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center">
                    <h1 className="text-9xl font-bold text-gray-400">404</h1>
                    <h2 className="text-4xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
                    <p className="text-gray-600 mb-8">The page you are looking for doesn't exist.</p>
                    <a 
                        href="/" 
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                    >
                        Go Back Home
                    </a>
                </div>
            </div>
        )
};

export default NotFound;