import { Navigate, Outlet } from "react-router-dom";
import { useSateContext } from "../context/Context";

export default function Unregistered() {
    const { token } = useSateContext();

    if (token) {
        return <Navigate to="/" />;
    }

    return (
        <div>
            <Outlet />
        </div>
    );
}
