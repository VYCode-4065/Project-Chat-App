import React, { useContext, useEffect, useRef, useState } from "react";
import Message from "./Message";
import SendBox from "./SendBox";
import useGetConversation from "../../hooks/useGetConversation";
import { useSelector, useDispatch } from "react-redux";
import {
  setConversation,
  setMessages,
  toggleUser,
  unsetSelectedUser,
} from "../../store/conversationSlice";
import AxiosToastError from "../../utils/AxiosToastError";
import axios from "axios";
import Axios from "../../utils/Axios";
import MessageSkeleton from "../../common/MessageSkeleton";
import { AuthContextVal } from "../../context/AuthContext";
import useGetMessage from "../../hooks/useGetMessage";
import useListenMessage from "../../hooks/useListenMessage";
import { FaArrowLeft } from "react-icons/fa";

const MessageContainer = () => {
  useListenMessage();

  const selectedUser = useSelector(
    (state) => state?.conversationDetails?.selectedUser
  );

  const { loading } = useGetMessage();
  const messages = useSelector((state) => state.conversationDetails.messages);

  const authUser = useSelector(
    (state) => state.loggedInUserDetails.loggedInUser
  );

  const scrollRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  const dispatch = useDispatch();

  return (
    <div
      className={`${
        selectedUser?._id ? "" : "hidden"
      } w-[350px] md:min-w-[450px] flex flex-col justify-center gap-2 `}
    >
      <div className="static top-2 h-screen max-h-10 p-2  border rounded-md shadow-sm bg-gray-400 text-black flex items-center gap-3">
        {
          <p
            className="md:hidden"
            onClick={() => {
              dispatch(unsetSelectedUser());
            }}
          >
            <FaArrowLeft size={20} />
          </p>
        }
        <h2>
          <span className="font-semibold text-lg">To :</span>{" "}
          <span className="font-semibold text-base">
            {selectedUser?.fullName}
          </span>
        </h2>
      </div>
      <div className="w-full h-[430px] overflow-auto">
        {loading &&
          [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
        {!loading && !messages[0] && (
          <div className="flex justify-center items-center h-[430px] text-lg">
            <p>No messages yet.</p>
          </div>
        )}
        {messages?.map((val, idx) => {
          return (
            <div key={idx} ref={scrollRef}>
              <Message
                message={val}
                authUser={authUser}
                selectedUser={selectedUser}
              />
            </div>
          );
        })}
      </div>
      <SendBox />
    </div>
  );
};

export default MessageContainer;
