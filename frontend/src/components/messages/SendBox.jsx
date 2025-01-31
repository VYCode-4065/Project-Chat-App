import React, { useEffect, useState } from "react";
import { FiSend } from "react-icons/fi";
import AxiosToastError from "../../utils/AxiosToastError";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../../utils/Axios";
import SummaryApi from "../../common/SummaryApi.js";
import toast from "react-hot-toast";
import useGetMessage from "../../hooks/useGetMessage.js";
import { toggleRefresh } from "../../store/conversationSlice.js";
const baseURL = "https://project-chat-app-jjyf.onrender.com";

const SendBox = () => {
  const [message, setMessage] = useState("");
  const selectedUser = useSelector(
    (state) => state.conversationDetails.selectedUser
  );

  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message) {
      toast.error("Provide message to send ");
      return;
    }
    try {
      const response = await Axios({
        url: `${baseURL}/api/message/send/${selectedUser?._id}`,
        method: "post",
        data: {
          message: message,
        },
      });
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setMessage("");
      dispatch(toggleRefresh());
    }
  };
  return (
    <div className="relative">
      <form
        className="flex items-center justify-between w-full"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Send Message..."
          className="input h-10 w-full"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="absolute inset-y-0 right-3">
          <FiSend size={25} />
        </button>
      </form>
    </div>
  );
};

export default SendBox;
