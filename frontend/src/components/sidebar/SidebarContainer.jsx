import React from "react";
import SearchInput from "../../pages/home/SearchInput";
import SidebarUser from "../../pages/home/SidebarUser";
import SidebarUserContainer from "./SidebarUserContainer";
import LogoutComponent from "./LogoutComponent";

const SidebarContainer = () => {
  return (
    <div className="   flex flex-col justify-center md:min-w-[300px] border-r border-gray-200 md:px-2  overflow-auto">
      <SearchInput />
      <div className="divider py-0 my-3 h-2 text-white " />
      <SidebarUserContainer />
      <LogoutComponent />
    </div>
  );
};

export default SidebarContainer;
