/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
import Head from "next/head";
import React, { useContext, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthContext from "../../context/authContext";
import { getCartDetailByUserId } from "../../redux/cart/cartSlice";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import LanguageContext from "../../context/languageContext";

const Layout = ({ title, children }) => {
  const cartDetail = useSelector((state) => state.cart.cartDetail);
  const { itemToShops, totalQuantity } = cartDetail;
  const { isLogin, user, logoutContext } = useContext(AuthContext);
  const { languageData } = useContext(LanguageContext);

  if (user === null || cartDetail === null) {
    return <div>Không tìm thấy thông tin giỏ hàng</div>;
  }

  const dispatch = useDispatch();
  const prevCartDetailRef = useRef();

  useEffect(() => {
    if (!prevCartDetailRef.current) {
      prevCartDetailRef.current = cartDetail;
      return;
    }
    const getCartDetail = async () => {
      const userId = user?.id;
      if (userId === undefined) {
        return;
      }
      try {
        const response = await dispatch(getCartDetailByUserId({ userId }));
        // console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    getCartDetail();
  }, [dispatch, user?.id, totalQuantity]);

  return (
    <div>
      <Head>
        <title>{title ? title + "" : "EcomFloor"}</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon " href="/favicon.ico" />
      </Head>
      {/* Header */}

      <Header totalQuantity={totalQuantity} itemToShops={itemToShops} />
      {/* Header */}
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
