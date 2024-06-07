import { useRoutes } from "react-router";
import RequiredAdminAuth from "../components/RequireAdminAuth";
import RequiredAuth from "../components/RequiredAuth";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import BookAdmin from "../pages/admin/BookAdmin";
import BookCreate from "../pages/admin/BookCreate";
import BookUpdate from "../pages/admin/BookUpdate";
import Category from "../pages/admin/Category";
import CategoryCreate from "../pages/admin/CategoryCreate";
import CategoryDetail from "../pages/admin/CategoryDetail";
import CategoryUpdate from "../pages/admin/CategoryUpdate";
import Request from "../pages/admin/RequestManage";
import BookDetail from "../pages/user/BookDetail";
import Book from "../pages/user/Book";
import BookBorrowed from "../pages/user/BookBorrowed";

export const AppRoutes = () => {
    const elements = useRoutes(
        [
            {
                path: '/home', element:
                    <Home />
            },
            {
                path: '/books', element:
                    <RequiredAuth>
                        <Book />
                    </RequiredAuth>
            },
            {
                path: '/borrow-requests', element:
                    <RequiredAuth>
                        <BookBorrowed />
                    </RequiredAuth>
            },
            {
                path: '/admin/books', element:
                    <RequiredAuth>
                        <RequiredAdminAuth>
                            <BookAdmin />
                        </RequiredAdminAuth>
                    </RequiredAuth>
            },
            {
                path: '/books/:id', element:
                    <RequiredAuth>
                        <BookDetail />
                    </RequiredAuth>
            },

            //admin
            {
                path: '/book', element:
                    <RequiredAdminAuth>
                        <BookCreate />
                    </RequiredAdminAuth>
            },
            {
                path: '/books/update/:id', element:
                    <RequiredAdminAuth>
                        <BookUpdate />
                    </RequiredAdminAuth>
            },
            {
                path: '/admin/categories', element:
                    <RequiredAuth>
                        <RequiredAdminAuth>
                            <Category />
                        </RequiredAdminAuth>
                    </RequiredAuth>
            },
            {
                path: '/admin/categories', element:
                    <RequiredAdminAuth>
                        <CategoryCreate />
                    </RequiredAdminAuth>
            },
            {
                path: '/admin/categories/:id', element:
                    <RequiredAdminAuth>
                        <CategoryDetail />
                    </RequiredAdminAuth>
            },
            {
                path: '/admin/categories/update/:id', element:
                    <RequiredAdminAuth>
                        <CategoryUpdate />
                    </RequiredAdminAuth>
            },

            { path: '/login', element: <Login /> },
            { path: '/register', element: <Register /> },
            {
                path: '/profile', element:
                    <RequiredAuth>
                        <Profile />
                    </RequiredAuth>
            },

            { path: '/admin/borrow-requests', element: <Request /> },
        ]
    )
    return elements;
}