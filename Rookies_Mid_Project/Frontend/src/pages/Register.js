import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import login from '../images/login.png';
import { registerUser } from '../services/Service';

const Register = () => {

    const navigate = useNavigate()
    const [formData, setFormData] = useState({ username: '', password: '' })
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false)

    const validate = () => {
        let tempErrors = {}
        let valid = true

        if (formData.username.length < 3) {
            tempErrors.username = "Username must be at least 3 characters"
            valid = false
        } else if (!/^[a-zA-Z0-9]+$/.test(formData.username)) {
            tempErrors.username = "Username can only contain letters and numbers"
            valid = false
        }

        if (formData.password.length < 8) {
            tempErrors.password = "Password must be at least 8 characters"
            valid = false
        } else if (!/[A-Z]/.test(formData.password)) {
            tempErrors.password = "Password must contain at least 1 uppercase letter"
            valid = false
        } else if (!/[a-z]/.test(formData.password)) {
            tempErrors.password = "Password must contain at least 1 lowercase letter"
            valid = false
        } else if (!/\d/.test(formData.password)) {
            tempErrors.password = "Password must contain at least one digit"
            valid = false
        } else if (!/[\W_]/.test(formData.password)) {
            tempErrors.password = "Password must contain at least one special character"
            valid = false
        }

        setErrors(tempErrors)
        return valid
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (validate()) (
            await registerUser(formData).then(response => {
                console.log("Register successfully", response)
                navigate('/login')
            }).catch(error => {
                console.log("Register failed", error)
            })
        )
    }

    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <p className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-10 h-10 mr-4" src={login} alt="logo" />
                        NashTech
                    </p>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Register
                            </h1>
                            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                                    <input
                                        name="username"
                                        id="username"
                                        placeholder="Username"
                                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required />
                                    {errors.username && <p className="text-red-500 text-sm mt-2">{errors.username}</p>}
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required />
                                    {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password}</p>}
                                </div>
                                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign up</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}

export default Register