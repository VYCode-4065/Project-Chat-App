import { useContext, useState } from "react"
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useDispatch } from "react-redux";
import { setLoggedInUserDetails } from "../store/userDetailSlice";

const useLogin = () => {

    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false);

    const { setRefresh_Token } = useContext(AuthContext);

    const login = async (username, password) => {
        const success = verfiyLogin(username, password);
        if (!success) {
            return;
        }
        try {

            setLoading(true);
            const response = await Axios({
                ...SummaryApi.login,
                data: {
                    userName: username,
                    password: password
                }
            })

            const { data: responseData } = response;

            if (responseData.success) {
                toast.success(responseData.message);
                localStorage.setItem('refreshToken', responseData.refreshToken);
                setRefresh_Token(responseData.refreshToken);
                dispatch(setLoggedInUserDetails(responseData.data))
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    }
    return { loading, login };
}

export default useLogin;

const verfiyLogin = (username, password) => {
    if (!username || !password) {
        toast.error('Please enter a username and password ');
        return false;
    }
    if (password.length < 6) {
        toast.error('Please enter a correct password');
        return false;
    }
    return true;
}