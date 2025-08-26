import { createContext, useState } from "react";

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const url = "http://localhost:5000"; 
  return (
    <StoreContext.Provider value={{ token, setToken, url }}>
      {children}
    </StoreContext.Provider>
  );
};
