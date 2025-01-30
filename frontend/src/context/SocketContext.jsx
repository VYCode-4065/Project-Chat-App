import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { AuthContextVal } from "./AuthContext";

const socketContext = createContext();

export const SocketContextVal = () => {
  return useContext(socketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUser, setOnlineUser] = useState([]);

  const authUser = useSelector(
    (state) => state.loggedInUserDetails?.loggedInUser
  );

  useEffect(() => {
    if (authUser) {
      const newSocket = io(import.meta.env.VITE_BACKEND_URL, {
        query: {
          userId: authUser._id,
        },
      });
      setSocket(newSocket);

      newSocket.on("getOnlineUsers", (users) => {
        setOnlineUser(users);
      });

      // Cleanup function to close the socket on unmount or when dependencies change
      return () => {
        newSocket.close();
        setSocket(null);
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <socketContext.Provider value={{ socket, onlineUser }}>
      {children}
    </socketContext.Provider>
  );
};
