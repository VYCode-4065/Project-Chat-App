import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useGetConversation from "../hooks/useGetConversation";
import { setConversation } from "../store/conversationSlice";

export const AuthContext = createContext();
export const AuthContextVal = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = ({ children }) => {
  const [refresh_token, setRefresh_Token] = useState("");

  useEffect(() => {
    setRefresh_Token(localStorage.getItem("refreshToken"));
  }, []);

  return (
    <AuthContext.Provider value={{ refresh_token, setRefresh_Token }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
