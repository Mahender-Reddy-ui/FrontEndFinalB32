import { useState, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../StoreContext";

export default function Login() {
    const [data, setData] = useState({ email: "", password: "" });
    const { setToken, url } = useContext(StoreContext);

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${url}/api/auth/login`, data);
            setToken(res.data.token);
            localStorage.setItem("token", res.data.token);
            alert("Logged in successfully");
        } catch (err) {
            alert("Invalid credentials");
            console.error(err.response?.data || err.message);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-2 p-4 bg-white rounded-lg shadow-md w-64"
        >
            <input
                name="email"
                placeholder="Email"
                className="border p-2 rounded"
                onChange={handleChange}
                required
            />
            <input
                name="password"
                type="password"
                placeholder="Password"
                className="border p-2 rounded"
                onChange={handleChange}
                required
            />
            <button
                type="submit"
                className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
                Login
            </button>
        </form>
    );
}
