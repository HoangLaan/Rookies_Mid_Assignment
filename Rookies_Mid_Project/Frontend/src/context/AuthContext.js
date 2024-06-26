import { Children, createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext({
    isAuthenticated: false,
    setIsAuthenticated: () => { },
    user: { name: '', id: '', role: '' },
    setUser: () => { }
})

export const useAuthContext = () => useContext(AuthContext);


const AuthProvider = ({ children }) => {
    //localstorage.setItem('token', '123123')
    const token = localStorage.getItem('token')

    const [isAuthenticated, setIsAuthenticated] = useState(!!token);
    const [user, setUser] = useState({ name: '', id: '', role: '' })
    useEffect(() => {
        const UserData = () => {
            if (token) {
                try {
                    const decodedToken = jwtDecode(token)
                    setUser({
                        name: decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
                        id: decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
                        role: decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
                    })
                } catch (error) {
                    console.error('Error decoding token: ', error);
                    setIsAuthenticated(false);
                    localStorage.removeItem('token');
                }
            }
        }
        UserData();
    }, [token]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider