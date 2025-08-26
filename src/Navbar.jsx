import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "./StoreContext";

export default function Navbar() {
    const { token, setToken } = useContext(StoreContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-blue-600 text-white">
            <h1 className="text-lg font-bold">My App</h1>

            {/* Responsive Menu */}
            <div className="space-x-4 hidden sm:flex">
                <Link to="/">Home</Link>
                <Link to="/dashboard">Dashboard</Link>
            </div>

            {/* Right side - Login / Logout */}
            <div>
                {!token ? (
                    <Link
                        to="/login"
                        className="bg-white text-blue-600 px-4 py-1 rounded-lg hover:bg-gray-200"
                    >
                        Login
                    </Link>
                ) : (
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 px-4 py-1 rounded-lg hover:bg-red-600"
                    >
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
}
