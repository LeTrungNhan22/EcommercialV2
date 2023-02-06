import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AiFillMessage } from "react-icons/ai";
import { FaDollarSign, FaShoppingBag, FaTicketAlt } from "react-icons/fa";
import BreadCrumb from "../components/BreadCrumb";
import Layout from "../components/Layout";
import ProductList from "../components/product/ProductList";
import { dataDigitalBestSeller } from "../data/mock-data";
import { getError } from "../utils/error";
import AuthContext from "../utils/User";
import GooglePayButton from "@google-pay/button-react";
import { UpdateQuantity } from "../components/product/UpdateQuantity";

const CartScreen = () => {
  const router = useRouter();
  const { user, isLogin } = useContext(AuthContext);
  const [cartDetailByUserId, setCartDetailByUserId] = useState([]);
  const [cartTotalPrice, setCartTotalPrice] = useState("");
  const { productVariant } = cartDetailByUserId;
  const [qty, setQty] = useState(0);
  const basUrl = process.env.NEXT_PUBLIC_API_URL;
  const [isOpen, setIsOpen] = useState(false);
  function refreshPage() {
    window.location.reload(true);
  }

  // get cart detail by user id

  useEffect(() => {
    const getCartDetail = async () => {
      if (Cookies.get("cart") != null) {
        if (isLogin == true) {
          try {
            await axios
              .get(`${basUrl}/cart/1.0.0/cart/${user.id}/detail`)
              .then(function (response) {
                const { data } = response;
                const { cart, itemToShops } = data;
                const { totalPrice } = cart;
                setCartTotalPrice(totalPrice);
                setCartDetailByUserId(itemToShops);
              })
              .catch(function (error) {
                console.error(getError(error));
              });
          } catch (error) {
            console.log(getError(error));
          }
        }
      }
    };
    getCartDetail();
  }, [user.id]);
  useEffect(() => {}, []);

  return (
    <Layout title="Giỏ hàng">
      <div className="py-2">
        <BreadCrumb title={`Giỏ Hàng`} />
      </div>
      <div className="bg-gray-300">
        <div className="w-[1200px] mx-auto py-2">
          <div className=" bg-white py-3 flex items-center space-x-3 px-4 rounded shadow border border-rose-500">
            <svg
              height="12"
              viewBox="0 0 20 12"
              width="20"
              class="shopee-svg-icon _7DXJyE icon-free-shipping"
            >
              <g fill="none" fill-rule="evenodd" transform="">
                <rect
                  fill="#00bfa5"
                  fill-rule="evenodd"
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
                  fill-rule="evenodd"
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
              Nhấn vào mục Mã giảm giá ở cuối trang để hưởng miễn phí vận chuyển
              bạn nhé!
            </p>
          </div>
        </div>

        <div className="w-[1200px] mx-auto mb-3 ">
          <div className=" bg-white py-3 justify-between flex items-center space-x-3 px-6 rounded shadow">
            <div className="grid grid-cols-5 text-gray-500   items-center justify-center space-x-3">
              <div className="col-span-2 space-x-3">
                <input type="checkbox" />
                <span>Sản phẩm</span>
              </div>
            </div>
            <div className="flex w-1/2 text-gray-500 items-center  justify-between ">
              <span>Đơn giá</span>
              <span>Số lượng</span>
              <span>Số tiền</span>
              <span>Thao tác</span>
            </div>
          </div>
        </div>

        {/* product details */}

        <div className="w-[1200px] mx-auto pb-3">
          {cartDetailByUserId.map(
            ({ totalPrice, quantity, productVariant, id }) => (
              <>
                <div
                  key={id}
                  className=" bg-white   justify-between space-x-3  rounded shadow p-3 mb-3"
                >
                  <div>
                    <div className="border border-gray-400 px-6">
                      <div className="flex text-center items-center justify-between">
                        <div className="flex flex-row justify-center items-center space-x-5 col-span-2">
                          <input type="checkbox" />
                          <div className="w-32 h-32 relative">
                            <Image
                              src={productVariant.imageUrl}
                              alt=""
                              layout="fill"
                              className="object-center object-contain"
                            ></Image>
                          </div>
                          <span>{productVariant.productName}</span>
                        </div>

                        <UpdateQuantity
                          cartId={id}
                          quantity={quantity}
                          totalPrice={totalPrice}
                          price={productVariant.price.amount}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )
          )}
        </div>
        <div className="w-[1200px] mx-auto transition ease-in duration-100 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] scroll-smooth hover:scroll-auto sticky bottom-0 z-2">
          <div className=" bg-white rounded shadow p-3 mb-3">
            <div className="grid grid-cols-4">
              {/* voucher */}
              <div className="w-full border-b mb-3 py-3 flex items-end justify-end col-span-4 space-x-52">
                {/* <div className="flex items-center space-x-3 justify-center">
                  <FaTicketAlt className="text-orange-500" />
                  <span className="text-lg">Voucher</span>
                </div> */}

                <>
                  <button
                    type="button"
                    onClick={refreshPage}
                    className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-rose-600 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                  >
                    Cập nhật
                  </button>

                  <Transition appear show={isOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-10">
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                      </Transition.Child>

                      <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                          <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                          >
                            <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                              <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-gray-900"
                              >
                                Chọn voucher
                              </Dialog.Title>
                              <div className="mt-2">
                                <div className="bg-gray-200 p-2">
                                  <div className="flex items-center justify-evenly">
                                    <span>Mã voucher</span>
                                    <input
                                      type="text"
                                      placeholder="MÃ VOUCHER"
                                      className="px-4 py-2 w-80 rounded"
                                    />
                                    <div
                                      href="#_"
                                      className="cursor-pointer rounded px-3 py-2 overflow-hidden group bg-rose-300 relative hover:bg-gradient-to-r hover:from-rose-500 hover:to-orange-400 text-rose-600 hover:text-black hover:ring-2 hover:ring-offset-2 hover:ring-orange-400 transition-all ease-out duration-300 border border-rose-600"
                                    >
                                      <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                                      <div className="flex items-center space-x-2 ">
                                        <span className="relative">
                                          Áp dụng{" "}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="mt-4 flex justify-end space-x-2">
                                <button
                                  type="button"
                                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                >
                                  Trở lại
                                </button>
                                <button
                                  type="button"
                                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                >
                                  Áp dụng
                                </button>
                              </div>
                            </Dialog.Panel>
                          </Transition.Child>
                        </div>
                      </div>
                    </Dialog>
                  </Transition>
                </>
              </div>

              {/* voucher */}

              <div className="w-full border-b mb-3 py-1 flex items-end justify-end col-span-4 space-x-10">
                <span>
                  Tổng thanh toán ({cartDetailByUserId.length} sản phẩm) :
                  <span className="text-rose-600 text-4xl">
                    {" "}
                    {cartTotalPrice.toLocaleString("en-US", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </span>
                <Link href="/checkout">
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
