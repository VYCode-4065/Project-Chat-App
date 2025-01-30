import React from "react";
import { TbMessages } from "react-icons/tb";
import { useSelector } from "react-redux";

const NoSelectionUser = () => {
  const authUser = useSelector(
    (state) => state.loggedInUserDetails?.loggedInUser
  );
  return (
    <div className="h-[450px] min-w-96 ">
      <div className="flex flex-col items-center justify-center h-full text-xl text-neutral-300 mt-16 font-serif">
        <h2>
          Welcome <span className="font-bold">👋 {authUser.fullName}🌟</span>
        </h2>
        <h2>Select a chat to start messaging</h2>
        {/* logo of chat */}
        <TbMessages size={60} />
      </div>
    </div>
  );
};

export default NoSelectionUser;
