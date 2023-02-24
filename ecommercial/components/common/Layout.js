import Head from "next/head";
import React, { useContext, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthContext from "../../context/authContext";
import { getCartDetailByUserId } from "../../redux/cart/cartSlice";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ title, children }) => {
  const cartDetail = useSelector((state) => state.cart.cartDetail);
  const { itemToShops } = cartDetail;
  const { isLogin, user, logoutContext } = useContext(AuthContext);

  if (user === null || cartDetail === null) {
    return <div>Không tìm thấy thông tin giỏ hàng</div>;
  }

  const dispatch = useDispatch();
  const prevCartDetailRef = useRef();

  useEffect(() => {
    if (
      !prevCartDetailRef.current ||
      prevCartDetailRef.current !== cartDetail
    ) {
      prevCartDetailRef.current = cartDetail;
    }
    const getCartDetail = async () => {
      const userId = user?.id;
      if (userId === undefined) {
        return;
      }
      try {
        const response = await dispatch(getCartDetailByUserId({ userId }));
      } catch (error) {
        console.log(error);
      }
    };
    getCartDetail();
  }, [dispatch, user.id]);

  return (
    <div>
      <Head>
        <title>{title ? title + "" : "EcomFloor"}</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon " href="/favicon.ico" />
      </Head>
      {/* Header */}

      <Header cartAmount={itemToShops?.length} itemToShops={itemToShops} />
      {/* Header */}
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
