import React from "react";
import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";
import Loading from "../Loading";

const LogoutComponent = () => {
  const { loading, logout } = useLogout();

  return (
    <div className="text-white font-bold my-auto">
      {!loading ? (
        <button onClick={logout} disabled={loading}>
          <BiLogOut size={30} />
        </button>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default LogoutComponent;
