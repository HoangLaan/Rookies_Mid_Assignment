import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import Input from "../../components/Input"
import { getDetailBook, getListCategories, updateBook } from "../../services/Service"


const BookUpdate = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [books, setBooks] = useState({
        id: "", title: "", author: "",
        description: "", quantity: "", category: ""
    })
    const [categories, setCategories] = useState([])
    useEffect(() => {
        getDetailBook(id).then(response => setBooks(response))
    }, [])

    useEffect(() => {
        loadCategoryName()
    }, [])
    const loadCategoryName = async () => {
        var categoryList = await getListCategories()
        const cateName = categoryList.map(category => ({
            categoryId: category.id,
            categoryName: category.name
        }))
        setCategories(cateName)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setBooks(prev => ({
            ...prev,
            [name]: value
        }))
    }
    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value, 10)
        if (!isNaN(value) && value >= 0) {
            setBooks(prev => ({
                ...prev,
                quantity: value
            }))
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const confirm = window.confirm("Are you sure to update book?")
        if (confirm) {
            await updateBook(id, books)
            navigate('/admin/books')
        }
    }

    return (
        <div className="dark:bg-gray-900 md:h-screen p-10">
            <button onClick={() => navigate('/admin/books')} className="fixed top-20 left-10 bg-blue-500 text-white px-6 py-4 rounded shadow w-20">
                Back
            </button>
            <div className="bg-white overflow-hidden shadow rounded-lg border mt-10 w-2/5">
                <div className="px-4 py-5 sm:px-10">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Update Book
                    </h3>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 px-10 pb-10" action="#">
                    <Input
                        value={books.id}
                        name="bookId"
                        placeholder="Book Id"
                        onChange={handleChange}
                    />
                    <Input
                        value={books.title}
                        name="title"
                        placeholder="Book title"
                        onChange={handleChange}
                    />
                    <Input
                        value={books.author}
                        name="author"
                        placeholder="Book author"
                        onChange={handleChange}
                    />
                    <Input
                        value={books.description}
                        name="description"
                        placeholder="Book description"
                        onChange={handleChange}
                    />
                    <div className="flex items-center space-x-4">
                        <p className="pr-16">Quantity</p>
                        <div className="pl-3 flex items-center justify-center">
                            <input
                                type="number"
                                value={books.quantity}
                                onChange={handleQuantityChange}
                                className="mx-2 text-center w-12 border border-gray-300 rounded"
                                min="0"
                            />
                        </div>
                    </div>
                    <div className="flex">
                        <h3 className="pr-7">Select Categories</h3>
                        <select
                            onChange={handleChange}
                            name="categoryId"
                            value={books.category}
                            className=" bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="">Choose</option>
                            {categories.map((category) => (
                                <option value={category.categoryId} key={category.categoryId}>{category.categoryName}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-1 px-2 rounded ml-10 mb-10">Update</button>
                </form>

            </div>
        </div>
    )
}

export default BookUpdate