import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryHeader from "../../components/CategoryHeader";
import loadingg from '../../images/loading2.png';
import { approveRequest, deleteCategory, getRequest, rejectRequest, showRequest } from "../../services/Service";
import Search from "../../components/Search";
import { useAuthContext } from "../../context/AuthContext";

function BookBorrowed() {
    const { user } = useAuthContext();
    const [requests, setRequest] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const [search, setSearch] = useState('');
    const [searchCriterion, setSearchCriterion] = useState('username');
    const filteredRequest = requests.filter(request => {
        if (searchCriterion === 'username') {
            return request.userName.toLowerCase().includes(search.toLowerCase());
        } else if (searchCriterion === 'book') {
            return request.title.toLowerCase().includes(search.toLowerCase());
        }
        return false;
    });

    //Paginate
    const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 5
    const lastIndex = currentPage * recordsPerPage
    const firstIndex = lastIndex - recordsPerPage
    const records = filteredRequest.slice(firstIndex, lastIndex)
    const npage = Math.ceil(filteredRequest.length / recordsPerPage)
    const numbers = [...Array(npage + 1).keys()].slice(1)

    useEffect(() => {
        showAllRequest()
    }, [])

    const showAllRequest = async () => {
        try {
            const data = await getRequest()
            const request = data.filter(req => req.userName == user.name);
            setRequest(request);
            setLoading(false)
        } catch (e) {
            console.log(e)
        }
    }
    const handleApprove = async (id) => {
        try {
            await approveRequest(id)
            showAllRequest()
        } catch (e) {
            console.log(e)
        }
    }

    const handleReject = async (id) => {
        try {
            await rejectRequest(id)
            showAllRequest()
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div className="container mx-auto px-4">
            {loading && <img className="opacity-40" src={loadingg} />}

            <div className="border border-gray-500 rounded p-4 my-36">
                <h2 className="flex justify-center text-2xl font-bold pb-4">All Requests</h2>
                {!loading &&
                    <div>
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
                                    <option value="username">Username</option>
                                    <option value="book">Book</option>
                                </select>
                            </div>
                        </form>


                        <table className="min-w-full bg-white">
                            <thead className=''>
                                <tr>
                                    <th className="py-2 px-4 border-b border-gray-200 text-center w-2/12">Book Name</th>
                                    <th className="py-2 px-4 border-b border-gray-200 text-center w-4/12">Request Date</th>
                                    <th className="py-2 px-4 border-b border-gray-200 text-center w-4/12">Status</th>
                                </tr>
                            </thead>
                        </table>
                    </div>}
                {/* Loop to get Request */}
                {records.map((request, id) => {
                    const bookTitles = request.title.split(',').map(title => title.trim());
                    return (
                        <div key={id} >
                            <table className="min-w-full bg-white" >
                                <tbody>
                                    {/* Loop to get book of each request */}
                                    {bookTitles.map((title, index) => (
                                        <tr key={index}>
                                            <td className="py-2 px-4 text-center border-b border-gray-200 w-2/12">{title}</td>
                                            <td className="py-2 px-4 text-center border-b border-gray-200 w-4/12">{request.requestDate}</td>
                                            <td className="py-2 px-4 text-center border-b border-gray-200 w-4/12">
                                                {request.requestStatus === 0 ? (
                                                    <><span>Waiting</span></>
                                                ) : (
                                                    <span>{request.requestStatus === 1 ? 'Approved' : 'Rejected'}</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )
                })}
                <div className="w-full flex justify-end pt-5">
                    <nav className=" bottom-4 right-4">
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

export default BookBorrowed