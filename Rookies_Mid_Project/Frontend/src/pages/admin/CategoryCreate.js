import { useState } from "react"
import { useNavigate } from "react-router"
import Input from "../../components/Input"
import { createCategory } from "../../services/Service"


const CategoryCreate = () => {
    const navigate = useNavigate()

    const [category, setCategory] = useState({
        name: "", description: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategory(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = () => {
        createCategory(category).then(response => {
            console.log('Category created successfully:', response);
        }).catch(error => {
            console.error('Error creating category:', error);
        });
        navigate("/admin/categories")
    }

    return (
        <div className="dark:bg-gray-900 md:h-screen p-10">
            <button onClick={() => navigate('/admin/categories')} className="fixed top-20 left-10 bg-blue-500 text-white px-6 py-4 rounded shadow w-20">
                Back
            </button>
            <div className="bg-white overflow-hidden shadow rounded-lg border mt-10 w-2/5">
                <div className="px-4 py-5 sm:px-10">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Create Category
                    </h3>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 px-10 pb-10" action="#">
                    <Input
                        value={category.name}
                        name="name"
                        placeholder="Category name"
                        onChange={handleChange}
                    />
                    <Input
                        value={category.description}
                        name="description"
                        placeholder="Description"
                        onChange={handleChange}
                    />
                    <button type="submit" className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-1 px-2 rounded ml-10 mb-10">Create</button>
                </form>

            </div>
        </div>
    )
}

export default CategoryCreate