import { unwrapResult } from "@reduxjs/toolkit";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FaRegEnvelope } from "react-icons/fa";
import { TbLock } from "react-icons/tb";
import { useDispatch } from "react-redux";
import facebookLogo from "../../../assets/icon/facebook.png";
import googleLogo from "../../../assets/icon/google.png";
import { registerUser } from "../../../redux/auth/authSlice";

const RegisterScreen = () => {
  var base64 = require("base-64");
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ email, password }) => {
    setLoading(true);
    try {
      const registerData = {
        password: {
          password: base64.encode(password),
          passwordStatus: "NEW",
        },
        role: {
          roleType: "PERSONAL",
        },
        user: {
          email: email,
          serviceType: "NORMALLY",
          userStatus: "INACTIVE",
        },
      };
      const actionResult = await dispatch(registerUser(registerData));
      const data = unwrapResult(actionResult);

      if (data.status === "success") {
        setLoading(false);
        toast.success("Vui lòng kiểm tra email để xác nhận tài khoản");
        router.push("/user/auth/verifyEmail");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error.errorMessage);
    }
  };

  return (
    <div className="bg-gray-300">
      <Head>
        <title>Đăng ký</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon " href="/favicon.ico" />
      </Head>
      <header className="p-5 sticky z-50 top-0 bg-white md:px-10 shadow-md grid grid-cols-1">
        <div className="flex items-center justify-between w-full">
          <div>
            <h3 className="text-3xl font-semibold">Đăng ký</h3>
            <Link href="/">
              <a className="text-red-700 italic">Trang chủ</a>
            </Link>
          </div>

          <p>Bạn cần hỗ trợ?</p>
        </div>
      </header>
      <main className="min-h-screen overflow-hidden bg-gray-200 ">
        <section className="bg-white h-[450px] md:h-[500px]  w-[370px] md:w-[470px]  mx-auto my-10  rounded-md shadow-md">
          <div className="p-5">
            <h3 className="text-2xl font-semibold mb-2 flex items-center justify-center">
              Đăng ký
            </h3>
            <form
              className="flex items-center flex-col"
              onSubmit={handleSubmit(submitHandler)}
            >
              <div className="bg-gray-200 w-80 p-2 flex items-center my-3 rounded shadow-inner shadow-gray-400 transition duration-200 focus-within:shadow-gray-600 focus-within:scale-105">
                <div></div>
                <label htmlFor="email"></label>
                <FaRegEnvelope className="text-gray-400 mr-2" />

                <input
                  {...register("email", {
                    required: "Vui lòng nhập email",
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                      message: "Email không khả dụng",
                    },
                  })}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  autoFocus
                  className="bg-gray-200 text-sm flex-1 rounded border-none outline-none "
                ></input>
              </div>

              {errors.email && (
                <div className="text-red-500 mb-2 ml-28 w-full text-left font-medium italic inline-block duration-300 transition-all">
                  {errors.email.message}
                </div>
              )}

              <div className="bg-gray-200 w-80 p-2 flex items-center mb-3 rounded shadow-inner shadow-gray-400 transition duration-200 focus-within:shadow-gray-600 focus-within:scale-105">
                <TbLock className="text-gray-400 mr-2" />
                <label htmlFor="password"></label>
                <input
                  {...register("password", {
                    required: "Vui lòng nhập mật khẩu",
                    minLength: {
                      value: 6,
                      message: "Mật khẩu phải có 6 ký tự trở lên",
                    },
                  })}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="bg-gray-200 text-sm flex-1 rounded border-none outline-none "
                />
              </div>
              {errors.password && (
                <div className="text-red-500 mb-2 ml-28  w-full text-left font-medium italic inline-block duration-200 transition-all">
                  {errors.password.message}
                </div>
              )}
              {loading ? (
                <button disabled>
                  <div className="font-semibold w-80 bg-gray-600 text-white duration-300 transition shadow-md border-2  rounded px-12 py-2 inline-block">
                    Đang xử lý...
                  </div>
                </button>
              ) : (
                <button>
                  <div className="font-semibold w-80 hover:scale-105 hover:bg-red-500 hover:text-white duration-300 transition shadow-md border-2 border-red-500 rounded px-12 py-2 inline-block">
                    Đăng ký
                  </div>
                </button>
              )}
            </form>
            <div className="mt-8 mb-5 flex items-center space-x-2">
              <hr className="w-1/2" />
              <span className="text-sm">Hoặc</span>
              <hr className="w-1/2" />
            </div>
            <div className="flex   justify-center items-center">
              <div className="flex w-80   justify-center items-center">
                <div className="w-1/2 flex justify-around items-center mx-1 p-2 font-bold text-gray-700 border-2 border-gray-500  rounded focus:outline-none hover:bg-gray-300 transition duration-300">
                  <div className="w-8 h-8 ">
                    <Image src={facebookLogo} alt=""></Image>
                  </div>

                  <button type="button">Facebook</button>
                </div>

                <div className="w-1/2 flex justify-around items-center mx-1 p-2 font-bold text-gray-700 border-2 border-gray-500  rounded focus:outline-none hover:bg-gray-300 transition duration-300">
                  <div className="w-8 h-8 ">
                    <Image src={googleLogo} alt=""></Image>
                  </div>

                  <button type="button">Google</button>
                </div>
              </div>
            </div>
            <div className="w-full flex items-center justify-center mt-5">
              <span className="text-sm">
                Bạn đã có tài khoản?
                <Link href="login">
                  <a className="text-red-700 underline pb-2">Đăng nhập</a>
                </Link>
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default RegisterScreen;
