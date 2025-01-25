import React, { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import Loading from "../../components/Loading";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

const Login = () => {
  const { loading, login } = useLogin();

  const [showPassword, setShowPassword] = useState(false);

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(loginData.username, loginData.password);
  };

  return (
    <div className="px-4 py-8 min-w-96 mx-auto bg-green-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
      <div>
        <h2 className="text-center text-white text-3xl font-bold mb-5">
          Login
          <span className="text-blue-600 font-bold text-3xl pl-5">ChatApp</span>
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="username " className="text-base font-semibold ">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter username "
              className="text-base input input-bordered shadow-lg h-10 w-full"
              value={loginData.username}
              onChange={handleOnChange}
            />
          </div>

          <div className="grid gap-1">
            <label htmlFor="password " className="text-base font-semibold ">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter password "
                value={loginData.password}
                onChange={handleOnChange}
                className="text-base input input-bordered shadow-lg h-10 w-full"
              />
              <button
                onClick={() => setShowPassword((prev) => !prev)}
                type="button"
                className="absolute inset-y-0 right-3"
              >
                {!showPassword ? <FaEyeSlash size={25} /> : <FaEye size={25} />}
              </button>
            </div>
          </div>

          <Link
            to="/signup"
            className="text-base font-semibold hover:text-blue-600 pt-3"
          >
            Don't have account ?
          </Link>

          <button
            disabled={loading}
            className="btn btn-block shadow-md h-10 mt-5 text-lg font-semibold hover:text-white"
          >
            {loading ? <Loading /> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
