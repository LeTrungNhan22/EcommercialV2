import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Store } from "../utils/Store";

const PaymentScreen = () => {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const [imagePayment, setImagePayment] = useState("");
  const [count, setCount] = useState(35);
  useEffect(() => {
    setImagePayment(localStorage.getItem("linkCheckoutUrl"));
  }, []);
  useEffect(() => {
    // each second count=count-1
    const interval = setInterval(() => {
      setCount((updatedCount) => updatedCount - 1);
    }, 1000);
    // if count===0 redirect

    count == 0 && router.push("/");
    dispatch({
      type: "CART_RESET",
    });

    // always clear the timeers in return function
    return () => {
      clearInterval(interval);
    };
  }, [count, router]);
  return (
    <Layout title={`Thanh toán`}>
      <div className="h-screen bg-gray-50 space-x-2 flex items-center justify-center -mt-20">
        <div className="h-[500px] w-[500px]">
          <picture>
            <img alt="" src={imagePayment}></img>
          </picture>
        </div>
        <p className="text-red-500 font-bold">
          Vui lòng thanh toán cho đơn hàng. Trở về trang chủ sau {count}{" "}
          {count > 1 ? " seconds" : "second"}.
        </p>
      </div>
    </Layout>
  );
};

export default PaymentScreen;
