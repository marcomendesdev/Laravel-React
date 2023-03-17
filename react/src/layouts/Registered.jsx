import { Link, Navigate, Outlet } from "react-router-dom";
import { useSateContext } from "../context/Context";

export default function Registered() {
    const { user, setUser, token, setToken } = useSateContext();

    if (!token) {
        return <Navigate to="/login" />;
    }

    const onLogout = (e) => {
        e.preventDefault();
        setUser({});
        setToken(null);
        localStorage.removeItem("ACCESS_TOKEN");
    };

    return (
        <div className="registered">
            <aside>
                <Link id="linkRegistered" to="/dashboard">
                    Dashboard
                </Link>
                <Link id="linkRegistered" to="/users">
                    Users
                </Link>
            </aside>
            <div id="formHeader">
                <header>
                    <div style={{fontSize: 25}}>Account User</div>
                    <h2>{user.name}</h2>
                    <div>
                        <button onClick={onLogout}>Logout</button>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
