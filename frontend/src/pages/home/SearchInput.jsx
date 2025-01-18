import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchInput = () => {
  return (
    <div className="flex items-center gap-2  text-white w-full">
      <input
        type="text"
        placeholder="Search... "
        className="input input-bordered rounded-full w-full max-w-xs h-11"
      />
      <span className="text-base bg-clip-padding p-3 text-white rounded-full bg-blue-500 ">
        <FaSearch className="h-5 w-5 cursor-pointer" />
      </span>
    </div>
  );
};

export default SearchInput;
