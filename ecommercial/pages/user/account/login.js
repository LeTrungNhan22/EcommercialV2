import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect } from "react";

import Head from "next/head";
import { useForm } from "react-hook-form";
import { FaRegEnvelope } from "react-icons/fa";
import { TbLock } from "react-icons/tb";

import { useRouter } from "next/router";
import facebookLogo from "../../../assets/icon/facebook.png";
import googleLogo from "../../../assets/icon/google.png";
import AuthContext from "../../../utils/User";

const LoginScreen = () => {
  const { isLogin, login, loginGoogle } = useContext(AuthContext);
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (isLogin == true) {
      router.push(redirect || "/");
    }
  }, [isLogin]);

  //Login normally
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  // todo handle submit
  const submitHandler = async ({ email, password }, e) => {
    e.preventDefault();
    login({ email, password });
  };
  return (
    <>
      <Head>
        <title>Đăng nhập</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon " href="/favicon.ico" />
      </Head>
      <header className="p-5 sticky z-50 top-0 bg-white md:px-10 shadow-md grid grid-cols-1">
        <div className="flex items-center justify-between w-full">
          <div>
            <h3 className="text-3xl font-semibold">Đăng nhập</h3>
            <Link href="/">
              <a className="text-red-700 italic">Trang chủ</a>
            </Link>
          </div>

          <p>Bạn cần hỗ trợ?</p>
        </div>
      </header>
      <main className="min-h-screen overflow-hidden bg-gray-200 ">
        <section className="bg-white   w-[370px] md:w-[470px]  mx-auto my-10  rounded-md shadow-md">
          <div className="p-5">
            <h3 className="text-2xl font-semibold mb-2 flex items-center justify-center">
              Đăng nhập
            </h3>
            <form
              className="flex items-center flex-col"
              onSubmit={handleSubmit(submitHandler)}
            >
              <div className="bg-gray-200 w-80 p-2 flex items-center my-3 rounded shadow-inner shadow-gray-400 transition duration-200 focus-within:shadow-gray-600 focus-within:scale-105">
                <label htmlFor="email"></label>
                <FaRegEnvelope className="text-gray-400 mr-2" />
                <input
                  {...register("email", {
                    required: "Please enter email",
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                      message: "Please enter valid email",
                    },
                  })}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email/Tên đăng nhập"
                  autoFocus
                  className="bg-gray-200 text-sm flex-1 rounded border-none outline-none "
                ></input>
              </div>

              {errors.email && (
                <div className="text-red-500 ml-28 mb-1  w-full text-left font-medium italic inline-block duration-300 transition-all">
                  {errors.email.message}
                </div>
              )}

              <div className="bg-gray-200 w-80 p-2 flex items-center mb-3 rounded shadow-inner shadow-gray-400 transition duration-200 focus-within:shadow-gray-600 focus-within:scale-105">
                <TbLock className="text-gray-400 mr-2" />
                <label htmlFor="password"></label>
                <input
                  {...register("password", {
                    required: "Please enter password",
                    minLength: {
                      value: 6,
                      message: "Password is more than 5 chars",
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
                <div className="text-red-500 ml-28 mb-1  w-full text-left font-medium italic inline-block duration-200 transition-all">
                  {errors.password.message}
                </div>
              )}
              <div className="flex w-80  mb-5 justify-between">
                <label
                  htmlFor=""
                  className="flex items-center text-xs italic font-semibold"
                >
                  <input
                    type="checkbox"
                    name="remember"
                    className="mr-1 border-none outline-none cursor-pointer bg-gray-300 "
                  />
                  Nhớ tài khoản
                </label>

                <a
                  href=""
                  className=" font-bold  text-xs outline-none cursor-pointer text-red-600"
                >
                  Quên mật khẩu?
                </a>
              </div>

              <button>
                <div
                  href=""
                  className="font-semibold w-80 hover:scale-105 hover:bg-red-500 hover:text-white duration-300 transition shadow-md border-2 border-red-500 rounded px-12 py-2 inline-block"
                >
                  Đăng nhập
                </div>
              </button>
            </form>
            <div className="mt-8 mb-5 flex items-center space-x-2">
              <hr className="w-1/2" />
              <span className="text-sm">Hoặc</span>
              <hr className="w-1/2" />
            </div>
            <div class="flex   justify-center items-center">
              <div class="flex w-80   justify-center items-center">
                <div class="w-1/2 flex justify-around items-center mx-1 p-2 font-bold text-gray-700 border-2 border-gray-500  rounded focus:outline-none hover:bg-gray-300 transition duration-300">
                  <div className="w-8 h-8 ">
                    <Image src={facebookLogo} alt=""></Image>
                  </div>

                  <button type="button">Facebook</button>
                </div>

                <div class="w-1/2 flex justify-around items-center mx-1 p-2 font-bold text-gray-700 border-2 border-gray-500  rounded focus:outline-none hover:bg-gray-300 transition duration-300">
                  <div className="w-8 h-8 ">
                    <Image src={googleLogo} alt=""></Image>
                  </div>

                  <button type="button">Google</button>
                </div>
              </div>
            </div>
            <div className="w-full flex items-center justify-center mt-5">
              <span className="text-sm">
                Bạn chưa có tài khoản?{" "}
                <Link href="register">
                  <a className="text-red-700 underline pb-2">Đăng ký</a>
                </Link>
              </span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default LoginScreen;
