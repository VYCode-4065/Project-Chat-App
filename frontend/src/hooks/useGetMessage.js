import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import { setMessages, toggleRefresh } from '../store/conversationSlice';

const useGetMessage = () => {

    const selectedUser = useSelector(
        (state) => state?.conversationDetails?.selectedUser
    );

    const messages = useSelector(state => state.conversationDetails.messages);
    const refreshToggle = useSelector(state => state.conversationDetails.refresh);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const GetMessageHandler = async () => {
        setLoading(true);
        try {
            const response = await Axios({
                url: `${import.meta.env.VITE_BACKEND_URL}/api/message/get/${selectedUser._id}`,
                method: "GET",
            });

            dispatch(setMessages(response.data));
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (selectedUser) {
            GetMessageHandler();
        }
    }, [selectedUser, refreshToggle, toggleRefresh]);

    return {
        loading
    };
}

export default useGetMessage;
