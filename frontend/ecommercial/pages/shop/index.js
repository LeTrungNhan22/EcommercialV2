/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineFilter } from "react-icons/ai";
import { FaList, FaTh } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import productApi from "../../api/product/productApi";
import BreadCrumb from "../../components/Breadcrumb/BreadCrumbLine";
import Layout from "../../components/common/Layout";
import ProductList from "../../components/product/ProductList";
import { getProductByFilter } from "../../redux/product/productsSlice";
import { getError } from "../../utils/error";
import LanguageContext from "../../context/languageContext";





const ShopScreen = () => {
  const [industrials, setIndustrials] = useState([]);
  const dispatch = useDispatch();
  const resultList = useSelector((state) => state.products.products);
  const [maxResult, setMaxResult] = useState(24);
  const [total, setTotal] = useState(0);
  const [loadMoreProduct, setLoadMoreProduct] = useState(true);
  const [selected, setSelected] = useState(false);

  const { languageData } = useContext(LanguageContext);
  const { filter_header,
    product_size,
    product_color,
    filter_price_from,
    filter_price_to,
    category_all_name,
    td_product_price } = languageData;

  useEffect(() => {
    const getProductList = async () => {
      const params = {
        maxResult: maxResult,
        // industrialId: "1671551420762335",
      };
      try {
        const res = await dispatch(getProductByFilter(params));
        const { total, resultList } = unwrapResult(res);
        setTotal(total);
      } catch (error) {
        console.log(getError(error));
      }
    };
    getProductList();
  }, [maxResult]);

  useEffect(() => {
    const getIndustrialList = async () => {
      try {
        const data = await productApi.getIndustrialList();
        setIndustrials(data);
      } catch (error) {
        console.log(getError(error));
      }
    };
    getIndustrialList();
  }, []);

  // handle load more by maxResult
  const handleLoadMore = () => {
    setMaxResult(maxResult + 20);
    if (maxResult >= total) {
      setLoadMoreProduct(false);
    } else {
      setLoadMoreProduct(true);
    }
  };

  const industrialsHandler = (id, e) => {
    const params = {
      maxResult: maxResult,
      industrialId: id,
    };
    dispatch(getProductByFilter(params));
  };

  const handleSortByPrice = (value) => {
    console.log(value);
    switch (value) {
      case "price-asc":
        const params1 = {
          "maxResult": maxResult,
          "priceFrom": 0,
          "priceTo": 9999999999,
        }
        dispatch(getProductByFilter(params1));
        break;
      case "price-desc":
        const params2 =
        {
          "maxResult": maxResult,
          "priceFrom": 9999999999,
        }
        dispatch(getProductByFilter(params2));
        break;
      default:
        const params3 = {
          "maxResult": maxResult,
        }
        dispatch(getProductByFilter(params3));


        break;
    }

  };

  const convertNameToEnglish = (id) => {
    if (languageData.hasOwnProperty(id)) {
      return languageData['category_item_' + id];
    } else {
      return languageData['category_item_' + id];
    }
  };


  return (
    <Layout title={`Shops`}>
      <section className="bg-gray-300 ">
        <div className="w-[1400px]">
          <BreadCrumb title={`Shop now`} />
        </div>

        <main className="w-[1400px] mx-auto grid grid-cols-4 gap-6 pt-2 items-start">
          {/* sidebar */}
          <div className="col-span-1 bg-white px-4 pb-6 shadow border border-gray-200 rounded overflow-hidden mb-3">
            <div className="divide-y divide-gray-200 space-y-5 py-4">
              <div>
                <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
                  <div className="flex items-center mb-3 space-x-2">
                    <AiOutlineFilter className="text-xl" />
                    <h3 className="text-xl text-gray-800 uppercase font-medium">
                      {filter_header}
                    </h3>
                  </div>

                  <Disclosure>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-full justify-between rounded-lg bg-rose-100 px-4 py-2 text-left text-sm font-medium text-rose-900 hover:bg-rose-200 focus:outline-none focus-visible:ring focus-visible:ring-rose-500 focus-visible:ring-opacity-75">
                          <span>{category_all_name}</span>
                          <ChevronUpIcon
                            className={`${open ? "rotate-180 transform" : ""
                              } h-5 w-5 text-rose-500`}
                          />
                        </Disclosure.Button>
                        <Transition
                          enter="transition duration-200 ease-out"
                          enterFrom="transform scale-95 opacity-0"
                          enterTo="transform scale-200 opacity-100"
                          leave="transition duration-75 ease-out"
                          leaveFrom="transform scale-200 opacity-100"
                          leaveTo="transform scale-95 opacity-0"
                        >
                          {" "}
                          <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                            {/* category filter */}
                            <div>
                              <div className="space-y-2">
                                {/* single category */}

                                {industrials.map((item) => (
                                  <div
                                    className="flex items-center"
                                    key={item.id}
                                  >
                                    <input
                                      type="checkbox"
                                      id="cat-1"
                                      className="text-rose-600 rounded-sm cursor-pointer focus:ring-0 outline-none"
                                      onChange={() =>
                                        industrialsHandler(item.id)
                                      }
                                    />
                                    <label
                                      htmlFor="cat-1s"
                                      className="text-gray-600 ml-3 cursor-pointer"
                                    >
                                      {convertNameToEnglish(item.id)}
                                    </label>
                                    <div className="ml-auto text-gray-600 text-sm">
                                      (15)
                                    </div>
                                  </div>
                                ))}

                                {/* single category */}
                              </div>
                            </div>
                            {/* category filter */}
                          </Disclosure.Panel>
                        </Transition>
                      </>
                    )}
                  </Disclosure>
              
                  <Disclosure as="div" className="mt-2">
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-full justify-between rounded-lg bg-rose-100 px-4 py-2 text-left text-sm font-medium text-rose-900 hover:bg-rose-200 focus:outline-none focus-visible:ring focus-visible:ring-rose-500 focus-visible:ring-opacity-75">
                          <span>{td_product_price}</span>
                          <ChevronUpIcon
                            className={`${open ? "rotate-180 transform" : ""
                              } h-5 w-5 text-rose-500`}
                          />
                        </Disclosure.Button>
                        <Transition
                          enter="transition duration-200 ease-out"
                          enterFrom="transform scale-95 opacity-0"
                          enterTo="transform scale-200 opacity-100"
                          leave="transition duration-75 ease-out"
                          leaveFrom="transform scale-200 opacity-100"
                          leaveTo="transform scale-95 opacity-0"
                        >
                          <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                            {/* price filter */}
                            <div>
                              <div className="flex items-center">
                                {/* price category */}
                                <input
                                  type="text"
                                  className="w-full border-gray-300 px-3 py-2 text-gray-600 text-sm shadow-sm rounded focus:border-rose-600 focus:ring-0 "
                                  placeholder={`${filter_price_from}`}
                                />
                                <span className="mx-3 text-gray-500">-</span>
                                <input
                                  type="text"
                                  className="w-full border-gray-300 px-3 py-2 text-gray-600 text-sm shadow-sm rounded focus:border-rose-600 focus:ring-0 "
                                  placeholder={`${filter_price_to}`}
                                />

                                {/* single price */}
                              </div>
                              <div className="mt-2">
                                <button className="w-full px-3 py-2 bg-rose-500 text-white rounded hover:bg-rose-600 transition  ">
                                  Confirm
                                </button>
                              </div>
                            </div>
                            {/* price filter */}
                          </Disclosure.Panel>
                        </Transition>
                      </>
                    )}
                  </Disclosure>
                  <Disclosure as="div" className="mt-2">
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-full justify-between rounded-lg bg-rose-100 px-4 py-2 text-left text-sm font-medium text-rose-900 hover:bg-rose-200 focus:outline-none focus-visible:ring focus-visible:ring-rose-500 focus-visible:ring-opacity-75">
                          <span>{product_size}</span>
                          <ChevronUpIcon
                            className={`${open ? "rotate-180 transform" : ""
                              } h-5 w-5 text-rose-500`}
                          />
                        </Disclosure.Button>
                        <Transition
                          enter="transition duration-200 ease-out"
                          enterFrom="transform scale-95 opacity-0"
                          enterTo="transform scale-200 opacity-100"
                          leave="transition duration-75 ease-out"
                          leaveFrom="transform scale-200 opacity-100"
                          leaveTo="transform scale-95 opacity-0"
                        >
                          <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                            {/* size filter */}
                            <div>
                              <div className="flex items-center gap-2">
                                <div className="size-selector">
                                  <input
                                    type="radio"
                                    name="size"
                                    className="hidden"
                                    id="size-xs"
                                  />
                                  <label
                                    htmlFor="size-xs"
                                    className="text-xs border font-bold border-gray-200 shadow-sm rounded-sm h-8 w-8 flex items-center justify-center cursor-pointer text-gray-600"
                                  >
                                    XS
                                  </label>
                                </div>
                                <div className="size-selector">
                                  <input
                                    type="radio"
                                    name="size"
                                    className="hidden"
                                    id="size-s"
                                  />
                                  <label
                                    htmlFor="size-s"
                                    className="text-xs border font-bold border-gray-200 shadow-sm rounded-sm h-8 w-8 flex items-center justify-center cursor-pointer text-gray-600"
                                  >
                                    S
                                  </label>
                                </div>

                                <div className="size-selector">
                                  <input
                                    type="radio"
                                    name="size"
                                    className="hidden"
                                    id="size-m"
                                  />
                                  <label
                                    htmlFor="size-m"
                                    className="text-xs border font-bold border-gray-200 shadow-sm rounded-sm h-8 w-8 flex items-center justify-center cursor-pointer text-gray-600"
                                  >
                                    M
                                  </label>
                                </div>
                                <div className="size-selector">
                                  <input
                                    type="radio"
                                    name="size"
                                    className="hidden"
                                    id="size-l"
                                  />
                                  <label
                                    htmlFor="size-l"
                                    className="text-xs border font-bold border-gray-200 shadow-sm rounded-sm h-8 w-8 flex items-center justify-center cursor-pointer text-gray-600"
                                  >
                                    L
                                  </label>
                                </div>
                                <div className="size-selector">
                                  <input
                                    type="radio"
                                    name="size"
                                    className="hidden"
                                    id="size-xl"
                                  />
                                  <label
                                    htmlFor="size-xl"
                                    className="text-xs border font-bold border-gray-200 shadow-sm rounded-sm h-8 w-8 flex items-center justify-center cursor-pointer text-gray-600"
                                  >
                                    XL
                                  </label>
                                </div>
                              </div>
                            </div>
                            {/* size filter */}
                          </Disclosure.Panel>
                        </Transition>
                      </>
                    )}
                  </Disclosure>
                  <Disclosure as="div" className="mt-2">
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-full justify-between rounded-lg bg-rose-100 px-4 py-2 text-left text-sm font-medium text-rose-900 hover:bg-rose-200 focus:outline-none focus-visible:ring focus-visible:ring-rose-500 focus-visible:ring-opacity-75">
                          <span>{product_color}</span>
                          <ChevronUpIcon
                            className={`${open ? "rotate-180 transform" : ""
                              } h-5 w-5 text-rose-500`}
                          />
                        </Disclosure.Button>
                        <Transition
                          enter="transition duration-200 ease-out"
                          enterFrom="transform scale-95 opacity-0"
                          enterTo="transform scale-200 opacity-100"
                          leave="transition duration-75 ease-out"
                          leaveFrom="transform scale-200 opacity-100"
                          leaveTo="transform scale-95 opacity-0"
                        >
                          <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                            {/* color filter */}
                            <div className=" flex items-center gap-2">
                              {/* single color */}
                              <div className="color-selector">
                                <input
                                  type="radio"
                                  name="color"
                                  className="hidden"
                                  id="color-red"
                                />
                                <label
                                  htmlFor="color-red"
                                  className="border border-gray-200 rounded-sm h-5 w-5 block cursor-pointer shadow-sm bg-red-600"
                                ></label>
                              </div>
                              <div className="color-selector">
                                <input
                                  type="radio"
                                  name="color"
                                  className="hidden"
                                  id="color-white"
                                />
                                <label
                                  htmlFor="color-white"
                                  className="border border-gray-200 rounded-sm h-5 w-5 block cursor-pointer shadow-sm bg-white"
                                ></label>
                              </div>
                              <div className="color-selector">
                                <input
                                  type="radio"
                                  name="color"
                                  className="hidden"
                                  id="color-black"
                                />
                                <label
                                  htmlFor="color-black"
                                  className="border border-gray-200 rounded-sm h-5 w-5 block cursor-pointer shadow-sm bg-black"
                                ></label>
                              </div>
                              {/* single color */}
                            </div>
                            {/* color filter */}
                          </Disclosure.Panel>
                        </Transition>
                      </>
                    )}
                  </Disclosure>
                </div>
              </div>
            </div>
          </div>
          {/* sidebar */}

          {/* products */}
          <div className="col-span-3">
            {/* sorting */}
            <div className=" flex items-center mb-4">
              <select

                onChange={(e) =>
                  handleSortByPrice(e.target.value)
                }

                className="w-44 text-sm text-gray-600 px-4 py-3 border-gray-300 rounded focus:ring-rose-600 focus:border-red-600">
                <option
                  value="default"

                >Mặc định</option>
                <option
                  value="price-asc"

                >
                  Giá thấp - cao
                </option>
                <option
                  value="price-desc"
                >Giá cao - thấp</option>

              </select>

              <div className="flex gap-2 ml-auto">
                <div className="flex border border-rose-600 rounded w-10 h-9 items-center justify-center text-white bg-rose-600 cursor-pointer">
                  <FaTh />
                </div>
                <div className="flex border border-gray-300 rounded w-10 h-9 items-center justify-center text-black bg-white cursor-pointer">
                  <FaList />
                </div>
              </div>
            </div>
            <ProductList
              productFilter={resultList}
              handleLoadMore={handleLoadMore}
              loadMoreProduct={loadMoreProduct}
            />
            {/* sorting */}
          </div>
          {/* products */}
        </main>
      </section>
    </Layout>
  );
};

export default ShopScreen;
export async function getServerSideProps() {
  return {
    props: {}, // will be passed to the page component as props
  };
}
