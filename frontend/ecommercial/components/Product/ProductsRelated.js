import Image from "next/image";
import React, { useEffect, useState } from "react";

import { AiOutlineSearch } from "react-icons/ai";
import { HeartIcon } from "@heroicons/react/24/outline";
import { FaHeart, FaShopify, FaStar } from "react-icons/fa";
import Link from "next/link";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { getProductByFilter } from "../../redux/product/productsSlice";

const ProductsRelated = ({ industrialId }) => {
  const [productsRelated, setProductsRelated] = useState([]);
  const [loadMoreProduct, setLoadMoreProduct] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    const getProductList = async () => {
      const params = {
        maxResult: 10,
        industrialId: industrialId,
      };
      try {
        const res = await dispatch(getProductByFilter(params));
        const { resultList } = unwrapResult(res);
        setProductsRelated(resultList);
      } catch (error) {
        console.log(getError(error));
      }
    };
    getProductList();
  }, []);

  if (productsRelated?.length === 0) {
    return (
      <div className="text-center text-2xl font-bold mb-5 text-rose-700">
        Loading...
      </div>
    );
  }

  if (!industrialId) return;

  const loadMore = () => {
    setMaxResult(maxResult + 20);
    if (maxResult >= total) {
      setLoadMoreProduct(false);
    } else {
      setLoadMoreProduct(true);
    }
  };

  return (
    <>
      <div className="container pb-16 my-7">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6 mb-5">
          {productsRelated?.map(
            ({ featuredImageUrl, mediumPrice, name, id }) => (
              <div
                className="bg-white shadow-md rounded overflow-hidden group p-3 hover:shadow-xl transition"
                key={id}
              >
                <div className="relative">
                  <div>
                    <Image
                      src={featuredImageUrl}
                      alt={name}
                      height={180}
                      width={200}
                      layout="responsive"
                      className="rounded object-fit object-center"
                    />
                  </div>
                  <div className="absolute opacity-0 rounded group-hover:opacity-100 transition gap-2 inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <Link href={`/product/${id}`}>
                      <a className=" text-white text-lg w-9 h-9 rounded-full bg-rose-500 flex items-center justify-center transition hover:bg-gray-800">
                        <AiOutlineSearch />
                      </a>
                    </Link>
                    <a className=" text-white text-lg  w-9 h-9  rounded-full bg-rose-500 flex items-center justify-center transition hover:bg-gray-800">
                      <FaHeart />
                    </a>
                  </div>
                </div>

                <div className="pt-4 pb-3 px-4">
                  <a>
                    <div className="uppercase line-clamp-1 font-medium text-sm  text-gray-800 hover:text-red-600 transition">
                      {name}
                    </div>
                  </a>

                  <div className="flex items-baseline space-x-2">
                    <p className="text-xl text-rose-600 font-semibold">
                      {mediumPrice.amount} {mediumPrice.currencyCode}
                    </p>
                    <p className="text-gray-500 line-through">
                      {" "}
                      {mediumPrice.amount}{" "}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="flex gap-1 text-sm text-yellow-400">
                      <span>
                        <FaStar />
                      </span>
                      <span>
                        <FaStar />
                      </span>
                      <span>
                        <FaStar />
                      </span>
                      <span>
                        <FaStar />
                      </span>
                      <span>
                        <FaStar />
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 ml-2">(100)</div>
                  </div>
                </div>
                <Link href="/shop">
                  <div
                    href="#_"
                    className="cursor-pointer rounded px-3 py-2 overflow-hidden group bg-white-300 relative hover:bg-gradient-to-r hover:from-gray-800 hover:to-white text-black hover:ring-2 hover:ring-offset-2 hover:ring-black transition-all ease-out duration-300 border border-black"
                  >
                    <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                    <div className="flex items-center justify-center space-x-2 text-white-600 hover:text-black">
                      <FaShopify />
                      <span className="relative">Xem Thêm</span>
                    </div>
                  </div>
                </Link>
              </div>
            )
          )}
        </div>
        <div className="flex items-center justify-center">
          <Link href="/shop">
            <a className="inline-flex items-center w-full px-5 py-3 mb-3 mr-1 text-base font-semibold text-white no-underline align-middle bg-gray-600 border border-transparent border-solid rounded-md cursor-pointer select-none sm:mb-0 sm:w-auto hover:bg-gray-700 hover:border-blue-700 hover:text-white focus-within:bg-blue-700 focus-within:border-blue-700">
              Button Text
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </a>
          </Link>
        </div>

      </div>
    </>
  );
};

export default ProductsRelated;
