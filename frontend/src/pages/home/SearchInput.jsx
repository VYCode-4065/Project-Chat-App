import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaSearch } from "react-icons/fa";
import useGetConversation from "../../hooks/useGetConversation";
import { useDispatch } from "react-redux";
import { setConversation, toggleUser } from "../../store/conversationSlice";

const SearchInput = () => {
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const { conversation } = useGetConversation();

  const handleOnSearch = (e) => {
    e.preventDefault();
    if (!search) return;

    if (search.length < 3) {
      return toast.error("Search must be at least 3 characters long !");
    }

    const findConversation = conversation.find((con) =>
      con.fullName.toLowerCase().includes(search.toLocaleLowerCase())
    );

    if (findConversation) {
      dispatch(toggleUser(findConversation));
      setSearch("");
    } else {
      toast.error("No conversation found!");
      setSearch("");
    }
  };
  return (
    <form
      className="flex items-center gap-2  text-white w-full"
      onSubmit={handleOnSearch}
    >
      <input
        type="text"
        placeholder="Search... "
        className="input input-bordered rounded-full w-full max-w-xs h-11"
        value={search}
        onChange={handleSearchChange}
      />
      <span className="text-base bg-clip-padding p-3 text-white rounded-full bg-blue-500 ">
        <FaSearch className="h-5 w-5 cursor-pointer" />
      </span>
    </form>
  );
};

export default SearchInput;
