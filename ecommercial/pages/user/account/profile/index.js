import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import BreadCrumb from "../../../../components/breadcrumb/BreadCrumb";
import Layout from "../../../../components/common/Layout";
import SideBar from "../../../../components/UserProfile/SideBar";
import UserLayout from "../../../../components/UserProfile/UserLayout";
import AuthContext from "../../../../context/authContext";

const UserProfileScreen = () => {
  const { user } = useContext(AuthContext);

  if (user === null || user === undefined || user === "") {
    return <div>loading</div>;
  }

  return (
    <UserLayout userId={user?.id}>
      <div className="col-span-12 grid md:grid-cols-2  gap-4 mt-6 lg:mt-0">
        <div className="shadow-md rounded bg-white px-4 pt-6 pb-8">
          <div className="flex justify-between items center mb-4">
            <h3 className="font-bold capitalize text-gray-800 text-lg">
              Thông tin cá nhân
            </h3>
            <Link href="/">
              <a className="text-rose-500">Chỉnh sửa</a>
            </Link>
          </div>
          <div className="space-y-1">
            <h4 className="text-gray-800 font-medium">
              <span className="text-base font-bold">Họ và tên: </span>
              {user.fullName}
            </h4>
            <p className="text-gray-800">
              <span className="text-base font-bold">Địa chỉ email: </span>
              {user.email}
            </p>
            <p className="text-gray-800">
              <span className="text-base font-bold">Số điện thoại: </span>
              {user.telephone}
            </p>
          </div>
        </div>

        <div className="shadow-md rounded bg-white  px-4 pt-6 pb-8">
          <div className="flex justify-between items center mb-4">
            <h3 className="font-bold capitalize text-gray-800 text-lg">
              Địa chỉ giao hàng
            </h3>
            <Link href="/user/account/address">
              <a className="text-rose-500">Chỉnh sửa</a>
            </Link>
          </div>
          <div className="space-y-1">
            <h4 className="text-gray-800 font-medium">
              <span className="text-base font-bold">Họ và tên: </span>
              {user.fullName}
            </h4>
            <p className="text-gray-800">
              <span className="text-base font-bold">Địa chỉ: </span>
              {user.address?.address1}
            </p>

            <p className="text-gray-800">
              <span className="text-base font-bold">Số điện thoại: </span>
              {user.telephone}
            </p>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default UserProfileScreen;
