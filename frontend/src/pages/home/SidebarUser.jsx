import React from "react";

const SidebarUser = () => {
  return (
    <>
      <div className="flex items-center justify-between px-2 my-2 cursor-pointer ">
        <div className="flex items-center gap-4">
          <div className="avatar online">
            <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <h2 className="font-semibold text-xl text-white">Jhon Doe</h2>
        </div>
        <p className="h-6 w-6 mr-5">🤪</p>
      </div>
      <div className="divider py-0 my-3 h-2 text-white " />
    </>
  );
};

export default SidebarUser;
