/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
import Link from "next/link";
import React from "react";
import { FaChevronRight, FaHome } from "react-icons/fa";

const BreadCrumb = ({ pid, title, industrialTypeName, userId }) => {
  return (
    <>
      {/* breadcrumb */}
      <div className="w-[1200px] py-4 flex items-center gap-3 mx-auto ">
        <Link href="/">
          <a className="text-red-600 text-base">
            <FaHome />
          </a>
        </Link>
        <span className="text-sm text-gray-00">
          <FaChevronRight />
        </span>
        <Link href={`/product/${pid}`}>
          <a className="text-rose-800 font-medium">{industrialTypeName}</a>
        </Link>
        {industrialTypeName != null ? (
          <span className="text-sm text-gray-00">
            <FaChevronRight />
          </span>
        ) : (
          ""
        )}
        <Link href={`/product/${pid}`}>
          <a className="text-rose-800 font-medium">{title}</a>
        </Link>
        {userId != null ? (
          <span className="text-sm text-gray-00">
            <FaChevronRight />
          </span>
        ) : (
          ""
        )}
        <Link href={`/user/account/profile`}>
          <a className="text-rose-800 font-medium">{userId}</a>
        </Link>
      </div>
      {/* breadcrumb */}
    </>
  );
};

export default BreadCrumb;
