import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { unwrapResult } from "@reduxjs/toolkit";
import Link from "next/link";
import React, { useEffect, useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { getProductByFilter } from "../../redux/product/productsSlice";
import { getError } from "../../utils/error";
import LanguageContext from "../../context/languageContext";


const SearchBar = () => {
  const [products, setProducts] = useState([]);
  const [productMatches, setProductMatches] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { languageData } = useContext(LanguageContext);

  useEffect(() => {
    const params = {};
    const loadProducts = async () => {
      try {
        const res = await dispatch(getProductByFilter(params));
        const unwrapRes = unwrapResult(res);
        const { total } = unwrapRes;
        setTotal(total);
      } catch (error) {
        console.log(getError(error));
      }
    };
    loadProducts();
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      const params = {
        maxResult: total,
      };
      try {
        setLoading(true);
        const res = await dispatch(getProductByFilter(params));
        const unwrapRes = unwrapResult(res);
        const { resultList } = unwrapRes;
        setProducts(resultList);
      } catch (error) {
        console.log(getError(error));
      } finally {
        setLoading(false);
      }
    };

    if (total > 0 && !loading) {
      loadProducts();
    }
  }, [total]);
  const handleSearchProductByName = (e) => {
    if (!e) return setProductMatches([]);
    let matches = products.filter((product) => {
      const regex = new RegExp(`^${e}`, "gi");
      return product.name.match(regex);
    });
    setProductMatches(matches);
  };


  return (
    <>
      <div className="flex flex-col justify-between items-center h-full w-full">
        <div className="flex items-center justify-center rounded-full border-2 shadow-md hover:shadow-lg hover:shadow-gray-200 transition duration-150 md:w-[12s0%] lg:w-full">
          <input
            // onBlur={setProductMatches([])}
            onChange={(e) => handleSearchProductByName(e.target.value)}
            type="text"
            className="outline-none pl-5 bg-transparent flex-grow h-12 md:h-10 focus:ring-0 border-none"
            placeholder={languageData?.search_product}
          />
          <MagnifyingGlassIcon className="text-white h-8  bg-red-500 p-2  rounded-full hidden md:inline-flex md:mx-2 md:cursor-pointer cursor-pointer hover:bg-red-600 transition duration-200" />
          <AdjustmentsHorizontalIcon className="text-black h-10  bg-white p-2 rounded-full  md:hidden mx-1 cursor-pointer border-2 hover:bg-gray-200 transition duration-200" />
        </div>
        {productMatches.length > 0 && (
          <div className="bg-gray-100 w-[32%] flex flex-col  p-3 max-[100px] absolute top-[70px] rounded-md bg-opacity-95">
            {productMatches.map((product) => (
              <Link href={`/product/${product.id}`}>
                <span
                  className="text-gray-500 hover:text-rose-500 cursor-pointer"
                  key={product.id}
                >
                  {product.name}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchBar;
