import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import loadingg from '../../images/loading2.png';
import { deleteCategory, getListCategories } from "../../services/Service";

function Category() {
    const [categories, setCategory] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const [search, setSearch] = useState('');
    const [searchCriterion, setSearchCriterion] = useState('username');

    const filteredCategories = categories.filter(category => {
        if (searchCriterion === 'username') {
            return category.name.toLowerCase().includes(search.toLowerCase());
        } else if (searchCriterion === 'book') {
            return category.description.toLowerCase().includes(search.toLowerCase());
        }
        return false;
    });
    //Paginate
    const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 5
    const lastIndex = currentPage * recordsPerPage
    const firstIndex = lastIndex - recordsPerPage
    const records = filteredCategories.slice(firstIndex, lastIndex)
    const npage = Math.ceil(filteredCategories.length / recordsPerPage)
    const numbers = [...Array(npage + 1).keys()].slice(1)

    useEffect(() => {
        getAllCategory()
    }, [])

    const getAllCategory = async () => {
        try {
            const data = await getListCategories();
            setCategory(data)
            setLoading(false)
        } catch (e) {
            console.log(e);
        }
    }

    const DeleteCategory = async (id) => {
        const confirm = window.confirm("Are you sure to delete?")

        if (confirm) {
            await deleteCategory(id);
            getAllCategory();
        }
    }
    const UpdateCategory = (id) => {
        navigate(`/admin/categories/update/${id}`)
    }
    const DetailCategory = (id) => {
        navigate(`/admin/categories/${id}`)
    }

    return (
        <div className="container mx-auto px-4">
            {loading && <img className="opacity-40" src={loadingg} />}

            <div className="border border-gray-500 rounded p-4 my-36">
                <h2 className="flex justify-center text-2xl font-bold pb-4">All Categories</h2>
                {!loading && (
                    <div >
                        <button
                            onClick={() => navigate("/admin/categories")}
                            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-1 px-2 rounded mr-4">
                            Add Category
                        </button>
                        <form className="max-w-md mx-auto">
                            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                            <div className="relative flex">
                                <div className="relative flex-1">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="search"
                                        onChange={(e) => setSearch(e.target.value)}
                                        value={search}
                                        id="search"
                                        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder={`Search by ${searchCriterion}`}
                                        required
                                    />
                                </div>
                                <select
                                    onChange={(e) => setSearchCriterion(e.target.value)}
                                    value={searchCriterion}
                                    className="ml-4 p-4 text-sm text-gray-900 border rounded-lg bg-gray-300"
                                >
                                    <option value="name">Name</option>
                                    <option value="description">Description</option>
                                </select>
                            </div>
                        </form>
                        <table className="min-w-full bg-white pt-14">
                            <thead className="">
                                <tr>
                                    <th className="py-2 px-4 border-b border-gray-200 text-center w-2/12">ID</th>
                                    <th className="py-2 px-4 border-b border-gray-200 text-center w-2/12">Name</th>
                                    <th className="py-2 px-4 border-b border-gray-200 text-center w-4/12">Description</th>
                                    <th className="py-2 px-4 border-b border-gray-200 text-center w-4/12">Action</th>
                                </tr>
                            </thead>
                        </table>
                    </div>)}
                {records.map((category, id) => {
                    return (
                        <div key={id} >
                            <table className="min-w-full bg-white" >
                                <tbody>
                                    <tr>
                                        <td className="py-4 px-4 border-b border-gray-200 text-center w-2/12 ">{category.id}</td>
                                        <td className="py-4 px-4 text-center border-b border-gray-200 w-2/12">{category.name}</td>
                                        <td className="py-4 px-4 text-center border-b border-gray-200 w-4/12">
                                            {category.description.length > 40 ? `${category.description.substring(0, 40)}...` : category.description}
                                        </td>
                                        <td className="py-4 px-4 border-b border-gray-200 w-4/12">
                                            <div className="flex justify-center">
                                                <button onClick={() => DetailCategory(category.id)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded mr-2">Detail</button>
                                                <button onClick={() => UpdateCategory(category.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mr-2">Update</button>
                                                <button onClick={() => DeleteCategory(category.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded ">Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )
                })}
                <div className="w-full flex justify-end pt-5">
                    <nav className="">
                        <ul className="flex list-none">
                            <li className="page-item">
                                <a
                                    href="#"
                                    className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
                                    onClick={prePage}
                                >
                                    Prev
                                </a>
                            </li>
                            {
                                numbers.map((n, i) => (
                                    <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                        <a
                                            href="#"
                                            className={`px-3 py-2 leading-tight ${currentPage === n ? 'text-blue-600 bg-blue-50 border border-blue-300' : 'text-gray-500 bg-white border border-gray-300'} hover:bg-gray-100 hover:text-gray-700`}
                                            onClick={() => changeCurrentPage(n)}
                                        >
                                            {n}
                                        </a>
                                    </li>
                                ))
                            }
                            <li className="page-item">
                                <a
                                    href="#"
                                    className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
                                    onClick={nextPage}
                                >
                                    Next
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )

    function nextPage() {
        if (currentPage !== npage)
            setCurrentPage(currentPage + 1)
    }

    function changeCurrentPage(id) {
        setCurrentPage(id)
    }
    function prePage() {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1)
        }
    }


}

export default Category