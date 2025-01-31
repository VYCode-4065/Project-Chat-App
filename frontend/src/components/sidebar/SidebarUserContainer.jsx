import React, { useContext, useEffect } from "react";
import SidebarUser from "../../pages/home/SidebarUser";
import { useDispatch, useSelector } from "react-redux";
import useGetConversation from "../../hooks/useGetConversation";
import { setConversation, toggleUser } from "../../store/conversationSlice";
import { AuthContext } from "../../context/AuthContext";

const SidebarUserContainer = ({ activate }) => {
  const conversationValue = useSelector((state) => state.conversationDetails);

  const { loading, conversation } = useGetConversation();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setConversation(conversation));
    dispatch(toggleUser(null));
  }, [conversation]);

  return (
    <div className="h-[430px] overflow-auto ">
      {Array.isArray(conversationValue?.conversation) &&
        conversationValue?.conversation?.map((val, idx) => {
          return (
            <SidebarUser
              key={val._id}
              convers={val}
              selectUser={conversationValue.selectedUser}
              activate={activate}
            />
          );
        })}
    </div>
  );
};

export default SidebarUserContainer;
