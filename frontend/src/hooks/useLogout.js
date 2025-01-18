import { useContext, useState } from "react"
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const useLogout = () => {
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { setRefreshToken } = useContext(AuthContext);

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
                localStorage.removeItem('refreshToken');
                setRefreshToken(null);
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