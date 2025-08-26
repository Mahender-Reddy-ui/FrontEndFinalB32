import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { StoreProvider } from "./StoreContext.jsx";
import Navbar from "./Navbar.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

function App() {
  return (
    <StoreProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />  
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </StoreProvider>
  );
}

export default App;
