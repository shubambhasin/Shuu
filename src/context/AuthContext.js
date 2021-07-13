import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const userinfo = JSON.parse(localStorage?.getItem("user")) || {
    isUserLoggedIn: false,
    username: null,
    authToken: null,
  };
  const { isUserLoggedIn, username, authToken } = userinfo;
  const [login, setLogin] = useState(isUserLoggedIn);
  const [loader, setLoader] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        login,
        setLogin,
        loader,
        setLoader,
        isUserLoggedIn,
        username,
        authToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
