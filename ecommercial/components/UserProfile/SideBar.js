import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import {
  FaAddressCard,
  FaCreditCard,
  FaGift,
  FaSignOutAlt,
} from "react-icons/fa";
import AuthContext from "../../context/authContext";

const SideBar = () => {
  const { user } = useContext(AuthContext);
  const { fullName, imageUrl, username } = user;
  return (
    <>
      {/* account profile */}
      <div className="px-4 py-3 bg-white shadow flex items-center gap-4 rounded">
        <div className="flex-shrink-0 flex ">
          <div className="w-14 h-14 relative">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt=""
                layout="fill"
                className=" rounded-full border border-gray-200 p-1 object-cover"
              ></Image>
            )}
          </div>
        </div>
        <div className="flex-grow">
          <p className="text-gray-600"> Xin chào,</p>
          <h4 className="text-gray-800 font-bold">
            {fullName == null ? username : fullName}
          </h4>
        </div>
      </div>
      {/* account profile */}
      <div className="mt-6 px-10 bg-white shadow rounded p-4 divide-y divide-gray-200 space-y-4 text-gray-600">
        <div className="space-y-1 pl-8">
          <Link href="/user/account/profile">
            <a className="relative text-base font-sans capitalize hover:text-primary transition block text-primary">
              Quản lý tài khoản
              <span className="absolute -left-8 top-1 text-base">
                <FaAddressCard />
              </span>
            </a>
          </Link>
          <Link href="/user/account/infor">
            <a className="hover:text-primary transition capitalize block">
              Hồ sơ
            </a>
          </Link>

          <Link href="/user/account/address">
            <a className="hover:text-primary transition capitalize block">
              Địa chỉ
            </a>
          </Link>
          <a
            href="change-password.html"
            className="hover:text-primary transition capitalize block"
          >
            Đổi mật khẩu
          </a>
        </div>

        <div className="space-y-1 pl-8 pt-4">
          <a
            href="#"
            className="relative medium capitalize text-gray-800 font-sans hover:text-primary transition block"
          >
            Lịch sử đặt hàng
            <span className="absolute -left-8 top-1 text-base">
              <FaGift />
            </span>
          </a>
          <a
            href="#"
            className="hover:text-primary transition block capitalize"
          >
            Lợi nhuận
          </a>
          <a
            href="#"
            className="hover:text-primary transition block capitalize"
          >
            Đã hủy
          </a>
          <a
            href="#"
            className="hover:text-primary transition block capitalize"
          >
            Nhận xét
          </a>
        </div>

        <div className="space-y-1 pl-8 pt-4">
          <a
            href="#"
            className="relative capitalize text-gray-800 font-sans hover:text-primary transition block"
          >
            Thanh toán
            <span className="absolute -left-8 top-1 text-base">
              <FaCreditCard />
            </span>
          </a>
          <a
            href="#"
            className="hover:text-primary transition block capitalize"
          >
            Voucher
          </a>
        </div>

        {/* <div class="pl-8 pt-4">
                 <a href="wishlist.html" class="relative medium capitalize text-gray-800 font-medium hover:text-primary transition block">
                 Sản phẩm yêu thích
                      <span class="absolute -left-8 top-1 text-base">
                          <FaRegHeart/>
                      </span>
                  </a>
              </div> */}
      </div>
      <div className="space-y-1 mt-4">
        <div className="mx-auto w-full max-w-md rounded bg-white p-2">
          <button className="flex w-full justify-between rounded bg-rose-100 px-4 py-2 text-left text-sm font-sans text-rose-900 hover:bg-rose-200 focus:outline-none focus-visible:ring focus-visible:ring-rose-500 focus-visible:ring-opacity-75">
            <div className="flex  items-center justify-center space-x-4">
              <FaSignOutAlt />
              <span>Đăng xuất</span>
            </div>
          </button>
        </div>
      </div>
      {/* profile link */}
    </>
  );
};

export default SideBar;
