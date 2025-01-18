import React, { useContext, useState } from "react";
import GenderCheckBox from "../../components/GenderCheckBox";
import { Link, useNavigate } from "react-router-dom";
import Axios from "../../utils/Axios";
import SummaryApi from "../../common/SummaryApi";
import toast from "react-hot-toast";
import Loading from "../../components/Loading";
import { FaEyeSlash } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";
import { AuthContext, AuthContextVal } from "../../context/AuthContext";

const SignUp = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const [isPassword, setIsPassword] = useState(true);
  const [isConfirmPassword, setIsConfirmPassword] = useState(true);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onGenderChange = (gender) => {
    setSignupData({ ...signupData, gender: gender });
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setSignupData({ ...signupData, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (signupData.password.length < 6) {
      toast.error("Please enter atleast 6 characters");
      return;
    }
    if (signupData.password !== signupData.confirmPassword) {
      toast.error("Password and confirm password must be the same");
      return;
    }
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.signUp,
        data: signupData,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      navigate("/login");
    }
  };
  return (
    <div className="px-4 py-8 min-w-96 mx-auto bg-green-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 border border-gray-100 ">
      <div className="w-full h-full ">
        <h2 className="text-center text-white text-3xl font-bold mb-5">
          SignUp
          <span className="text-blue-600 font-bold text-3xl pl-5">ChatApp</span>
        </h2>
        <form className="flex flex-col gap-2" onSubmit={handleOnSubmit}>
          <div className="grid gap-1">
            <label htmlFor="fullname" className="text-base font-semibold ">
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              name="fullName"
              placeholder="Full Name"
              value={signupData.fullName}
              onChange={handleOnChange}
              className="text-base input input-bordered shadow-lg h-10 w-full"
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="username" className="text-base font-semibold ">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="userName"
              placeholder="Username"
              value={signupData.userName}
              onChange={handleOnChange}
              className="text-base input input-bordered shadow-lg h-10 w-full"
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="password" className="text-base font-semibold ">
              Password
            </label>
            <div className="flex items-center relative">
              <input
                type={isPassword ? "password" : "text"}
                id="password"
                name="password"
                placeholder="Password"
                value={signupData.password}
                onChange={handleOnChange}
                className="text-base input input-bordered shadow-lg h-10 w-full"
              />
              <p
                className="absolute inset-y-0 right-2 mt-2 cursor-pointer "
                onClick={() => setIsPassword((prev) => !prev)}
              >
                {isPassword ? <FaEyeSlash size={25} /> : <IoMdEye size={25} />}
              </p>
            </div>
          </div>
          <div className="grid gap-1">
            <label
              htmlFor="confirmpassword"
              className="text-base font-semibold "
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={isConfirmPassword ? "password" : "text"}
                id="confirmpassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={signupData.confirmPassword}
                onChange={handleOnChange}
                className="text-base input input-bordered shadow-lg h-10 w-full"
              />
              <p
                className="absolute inset-y-0 right-2 mt-2 cursor-pointer"
                onClick={() => setIsConfirmPassword((prev) => !prev)}
              >
                {isConfirmPassword ? (
                  <FaEyeSlash size={25} />
                ) : (
                  <IoMdEye size={25} />
                )}
              </p>
            </div>
          </div>
          <GenderCheckBox
            onGenderChange={onGenderChange}
            selectedGender={signupData.gender}
          />

          <Link
            to={"/login"}
            className="text-base font-semibold hover:text-blue-600 "
          >
            Already have an account ?
          </Link>
          <button className="btn btn-block shadow-md h-10 mt-5 text-lg font-semibold hover:text-white">
            {loading ? <Loading /> : "SignUp"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
