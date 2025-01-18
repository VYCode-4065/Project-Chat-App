import React from "react";
import Message from "./Message";
import SendBox from "./SendBox";

const MessageContainer = () => {
  return (
    <div className="md:min-w-[450px] flex flex-col justify-center gap-2 ">
      <div className="max-h-10 p-2  border rounded-md shadow-sm bg-gray-400 text-black">
        <h2>
          <span className="font-semibold text-lg">To :</span>{" "}
          <span className="font-semibold text-base">Vicky Yadav</span>
        </h2>
      </div>
      <div className="w-full h-[430px] overflow-auto">
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
      </div>
      <SendBox />
    </div>
  );
};

export default MessageContainer;
