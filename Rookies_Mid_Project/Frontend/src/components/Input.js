
function Input(props) {
    const { value, placeholder, name, onChange, type = "" } = props

    return (

        <div className="flex h-8">
            <p className="mr-2 flex w-36">{placeholder}</p>
            <input
                value={value}
                name={name}
                placeholder={placeholder}
                onChange={onChange}
                type={type}
                className="flex-grow bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required />
        </div>
    )
}

export default Input