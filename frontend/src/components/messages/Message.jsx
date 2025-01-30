import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { extractTime } from "../../utils/extractedTime";

const Message = ({ authUser, message, selectedUser }) => {
  const forMe = authUser._id === message?.senderId ? "chat-end" : "chat-start";

  const profilePic =
    authUser._id === message?.senderId
      ? authUser.profilePic
      : selectedUser?.profilePic;

  return (
    <div className={`chat ${forMe} ${message.shouldshake ? "shake" : ""} mt-2`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePic} />
        </div>
      </div>
      <div
        className={`chat-bubble ${forMe === "chat-end" ? "bg-blue-500" : ""}`}
      >
        {message.message}
      </div>
      <div className="chat-footer opacity-80">
        {extractTime(message.createdAt)}
      </div>
    </div>
  );
};

export default Message;
