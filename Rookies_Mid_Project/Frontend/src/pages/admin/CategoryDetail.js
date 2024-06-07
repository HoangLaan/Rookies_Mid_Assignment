import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getDetailCategory } from "../../services/Service";

const CategoryDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate();

    const [categories, setCategories] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)

        getDetailCategory(id).then(response => setCategories(response));
    }, [])

    return (
        <div className="dark:bg-gray-900 md:h-screen p-10">
            <button onClick={() => navigate('/admin/categories')} className="fixed top-20 left-10 bg-blue-500 text-white px-6 py-4 rounded shadow w-20">
                Back
            </button>
            <div className="bg-white overflow-hidden shadow rounded-lg mt-10 border">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Category Detail
                    </h3>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                    <dl className="sm:divide-y sm:divide-gray-200">
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-[1fr_12fr] sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Category ID
                            </dt>
                            <dd className=" mt-1 text-sm text-gray-900 sm:mt-0 font-semibold">
                                {id}
                            </dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-[1fr_12fr] sm:gap-4 sm:px-6 font-semibold">
                            <dt className="text-sm font-medium text-gray-500">
                                Category Name
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 ">
                                {categories.name}
                            </dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-[1fr_12fr] sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Category Description
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 font-semibold">
                                {categories.description}
                            </dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-[1fr_12fr] sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Created At
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 font-semibold">
                                {categories.createdAt}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    )
}
export default CategoryDetail;