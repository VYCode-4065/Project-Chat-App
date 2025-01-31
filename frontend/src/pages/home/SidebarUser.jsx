import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toggleUser } from "../../store/conversationSlice";
import { getRandomEmoji } from "../../utils/Emoji";
import { SocketContextVal } from "../../context/SocketContext";

const SidebarUser = ({ convers, selectUser, activate }) => {
  const [emoji, setEmoji] = useState("");

  useEffect(() => {
    setEmoji(getRandomEmoji());
  }, []);

  const dispatch = useDispatch();

  const handleSelectUser = () => {
    dispatch(toggleUser(convers));
  };

  const onlineUser = SocketContextVal()?.onlineUser;

  const isOnline = onlineUser?.includes(convers._id);

  return (
    <>
      <div
        className={`flex text-black items-center justify-between px-2 my-2 cursor-pointer 0 p-2 rounded-lg bg-opacity-30 ${
          selectUser === convers ? "bg-sky-500" : ""
        }`}
        onClick={() => {
          handleSelectUser();
          activate();
        }}
      >
        <div className="flex items-center gap-4">
          <div className={`avatar ${isOnline ? "online" : ""}`}>
            <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
              <img
                src={
                  convers.profilePic
                    ? convers.profilePic
                    : "https://avatar.iran.liara.run/public"
                }
              />
            </div>
          </div>
          <h2 className="font-semibold text-xl text-white">
            {convers.fullName}
          </h2>
        </div>
        <p className="h-6 w-6 mr-5">{emoji}</p>
      </div>
      <div className="divider py-0 my-3 h-2 text-white " />
    </>
  );
};

export default SidebarUser;
