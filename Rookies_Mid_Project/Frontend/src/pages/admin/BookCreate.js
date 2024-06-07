import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import Input from "../../components/Input"
import { createBook, getListCategories } from "../../services/Service"


const BookCreate = () => {
    const navigate = useNavigate()

    const [books, setBooks] = useState({
        title: "", author: "", description: "", quantity: "", categoryId: ""
    })
    const [categories, setCategories] = useState([])


    useEffect(() => {
        loadCategoryName()
    }, [])

    const loadCategoryName = async () => {
        var categoriesList = await getListCategories()
        const cateName = categoriesList.map(category => ({
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

    const handleSubmit = () => {
        createBook(books).then(response => {
            console.log('Book created successfully:', response)
        }).catch(error => {
            console.error('Error creating book:', error)
        })
        navigate("/admin/books")
    }

    return (
        <div className="dark:bg-gray-900 md:h-screen p-10">
            <button onClick={() => navigate("/admin/books")} className="fixed top-20 left-10 bg-blue-500 text-white px-6 py-4 rounded shadow w-20">
                Back
            </button>
            <div className="bg-white overflow-hidden shadow rounded-lg border w-2/5 mt-10">
                <div className="px-4 py-5 sm:px-10">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Create Book
                    </h3>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 px-10 pb-10" action="#">
                    <Input
                        value={books.title}
                        name="title"
                        placeholder="Book Title"
                        onChange={handleChange}
                    />
                    <Input
                        value={books.author}
                        name="author"
                        placeholder="Author"
                        onChange={handleChange}
                    />
                    <Input
                        value={books.description}
                        name="description"
                        placeholder="Description"
                        onChange={handleChange}
                    />
                    <Input
                        type="number"
                        value={books.quantity}
                        name="quantity"
                        placeholder="Quantity"
                        onChange={handleChange}
                    />
                    <div className="flex">
                        <h3 className="pr-7">Select Categories</h3>
                        <select
                            onChange={handleChange}
                            name="categoryId"
                            value={books.categoryId}
                            className=" bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="">Choose</option>
                            {categories.map((category) => (
                                <option value={category.categoryId} key={category.categoryId}>{category.categoryName}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-1 px-2 rounded ml-10 mb-10">Create</button>
                </form>

            </div>
        </div>
    )
}

export default BookCreate