import { Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BellAlertIcon,
  GlobeAltIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useContext, useState } from "react";
import logo from "../../assets/logo/mainLogo.png";
import AuthContext from "../../context/authContext";
import Searchbar from "./Searchbar";
import { FaLanguage } from "react-icons/fa";
import Language from "./Language";
import LanguageContext from "../../context/languageContext";


const Header = ({ totalQuantity, itemToShops }) => {
  const router = useRouter();
  const { isLogin, user, logoutContext } = useContext(AuthContext);
  const [isShowed, setIsShowed] = useState(false);
  const sellerUrl = process.env.NEXT_PUBLIC_SELLER_URL;
  const { language, setLanguage, languageData, setLanguageData, languageTypes } = useContext(LanguageContext);



  const exitPopUpHandler = () => {
    setIsShowed(false);
  };

  const logoutHandler = () => {
    logoutContext();
  };
  console.log(languageData);

  return (
    <header className="p-5 sticky z-50 top-0 bg-white md:px-10 shadow-md grid grid-cols-1 md:grid-cols-3">
      <div className="relative hidden md:flex items-center h-10 ">
        <Link href="/">
          <a href="">
            <Image
              src={logo}
              layout="fill"
              alt=""
              objectFit="contain"
              objectPosition="left"
              className="shadow-md"
            />
          </a>
        </Link>
      </div>
      <Searchbar />
      <div className="items-center space-x-1 justify-end hidden md:flex">
        <div className={`flex items-center justify-center`}>
          <div
            onMouseEnter={() => setIsShowed(true)}
            className="text-gray-700 lg:text-lg md:text-sm flex items-center hover:bg-gray-100 p-1  rounded-full transition duration-200 cursor-pointer"
          >
            <ShoppingCartIcon className="h-10 p-1  hover:bg-gray-100 rounded-full transition duration-200 cursor-pointer" />
            {totalQuantity != null ? (
              <span className="absolute bg-red-500 w-5 h-5 text-white text-base text-center rounded-full top-5 right-[1] flex justify-center items-center">
                {totalQuantity}
              </span>
            ) : null}
          </div>
        </div>

        <div
          className={`absolute top-12 right-56 z-50 flex ${isShowed == false ? "hidden" : ""
            }`}
        >
          <div
            className="w-screen max-w-sm border border-gray-200 rounded bg-gray-100 shadow-md  sm:p-4 lg:p-8"
            aria-modal="true"
            role="dialog"
            tabIndex="-1"
          >
            <button
              type="button"
              onClick={exitPopUpHandler}
              className="relative ml-auto -mr-4 block text-gray-600 transition hover:scale-110 hover:text-red-500"
            >
              <span className="sr-only">Close cart</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="mt-6 space-y-6">
              <ul className="space-y-4 overflow-y-scroll max-h-[280px]">
                {itemToShops?.map((item) => (
                  <li className="flex items-center gap-4" key={item.id}>
                    <img
                      src={item.productVariant.imageUrl}
                      alt=""
                      className="h-16 w-16 rounded object-cover shadow-md"
                    />

                    <div>
                      <h3 className="text-sm text-gray-900">
                        {item.productVariant.productName}
                      </h3>

                      <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                        <div>
                          <div className=" flex items-center text-gray-500">
                            <span>{item.productVariant.dimension.length}</span>x
                            <span>{item.productVariant.dimension.width}</span>x
                            <span>{item.productVariant.dimension.height}</span>
                            <span>
                              {item.productVariant.dimension.dimensionUnit}
                            </span>
                          </div>
                        </div>

                        <div>
                          <dt className="inline">Color:</dt>
                          <dd className="inline">
                            {item.productVariant.color}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="space-y-4 text-center">
                <Link href={`/cart/${user?.id}`}>
                  <a
                    href=""
                    className="block rounded border border-gray-600 px-5 py-3 text-sm text-gray-600 transition hover:ring-1 hover:ring-gray-400"
                  >
                    {languageData?.header_cart_view} ({totalQuantity})
                  </a>
                </Link>

                <a
                  href="#"
                  className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                >
                  {languageData?.order_title}
                </a>

                <a
                  href="#"
                  className="inline-block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-600"
                >
                  Continue shopping
                </a>
              </div>
            </div>
          </div>
        </div>
        <Language
          language={language}
          setLanguage={setLanguage}
          languageData={languageData}
          setLanguageData={setLanguageData}
          languageTypes={languageTypes}

        />
        <Menu as="div">
          <div>
            <Menu.Button className="flex px-1 h-12 items-center space-x-1 border-2 rounded-full cursor-pointer hover:shadow-md duration-200 transition">
              <Bars3Icon className="p-2 pr-0 h-10 " />
              <div className="w-12 h-10 relative ">
                <Image
                  src={
                    user.imageUrl != null
                      ? user.imageUrl
                      : "https://firebasestorage.googleapis.com/v0/b/tmdtnextjs.appspot.com/o/Avatar%20copy.png?alt=media&token=e965a16e-f2bf-4b27-8341-44381b41da9f"
                  }
                  alt=""
                  layout="fill"
                  className="rounded-full "
                ></Image>
              </div>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-10 mt-2 w-60 origin-top-right divide-y divide-gray-100 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {isLogin === false ? (
                <div>
                  <div className="px-1 py-1 ">
                    <Link href="/user/auth/register">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${active ? "hover-active" : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-md`}
                          >
                            {active ? (
                              <div className=" h-5 w-5" aria-hidden="true" />
                            ) : (
                              <div className=" h-5 w-5" aria-hidden="true" />
                            )}

                            <p className="font-semibold">{languageData?.header_signup}</p>
                          </button>
                        )}
                      </Menu.Item>
                    </Link>

                    <Link href="/user/auth/login">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${active ? "hover-active" : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-md`}
                          >
                            {active ? (
                              <div className=" h-5 w-5" aria-hidden="true" />
                            ) : (
                              <div className=" h-5 w-5" aria-hidden="true" />
                            )}
                            {languageData?.header_login}
                          </button>
                        )}
                      </Menu.Item>
                    </Link>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={logoutHandler}
                          className={`${active ? "hover-active" : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 text-md`}
                        >
                          {active ? (
                            <div className=" h-5 w-5" aria-hidden="true" />
                          ) : (
                            <div className=" h-5 w-5" aria-hidden="true" />
                          )}
                          Đăng xuất
                        </button>
                      )}
                    </Menu.Item>

                    <div className="px-1 py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => {
                              isLogin
                                ? router.push(`/user/account/profile`)
                                : router.push(
                                  `/user/auth/login?redirect=/user/account/profiler`
                                );
                            }}
                            className={`${active ? "hover-active" : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-md`}
                          >
                            {active ? (
                              <div
                                className=" h-5 w-5 text-violet-400"
                                aria-hidden="true"
                              />
                            ) : (
                              <div
                                className=" h-5 w-5 text-violet-400"
                                aria-hidden="true"
                              />
                            )}
                            Tài khoản
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                    <div className="px-1 py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => {
                              isLogin && user.shop === null
                                ? router.push(`/shop/create`)
                                : isLogin && user.shop !== null
                                  ? window.open(`${sellerUrl}/login`, "_blank")
                                  : router.push(`/user/auth/login`);
                            }}
                            className={`${active ? "hover-active" : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-md`}
                          >
                            {active ? (
                              <div className=" h-5 w-5" aria-hidden="true" />
                            ) : (
                              <div className=" h-5 w-5" aria-hidden="true" />
                            )}
                            Kênh người bán
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </div>
                </div>
              )}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </header>
  );
};

export default Header;
