// auth.context.jsx
import { createContext, useState } from "react";

export const AuthContext = createContext({});

export const AuthWrapper = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: { email: "", name: "" },
  });
  const [appLoading, setAppLoading] = useState(true); // bắt đầu = true

  return (
    <AuthContext.Provider value={{ auth, setAuth, appLoading, setAppLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
