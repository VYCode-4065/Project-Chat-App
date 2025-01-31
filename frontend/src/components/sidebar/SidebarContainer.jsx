import React from "react";
import SearchInput from "../../pages/home/SearchInput";
import SidebarUser from "../../pages/home/SidebarUser";
import SidebarUserContainer from "./SidebarUserContainer";
import LogoutComponent from "./LogoutComponent";
import { useSelector } from "react-redux";

const SidebarContainer = () => {
  const selectedUser = useSelector(
    (state) => state.conversationDetails.selectedUser
  );
  return (
    <div
      className={`${
        selectedUser?._id ? "hidden" : ""
      } md:flex flex-col justify-center  w-[360px] md:min-w-[300px] md:border-r border-gray-200 md:px-2  overflow-auto`}
    >
      <SearchInput />
      <div className="divider py-0 my-3 h-2 text-white " />
      <SidebarUserContainer />
      <LogoutComponent />
    </div>
  );
};

export default SidebarContainer;
