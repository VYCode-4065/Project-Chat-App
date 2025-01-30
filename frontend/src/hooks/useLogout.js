import { useContext, useState } from "react"
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useDispatch } from "react-redux";
import { setLoggedInUserDetails } from "../store/userDetailSlice";

const useLogout = () => {
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { setRefresh_Token } = useContext(AuthContext);

    const dispatch = useDispatch();

    const logout = async () => {

        if (!localStorage.getItem('refreshToken')) {
            toast.error("You are not logged in");
            return;
        }

        try {
            setLoading(true);
            const response = await Axios({
                ...SummaryApi.logout
            })

            const { data: responseData } = response;

            if (responseData.success) {
                toast.success(responseData.message);
                dispatch(setLoggedInUserDetails(''));
                localStorage.removeItem('refreshToken');
                setRefresh_Token(null);
            }

        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    }
    return { loading, logout };
}

export default useLogout;