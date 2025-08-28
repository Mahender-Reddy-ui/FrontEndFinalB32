import { createContext, useState } from "react";

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const url = "https://backendfinalb32-jyxw.onrender.com"; 
  return (
    <StoreContext.Provider value={{ token, setToken, url }}>
      {children}
    </StoreContext.Provider>
  );
};
