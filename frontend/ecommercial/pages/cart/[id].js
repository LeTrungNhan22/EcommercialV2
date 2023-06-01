import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FaDollarSign, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../../components/breadcrumb/BreadCrumb";
import Layout from "../../components/common/Layout";
import ProductList from "../../components/product/ProductList";
import AuthContext from "../../context/authContext";
import {
  getCartDetailByUserId,
  updateQuantityCartItem
} from "../../redux/cart/cartSlice";

const CartScreen = () => {
  const { isLogin, user } = useContext(AuthContext);
  const cartDetail = useSelector((state) => state.cart.cartDetail);
  const { totalPrice, totalCurrentPrice, totalDiscount, totalQuantity, itemToShops } = cartDetail;
  const [updateTotalPrice, setUpdateTotalPrice] = useState(totalPrice);
  const [updateTotalQuantity, setUpdateTotalQuantity] = useState(totalQuantity);
  // console.log(user);

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
    } else {
      return;
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

  const handleUpdateQuantity = async (cartItemId, newQuantity) => {
    try {
      const response = await dispatch(
        updateQuantityCartItem({ cartItemId, quantity: newQuantity })
      );
      const userId = user?.id;
      if (userId === undefined) {
        return;
      }
      try {
        const response = await dispatch(getCartDetailByUserId({ userId }));
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // console.group("cartDetail");
  console.log({ cartDetail: cartDetail });
  // console.log({ itemToShops: itemToShops });
  // console.groupEnd();

  return (
    <Layout title="Giỏ hàng">
      <div className="py-2">
        <BreadCrumb title={`Giỏ Hàng`} userId={user?.id} />
      </div>
      <div className="bg-gray-300">
        <div className="w-[1200px] mx-auto py-2">
          <div className=" bg-white py-3 flex items-center space-x-3 px-4 rounded shadow border border-rose-500">
            <svg
              height="12"
              viewBox="0 0 20 12"
              width="20"
              className="shopee-svg-icon _7DXJyE icon-free-shipping"
            >
              <g fill="none" fillRule="evenodd" transform="">
                <rect
                  fill="#00bfa5"
                  fillRule="evenodd"
                  height="9"
                  rx="1"
                  width="12"
                  x="4"
                ></rect>
                <rect
                  height="8"
                  rx="1"
                  stroke="#00bfa5"
                  width="11"
                  x="4.5"
                  y=".5"
                ></rect>
                <rect
                  fill="#00bfa5"
                  fillRule="evenodd"
                  height="7"
                  rx="1"
                  width="7"
                  x="13"
                  y="2"
                ></rect>
                <rect
                  height="6"
                  rx="1"
                  stroke="#00bfa5"
                  width="6"
                  x="13.5"
                  y="2.5"
                ></rect>
                <circle cx="8" cy="10" fill="#00bfa5" r="2"></circle>
                <circle cx="15" cy="10" fill="#00bfa5" r="2"></circle>
                <path
                  d="m6.7082481 6.7999878h-.7082481v-4.2275391h2.8488017v.5976563h-2.1405536v1.2978515h1.9603297v.5800782h-1.9603297zm2.6762505 0v-3.1904297h.6544972v.4892578h.0505892c.0980164-.3134765.4774351-.5419922.9264138-.5419922.0980165 0 .2276512.0087891.3003731.0263672v.6210938c-.053751-.0175782-.2624312-.038086-.3762568-.038086-.5122152 0-.8758247.3017578-.8758247.75v1.8837891zm3.608988-2.7158203c-.5027297 0-.8536919.328125-.8916338.8261719h1.7390022c-.0158092-.5009766-.3446386-.8261719-.8473684-.8261719zm.8442065 1.8544922h.6544972c-.1549293.571289-.7050863.9228515-1.49238.9228515-.9864885 0-1.5903965-.6269531-1.5903965-1.6464843 0-1.0195313.6165553-1.6669922 1.5872347-1.6669922.9580321 0 1.5366455.6064453 1.5366455 1.6083984v.2197266h-2.4314412v.0351562c.0221328.5595703.373095.9140625.9169284.9140625.4110369 0 .6924391-.1376953.8189119-.3867187zm2.6224996-1.8544922c-.5027297 0-.853692.328125-.8916339.8261719h1.7390022c-.0158091-.5009766-.3446386-.8261719-.8473683-.8261719zm.8442064 1.8544922h.6544972c-.1549293.571289-.7050863.9228515-1.49238.9228515-.9864885 0-1.5903965-.6269531-1.5903965-1.6464843 0-1.0195313.6165553-1.6669922 1.5872347-1.6669922.9580321 0 1.5366455.6064453 1.5366455 1.6083984v.2197266h-2.4314412v.0351562c.0221328.5595703.373095.9140625.9169284.9140625.4110369 0 .6924391-.1376953.8189119-.3867187z"
                  fill="#fff"
                ></path>
                <path d="m .5 8.5h3.5v1h-3.5z" fill="#00bfa5"></path>
                <path d="m0 10.15674h3.5v1h-3.5z" fill="#00bfa5"></path>
                <circle cx="8" cy="10" fill="#047565" r="1"></circle>
                <circle cx="15" cy="10" fill="#047565" r="1"></circle>
              </g>
            </svg>
            <p>
              Ở đây bạn có thể thấy tất cả sản phẩm bạn đã thêm vào giỏ hàng
            </p>
          </div>
        </div>

        <div className="w-[1200px] mx-auto mb-3 ">
          {itemToShops?.length > 0 ? (
            itemToShops?.map((item) => (
              <div className=" bg-white rounded shadow p-3 mb-3" key={item.id}>
                <div className="md:flex items-center  py-8 ">
                  <div className="w-1/4 h-[200px] relative">
                    <Image
                      src={item.productVariant.imageUrl}
                      alt={item.productVariant.productName}
                      layout="fill"
                      className="w-full h-full object-center object-cover"
                    />
                  </div>
                  <div className="md:pl-3 md:w-3/4">
                    <div className="text-md leading-3 text-gray-800 md:pt-0 pt-4">
                      <span className="">
                        ProductId: {item.productVariant.productId}
                      </span>{" "}
                      <span className="">
                        VariantId: {item.productVariant.id}
                      </span>
                    </div>
                    <div className="flex items-center justify-between w-full pt-2 border-b border-gray-600 py-2 mb-2">
                      <Link href={`/product/${item.productVariant.productId}`}>
                        <a className="text-2xl font-black leading-none text-gray-800
                        hover:text-red-500">
                          {item.productVariant.productName}
                        </a>
                      </Link>
                      <p className="text-base font-black leading-none text-gray-700">
                        Giá:
                        {Number(item.productVariant.price.amount).toLocaleString("vi-VN")}
                        {item.productVariant.price.currencyCode}
                      </p>
                    </div>
                    <div className="text-md leading-3 text-gray-600 pt-2">
                      <div className=" flex items-center text-gray-500">
                        <span>{item.productVariant.dimension.length}</span>x
                        <span>{item.productVariant.dimension.width}</span>x
                        <span>{item.productVariant.dimension.height}</span>
                        <span>
                          {item.productVariant.dimension.dimensionUnit}
                        </span>
                      </div>
                    </div>
                    <p className="text-md leading-3 text-gray-600 py-4">
                      Color: {item.productVariant.color}
                    </p>
                    <p className="w-96 text-md leading-3 text-gray-600">
                      ShopId : {item.shopId}
                    </p>
                    <div className="flex  justify-between  ">
                      <div className="flex items-center text-red-500 cursor-pointer">
                        <p className="text-md leading-3 underline mr-3  ">
                          Xóa khỏi giỏ hàng
                        </p>
                        <FaTrashAlt />
                      </div>
                      <div>
                        <div className="flex justify-around mx-3 w-full pt-2">
                          <div className=" flex border  border-gray-300 text-gray-300 w-max divide-x divide-gray-300">
                            <div
                              onClick={() =>
                                handleUpdateQuantity(item.id, item.quantity - 1)
                              }
                              className="text-green-500 select-none h-8 w-8 text-xl flex items-center justify-center cursor-pointer"
                            >
                              -
                            </div>
                            <div className="select-none font-semibold text-black h-8 w-8 text-base flex items-center justify-center">
                              {item.quantity}
                            </div>
                            <div
                              onClick={() =>
                                handleUpdateQuantity(item.id, item.quantity + 1)
                              }
                              className=" text-red-500 select-none h-8 w-8 text-xl flex items-center justify-center cursor-pointer"
                            >
                              +
                            </div>
                          </div>
                          <div className="flex flex-col my-2">
                            <p className="text-xl font-bold leading-none text-rose-700">
                              Tổng:
                              {Number(totalCurrentPrice).toLocaleString("vi-VN")}
                              {item.productVariant.price.currencyCode}

                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Không có sản phẩm nào trong giỏ hàng</p>
          )}
        </div>

        {/* product details */}

        <div className="w-[1200px] mx-auto transition ease-in duration-100 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] scroll-smooth hover:scroll-auto sticky bottom-0 z-2">
          <div className=" bg-white rounded shadow p-3 mb-3">
            <div className="grid grid-cols-4">
              {/* voucher */}
              <div className="w-full border-b mb-3 py-3 flex items-end justify-end col-span-4 space-x-52">
                <div>
                  Giảm giá cho {totalQuantity} sản phẩm : {" "}
                  <span className="text-rose-600 text-2xl">
                    {Number(totalDiscount).toLocaleString("vi-VN")}
                    VND {" "}
                  </span>
                  <span className="text-md font-sans text-gray-500">
                    ( {Number(totalDiscount / totalCurrentPrice * 100).toFixed(2)}%)
                  </span>
                </div>
                <>
                  <button
                    type="button"
                    className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-rose-600 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                  >
                    Cập nhật
                  </button>
                </>

              </div>

              {/* voucher */}

              <div className="w-full border-b mb-3 py-1 flex items-end justify-end col-span-4 space-x-10">
                <span>
                  Tổng thanh toán sản phẩm ({totalQuantity} sản phẩm){" "}
                  <span className="text-rose-600 text-4xl">
                    {Number(totalPrice).toLocaleString("vi-VN")}
                    VND
                  </span>
                </span>
                <Link href={`/checkout/${cartDetail.userId}`}>
                  <a className="cursor-pointer rounded px-5 py-2.5 overflow-hidden group bg-rose-500 relative hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
                    <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                    <div className="flex items-center space-x-2">
                      <FaDollarSign />
                      <span className="relative">Thanh toán</span>
                    </div>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* product details */}
        <main className="max-w-[1200px] my-2 mx-auto px-16  ">
          <section className="pt-10 mb-5">
            <h2 className="section-title">Gợi ý sản phẩm</h2>
            <ProductList />
          </section>
        </main>
      </div>
    </Layout>
  );
};

export default CartScreen;
