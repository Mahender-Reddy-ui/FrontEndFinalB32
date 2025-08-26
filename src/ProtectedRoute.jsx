import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "./StoreContext.jsx";

const ProtectedRoute = ({ children }) => {
    const { token } = useContext(StoreContext);
    return token ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
