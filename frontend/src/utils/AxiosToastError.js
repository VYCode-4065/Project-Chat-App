import toast from "react-hot-toast";

const AxiosToastError = (error) => {
    const message = error?.response?.data.message || error.message

    return toast.error(message);
}

export default AxiosToastError;