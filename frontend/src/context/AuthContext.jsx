import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();
export const AuthContextVal = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = ({ children }) => {
  const [refresh_token, setRefreshToken] = useState("");
  useEffect(() => {
    setRefreshToken(localStorage.getItem("refreshToken"));
  }, []);
  // localStorage.getItem("Refresh_Token").toString()

  return (
    <AuthContext.Provider value={{ refresh_token, setRefreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
