import { useNavigate } from "react-router-dom"
import Search from "./Search"


const CategoryHeader = () => {
    const navigate = useNavigate()

    return (
        <div>
            <button onClick={() => navigate("/admin/categories")} className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-1 px-2 rounded m-4">Add Category</button>
            <Search />
            <table className="min-w-full bg-white pt-14">
                <thead className=''>
                    <tr>
                        <th className="py-2 px-4 border-b border-gray-200 text-center w-2/12">ID</th>
                        <th className="py-2 px-4 border-b border-gray-200 text-center w-2/12">Name</th>
                        <th className="py-2 px-4 border-b border-gray-200 text-center w-4/12">Description</th>
                        <th className="py-2 px-4 border-b border-gray-200 text-center w-4/12">Action</th>
                    </tr>
                </thead>
            </table>
        </div>
    )
}

export default CategoryHeader