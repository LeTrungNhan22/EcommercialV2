import axios from "axios";
import Cookies from "js-cookie";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { FaDollarSign } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";


import AuthContext from "../../context/authContext";
import { getError } from "../../utils/error";

const CheckoutScreen = () => {
    const router = useRouter();
    const { user } = useContext(AuthContext);

    return (
        <>
            <Head>
                <title>Thanh toán</title>
            </Head>
            <header className="sticky top-0 z-20 shadow-md  py-2 bg-white ">
                <div className="w-[1200px] mx-auto border-l px-6 my-5 border-red-600">
                    <Link href="/">
                        <a className="text-red-700">HOME</a>
                    </Link>
                    <h2 className="text-3xl text-rose-500">Thanh toán</h2>
                </div>
            </header>
            {/* checkout page */}

            <main className="bg-gray-300 py-3">
                <section className="bg-white  w-[1200px] mx-auto shadow-md mb-3  ">
                    <div className="address-checkout"></div>
                    <div className="p-3 flex items-center space-x-3 text-amber-500 text-xl mb-3">
                        <GrLocation className="text-amber-500" />
                        <h3>Địa chỉ nhận hàng</h3>
                    </div>

                    <div className="grid grid-cols-4 mx-auto items-center justify-center px-4 pb-6">
                        <div className=" flex flex-col">
                            <span>Lê Trung Nhân</span>
                            <span className="font-bold">0353357781</span>
                        </div>
                        <div className="col-span-2">
                            <p>
                                Cổng Sau Trường Đh Thể Dục Thể Thao Khu Phố 6, Phường Linh
                                Trung, Thành Phố Thủ Đức, TP. Hồ Chí Minh
                            </p>
                        </div>
                        <div className="space-x-10">
                            <span className=" text-xs border p-1 border-rose-500 text-red-600 ">
                                Mặc định
                            </span>
                            <>
                                <button
                                    type="button"
                                    className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-rose-600 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                                >
                                    Thay đổi địa chỉ
                                </button>
                            </>
                        </div>
                    </div>
                </section>

                {/* product checkout */}
                <section className="bg-white w-[1200px] mx-auto shadow-md px-2 py-4">
                    <div className="grid grid-cols-2 items-center px-4 mb-2">
                        <h3 className="text-2xl text-amber-600">Sản phẩm</h3>
                        <div className="flex justify-between text-gray-400">
                            <span>Đơn giá </span>
                            <span>Số lượng </span>
                            <span>Thành tiền</span>
                        </div>
                    </div>

                    {/* {cartDetailByUserId.map(
                        ({ totalPrice, quantity, productVariant, id }) => (
                            <div className="grid grid-cols-4" key={id}>
                                <div className=" flex items-center space-x-3 px-2">
                                    <div className="w-32 h-32 relative">
                                        <Image
                                            src={productVariant.imageUrl}
                                            alt=""
                                            layout="fill"
                                            className="object-center object-contain "
                                        ></Image>
                                    </div>
                                    <span>{productVariant.productName}</span>
                                </div>
                                <div className="items-center flex">
                                    <span className="text-gray-400">
                                        {productVariant.industrial}
                                    </span>
                                </div>
                                <div className="flex col-span-2 justify-between items-center p-4">
                                    <span>{totalPrice}</span>
                                    <span>{quantity}</span>
                                    <span>{totalPrice}</span>
                                </div>
                            </div>
                        )
                    )} */}

                    <div className="bg-cyan-50 w-full  px-2 py-4 border border-cyan-200">
                        <div className="grid grid-cols-3">
                            <div className="space-x-3">
                                <span className="text-sm">Lời nhắn: </span>
                                <input
                                    type="text"
                                    placeholder="Lưu ý cho người bán"
                                    className="rounded shadow"
                                />
                            </div>
                            <div className="col-span-2 flex justify-between">
                                <span className="text-green-500">Đơn vị vận chuyển:</span>
                                <div className="flex flex-col">
                                    <span>Nhanh</span>
                                    <span className="text-gray-500 text-sm">
                                        Nhận hàng vào ngày 16 Th12 - 19 Th12
                                    </span>
                                </div>
                                <a className="cursor-pointer rounded px-5 py-2.5 overflow-hidden group bg-rose-500 relative hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
                                    <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                                    <div className="flex items-center space-x-2">
                                        <FaDollarSign />
                                        <button
                                            onClick={() => handlerPayment()}
                                            className="relative"
                                        >
                                            Thanh toán
                                        </button>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="bg-rose-50 w-full  px-2 py-4 border border-rose-50">
                        <div className="flex items-end justify-end space-x-4">
                            {/* <span>
                                Tổng số tiền (${cartDetailByUserId.length} sản phẩm ):{" "}
                            </span> */}
                            {/* <span className="text-2xl text-red-500">
                                {" "}
                                {cartTotalPrice.toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "VND",
                                })}
                            </span> */}
                        </div>
                    </div>
                </section>
                {/* product checkout */}
            </main>
        </>
    );
};
export default CheckoutScreen;
