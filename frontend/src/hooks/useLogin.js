import { useContext, useState } from "react"
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const useLogin = () => {

    const [loading, setLoading] = useState(false);

    const { setRefreshToken } = useContext(AuthContext);

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
                setRefreshToken(responseData.refreshToken);

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