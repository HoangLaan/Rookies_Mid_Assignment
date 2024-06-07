import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuthContext } from "../../context/AuthContext";
import { getDetailBook } from "../../services/Service";

const BookDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { user } = useAuthContext()

    const [books, setBooks] = useState([])

    useEffect(() => {
        getDetailBook(id).then(response => setBooks(response));
    }, [])

    const NavigatePage = () => {
        if (user.role === 'NormalUser') {
            navigate('/books')
        } else
            navigate('/admin/books')
    }

    return (
        <div className="dark:bg-gray-900 md:h-screen p-10">
            <button onClick={() => NavigatePage()} className="fixed top-20 left-10 bg-blue-500 text-white px-6 py-4 rounded shadow w-20">
                Back
            </button>
            <div className="bg-white overflow-hidden shadow rounded-lg mt-10 border w-2/5">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Book Detail
                    </h3>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                    <dl className="sm:divide-y sm:divide-gray-200">
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-[1fr_12fr] sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Book ID
                            </dt>
                            <dd className=" mt-1 text-sm text-gray-900 sm:mt-0 font-semibold">
                                {id}
                            </dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-[1fr_12fr] sm:gap-4 sm:px-6 font-semibold">
                            <dt className="text-sm font-medium text-gray-500">
                                Book Title
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ">
                                {books.title}
                            </dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-[1fr_12fr] sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Book Author
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 font-semibold">
                                {books.author}
                            </dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-[1fr_12fr] sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Book Description
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 font-semibold">
                                {books.description}
                            </dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-[1fr_12fr] sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Publish Date
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 font-semibold">
                                {books.publishedDate}
                            </dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-[1fr_12fr] sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Category
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 font-semibold">
                                {books.categoryNames}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    )
}
export default BookDetail;