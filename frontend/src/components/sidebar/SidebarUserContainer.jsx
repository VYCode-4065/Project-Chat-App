import React from "react";
import SidebarUser from "../../pages/home/SidebarUser";

const SidebarUserContainer = () => {
  return (
    <div className="h-[430px] overflow-auto ">
      <SidebarUser />
      <SidebarUser />
      <SidebarUser />
      <SidebarUser />
    </div>
  );
};

export default SidebarUserContainer;
