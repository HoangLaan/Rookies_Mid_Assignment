import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

function Home() {
    const { isAuthenticated } = useAuthContext()
    return (
        <div className="bg-gray-100 min-h-screen flex justify-center items-center">
            <div className=" mx-auto p-8 bg-white rounded-lg shadow-lg text-center w-full">
                <h1 className="text-3xl font-bold mb-4">Welcome to Hoàng Lân Library</h1>
                <p className="text-lg text-gray-700 mb-8">Explore my collection of books and start your reading journey today!</p>
                <div className="flex justify-center space-x-4">
                    {isAuthenticated ? (
                        <></>
                    ) : (
                        <Link to="/login" className="text-blue-500 border border-blue-500 hover:text-white hover:bg-blue-500 px-6 py-3 rounded-lg shadow-lg transition-colors duration-300 ease-in-out">Log In</Link>
                    )}
                </div>
            </div>
        </div>

    )
}

export default Home
