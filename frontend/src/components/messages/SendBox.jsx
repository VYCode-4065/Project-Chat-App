import React from "react";
import { FiSend } from "react-icons/fi";
const SendBox = () => {
  return (
    <div className="relative">
      <div className="flex items-center justify-between   w-full ">
        <input
          type="text"
          placeholder="Send Message..."
          className="input   h-10 w-full"
        />
        <button className="absolute inset-y-0 right-3">
          <FiSend size={25} />
        </button>
      </div>
    </div>
  );
};

export default SendBox;
