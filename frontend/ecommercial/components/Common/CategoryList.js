import Image from "next/image";
import React from "react";
import { useContext } from "react";
import LanguageContext from "../../context/languageContext";

const CategoryList = ({ iconUrl, name, id, languageData }) => {
  




  return (
    <div className="bg-white rounded-lg shadow-xl w-[130px] h-[130px] cursor-pointer ">
      <div className="flex items-center justify-center flex-col p-3">
        <Image src={iconUrl} alt="" width={70} height={70}></Image>
        <span className="text-sm font-semibold">{name}</span>
      </div>
    </div>
  );
};

export default CategoryList;
