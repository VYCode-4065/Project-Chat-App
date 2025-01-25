import React from "react";
import SidebarUser from "./SidebarUser";
import SearchInput from "./SearchInput";
import SidebarContainer from "../../components/sidebar/SidebarContainer";
import MessageContainer from "../../components/messages/MessageContainer";
import NoSelectionUser from "../../components/NoSelectionUser/NoSelectionUser";
import { useSelector } from "react-redux";

const Home = () => {
  const selectedUser = useSelector(
    (state) => state.conversationDetails.selectedUser
  );

  return (
    <div className=" md:min-w-[450px]">
      <div className="flex gap-3 h-full w-full bg-green-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-100 p-7">
        <SidebarContainer />
        {!selectedUser ? <NoSelectionUser /> : <MessageContainer />}
      </div>
    </div>
  );
};

export default Home;
