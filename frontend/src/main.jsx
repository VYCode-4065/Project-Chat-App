import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./context/AuthContext.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { SocketProvider } from "./context/SocketContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AuthContextProvider>
          <SocketProvider>
            <App />
          </SocketProvider>
          {/* <App /> */}
        </AuthContextProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
