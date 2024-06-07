import { useNavigate } from "react-router-dom"
import Search from "./Search"


const BookHeader = () => {
    const navigate = useNavigate()

    return (
        <div>
            <div className="flex justify-between items-center p-4">
                <button
                    onClick={() => navigate("/books")}
                    className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-1 px-2 rounded">
                    Add Book
                </button>
                <div className="flex-1 mx-auto max-w-md">
                    <Search />
                </div>
            </div>
            <table className="min-w-full bg-white pt-14">
                <thead className=''>
                    <tr>
                        <th className="py-2 px-4 border-b border-gray-200 text-center w-1/12">ID</th>
                        <th className="py-2 px-4 border-b border-gray-200 text-center w-1/12">Title</th>
                        <th className="py-2 px-4 border-b border-gray-200 text-center w-1/12">Author</th>
                        <th className="py-2 px-4 border-b border-gray-200 text-center w-2/12">Description</th>
                        <th className="py-2 px-4 border-b border-gray-200 text-center w-1/12">Quantity</th>
                        <th className="py-2 px-4 border-b border-gray-200 text-center w-1/12">Category</th>
                        <th className="py-2 px-4 border-b border-gray-200 text-center w-2/12">Action</th>
                    </tr>
                </thead>
            </table>
        </div>
    )
}

export default BookHeader