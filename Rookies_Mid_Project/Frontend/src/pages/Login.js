import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import login from '../images/login.png';
import { loginUser } from '../services/Service';

const Login = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        userName: '',
        password: ''
    })

    const handleNavigation = () => {
        window.location.href = '/home'
    }

    const [errors, setErrors] = useState({})
    const validate = () => {
        let tempErrors = {}
        let valid = true

        if (formData.userName.length < 3) {
            tempErrors.userName = "Username must be at least 3 characters"
            valid = false
        }

        if (formData.password.length < 8) {
            tempErrors.password = "Password must be at least 8 characters"
            valid = false
        }
        setErrors(tempErrors)
        return valid
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (validate) {
            await loginUser(formData).then(reponse => {
                console.log('Login successfully: ', reponse)
                handleNavigation()
            }).catch(error => {
                console.error('Error login: ', error)
            })
        }
    }

    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-10 h-10 mr-4" src={login} alt="logo" />
                        NashTech
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                                    <input
                                        value={formData.userName}
                                        name="username"
                                        id="username"
                                        placeholder="Username"
                                        onChange={(event) => setFormData({ ...formData, userName: event.target.value })}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required />
                                    {errors.userName && <p className="text-red-500 text-sm mt-2">{errors.userName}</p>}
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input
                                        value={formData.password}
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        onChange={(event) => setFormData({ ...formData, password: event.target.value })}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required="" />
                                    {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password}</p>}
                                </div>

                                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-gray-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an account yet? <a onClick={() => navigate('/register')} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}

export default Login