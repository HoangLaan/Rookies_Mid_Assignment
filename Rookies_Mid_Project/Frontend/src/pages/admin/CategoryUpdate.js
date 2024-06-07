import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import Input from "../../components/Input"
import { getDetailCategory, updateCategory } from "../../services/Service"


const CategoryUpdate = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [categories, setCategories] = useState({
        categoryId: "", name: "", description: "", createdAt: ""
    })
    useEffect(() => {
        getDetailCategory(id).then(response => setCategories(response))
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategories(prev => ({
            ...prev,
            [name]: value
        }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const confirm = window.confirm("Are you sure to update category")
        if (confirm) {
            await updateCategory(id, categories)
            navigate('/admin/categories')
        }
    }

    return (
        <div className="dark:bg-gray-900 md:h-screen p-10">
            <button onClick={() => navigate('/admin/categories')} className="fixed top-20 left-10 bg-blue-500 text-white px-6 py-4 rounded shadow w-20">
                Back
            </button>
            <div className="bg-white overflow-hidden shadow rounded-lg border mt-10 w-2/5">
                <div className="px-4 py-5 sm:px-10">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Update Category
                    </h3>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 px-10 pb-10" action="#">
                    <Input
                        value={categories.categoryId}
                        name="categoryId"
                        placeholder="Category ID"
                        onChange={handleChange}
                    />
                    <Input
                        value={categories.name}
                        name="name"
                        placeholder="Category Name"
                        onChange={handleChange}
                    />
                    <Input
                        value={categories.description}
                        name="description"
                        placeholder="Description"
                        onChange={handleChange}
                    />
                    <Input
                        value={categories.createdAt}
                        name="createdAt"
                        placeholder="Created at"
                        onChange={handleChange}
                    />
                    <button type="submit" className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-1 px-2 rounded ml-10 mb-10">Update</button>
                </form>

            </div>
        </div>
    )
}

export default CategoryUpdate