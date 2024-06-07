import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import Notification from "./Notification";

export default function RequiredAdminAuth(props) {
    const { children } = props
    const { user } = useAuthContext()

    return (user.role == "SuperUser" ? children :
        <div>
            <Notification message="You need to be SuperUser" />
        </div>
    )
}