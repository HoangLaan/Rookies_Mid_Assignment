import { Navigate } from "react-router";
import { useAuthContext } from "../context/AuthContext";
import { AppRoutes } from "../routes/AppRoutes";
import Navigation from "./Navigation";
const Layout = () => {

    return (
        <>
            <div>
                <Navigation />
            </div>

            <div>
                <AppRoutes />
            </div>
        </>
    )
}
export default Layout