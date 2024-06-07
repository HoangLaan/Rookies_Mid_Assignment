import { Link } from "react-router-dom";
import nashtechlogo from "../images/nashtechlogo.png"
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

function Navigation() {
    const { isAuthenticated, user } = useAuthContext()
    const [isLogin, setIsLogin] = useState(isAuthenticated)
    const handleLogout = () => {

        localStorage.removeItem('token')

        window.location.href = '/login'
    }

    return (
        <nav className="bg-gray-700 w-full">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center h-16 ">
                    <div className="flex-shrink-0">
                        <Link to="/home" className="text-white pr-5">
                            <img src={nashtechlogo} className="h-12 mt-5" alt="" />
                        </Link>
                    </div>
                    <div className="ml-5">
                        <Link to="/home" className="text-white pr-5">
                            Home
                        </Link>
                        {user.role === 'NormalUser' && (
                            <>
                                <Link to="/books" className="text-white pr-5">
                                    Book Library
                                </Link>
                                <Link to='/borrow-requests' className="text-white pr-5">
                                    Borrowed Book
                                </Link>
                            </>
                        )}
                        {user.role === 'SuperUser' && (
                            <>
                                <Link to="/admin/books" className="text-white pr-5">
                                    Manage Book
                                </Link>
                                <Link to="/admin/borrow-requests" className="text-white pr-5">
                                    Manage Request
                                </Link>
                                <Link to="/admin/categories" className="text-white pr-5">
                                    Category
                                </Link></>
                        )}

                    </div>
                    <div className="ml-auto">
                        <Link to="/profile" className="text-white pr-5">
                            {user.name}
                        </Link>
                        {isLogin ? (
                            <Link className="text-white pr-5" onClick={handleLogout}>
                                Logout
                            </Link>
                        ) : (
                            <Link to="/login" className="text-white pr-5">
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}
export default Navigation