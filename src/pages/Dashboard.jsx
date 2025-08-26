import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../StoreContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { url, token, setToken } = useContext(StoreContext);
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  // ✅ Fetch customers from backend
  useEffect(() => {
    if (!token) {
      navigate("/"); // redirect to login if no token
      return;
    }
    fetchCustomers();
  }, [token]);

  const fetchCustomers = async () => {
    try {
      const res = await axios.get(`${url}/api/customers`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCustomers(res.data);
    } catch (err) {
      console.error("Error fetching customers", err);
    }
  };

  const handleLogout = () => {
    setToken(""); // clear token from context
    localStorage.removeItem("token"); // clear from localStorage
    navigate("/");
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${url}/api/customers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCustomers(); // refresh after delete
    } catch (err) {
      console.error("Error deleting customer", err);
    }
  };

  return (
    <div className="p-6">
      {/* ✅ Header with Logout */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">CRM Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* ✅ Stats Section */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Total Customers</h2>
          <p className="text-2xl">{customers.length}</p>
        </div>
        <div className="bg-green-100 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Active Customers</h2>
          <p className="text-2xl">
            {customers.filter((c) => c.status === "active").length}
          </p>
        </div>
      </div>

      {/* ✅ Customer Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c._id}>
              <td className="border p-2">{c.name}</td>
              <td className="border p-2">{c.email}</td>
              <td className="border p-2">{c.phone}</td>
              <td className="border p-2">
                <button className="bg-yellow-400 px-2 py-1 rounded mr-2">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(c._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
