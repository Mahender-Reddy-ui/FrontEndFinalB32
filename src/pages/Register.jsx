import { useState, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../StoreContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [data, setData] = useState({ username: "", email: "", password: "" });
    const { url } = useContext(StoreContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${url}/api/auth/register`, data);
            alert("User registered! Please login.");
            navigate("/");
        } catch (err) {
            alert("Error while registering");
            console.error(err.response?.data || err.message);
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <input name="username" placeholder="Username" onChange={handleChange} />
            <input name="email" placeholder="Email" onChange={handleChange} />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} />
            <button type="submit">Register</button>
        </form>
    );
}
