import { Toaster } from "react-hot-toast";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { refresh_token } = useContext(AuthContext);

  return (
    <div className="md:p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route
          path="/"
          element={refresh_token ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={refresh_token ? <Navigate to={"/"} /> : <Login />}
        />
        <Route
          path="/signup"
          element={refresh_token ? <Navigate to={"/"} /> : <SignUp />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
