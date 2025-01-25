import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import SendBox from "./SendBox";
import useGetConversation from "../../hooks/useGetConversation";
import { useSelector, useDispatch } from "react-redux";
import { setConversation } from "../../store/conversationSlice";
import AxiosToastError from "../../utils/AxiosToastError";
import axios from "axios";
import Axios from "../../utils/Axios";
import MessageSkeleton from "../../common/MessageSkeleton";

const MessageContainer = () => {
  const { loading, conversation, getConversation } = useGetConversation();

  const conversationData = useSelector(
    (state) => state?.conversationDetails?.conversation
  );

  const selectedUser = useSelector(
    (state) => state?.conversationDetails?.selectedUser
  );

  const [messageDetails, setMessageDetails] = useState([]);

  const [messageLoading, setMessageLoading] = useState(false);

  const GetMessageHandler = async () => {
    setMessageLoading(true);
    try {
      const response = await Axios({
        url: `${import.meta.env.VITE_BACKEND_URL}/api/message/get/${
          selectedUser._id
        }`,
        method: "GET",
      });

      setMessageDetails(response.data);
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setMessageLoading(false);
    }
  };

  const authUser = useSelector(
    (state) => state.loggedInUserDetails.loggedInUser
  );

  const [refreshMessage, setRefreshMessage] = useState(false);

  useEffect(() => {
    GetMessageHandler();
  }, [selectedUser, refreshMessage]);

  const scrollRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messageDetails]);

  return (
    <div className="md:min-w-[450px] flex flex-col justify-center gap-2 ">
      <div className="max-h-10 p-2  border rounded-md shadow-sm bg-gray-400 text-black">
        <h2>
          <span className="font-semibold text-lg">To :</span>{" "}
          <span className="font-semibold text-base">
            {selectedUser?.fullName}
          </span>
        </h2>
      </div>
      <div className="w-full h-[430px] overflow-auto">
        {messageLoading &&
          [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
        {!messageLoading && !messageDetails[0] && (
          <div className="flex justify-center items-center h-[430px] text-lg">
            <p>No messages yet.</p>
          </div>
        )}
        {messageDetails.map((val, idx) => {
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
      <SendBox setRefreshMessage={setRefreshMessage} />
    </div>
  );
};

export default MessageContainer;
