import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import React from "react";

const SearchBar = () => {
  return (
    <>
      <div className="flex items-center rounded-full border-2 shadow-md hover:shadow-lg hover:shadow-gray-200 transition duration-150 md:w-[120%] lg:w-full">
        <input
          type="text"
          className="outline-none pl-5 bg-transparent flex-grow h-12 md:h-10 focus:ring-0 border-none"
          placeholder="Tìm kiếm"
        />
        <MagnifyingGlassIcon className="text-white h-8  bg-red-500 p-2  rounded-full hidden md:inline-flex md:mx-2 md:cursor-pointer cursor-pointer hover:bg-red-600 transition duration-200" />
        <AdjustmentsHorizontalIcon className="text-black h-10  bg-white p-2 rounded-full  md:hidden mx-1 cursor-pointer border-2 hover:bg-gray-200 transition duration-200" />
      </div>
    </>
  );
};

export default SearchBar;
