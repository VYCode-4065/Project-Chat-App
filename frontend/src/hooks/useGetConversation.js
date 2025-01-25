import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';

const useGetConversation = () => {

    const [loading, setLoading] = useState(false);

    const [conversation, setConversation] = useState([]);

    useEffect(() => {
        const getConversation = async () => {
            if (!localStorage.getItem('refreshToken')) {
                toast.error("You must be logged in")
                return;
            }

            try {

                setLoading(true);

                const res = await Axios({
                    ...SummaryApi.getParticipants
                })

                const { data: responseData } = res;



                if (responseData.success) {
                    // toast.success(responseData.message);

                    setConversation(responseData.data)
                }

            } catch (error) {
                AxiosToastError(error);
            } finally {
                setLoading(false);
            }
        }
        getConversation();
    }, [])


    return {
        loading,
        conversation,
    }
}

export default useGetConversation;