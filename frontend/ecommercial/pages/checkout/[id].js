import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FaDollarSign } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";


import { useDispatch, useSelector } from "react-redux";
import AddressPopUp from "../../components/UserProfile/AddressPopUp";
import AuthContext from "../../context/authContext";
import { getCartDetailByUserId } from "../../redux/cart/cartSlice";
import { createOrder } from "../../redux/order/orderSlice";
import { toast } from "react-hot-toast";
import LanguageContext from "../../context/languageContext";

const CheckoutScreen = () => {
    const { user } = useContext(AuthContext);
    const { fullName, telephone, id, address, } = user;
    const [addressList, setAddressList] = useState({});
    const cartDetail = useSelector((state) => state.cart.cartDetail);
    const { totalPrice, totalCurrentPrice,
        totalDiscount, totalQuantity, itemToShops } = cartDetail;
    const [loading, setLoading] = useState(false);

    const { languageData } = useContext(LanguageContext);
    const {
        order_title,
        order_address,
        order_button_change_address,
        cart_product_table_title,
        cart_product_table_price,
        product_quantity,
        status_order_wating_process,
        label_money,
        order_shipping_unit,
        order_message,
        order_message_placeholder,
        td_order_pay,
        total_price,
        cart_discount,

    } = languageData;


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

        if (user.id !== undefined) {
            getCartDetail();
        }
    }, [dispatch, user.id]);

    useEffect(() => {
        setAddressList(address);
    }, [address]);
    const [isOpen, setIsOpen] = useState(false);
    function closeModal() {
        setIsOpen(false);
    }
    function openModal() {
        setIsOpen(true);
    }

    const router = useRouter();

    const handleCheckout = async () => {
        const data = {
            cartItemInputs: itemToShops,
            payment: true,
            userId: id,
        };
        try {
            setLoading(true);
            const response = await dispatch(createOrder(data));
            if (response.error) {
                toast.error(response.error.message);
            }
            if (response.payload) {
                setLoading(false);
                toast.success("Đặt hàng thành công");
                router.push("/user/account/order");
            }
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <>
            <AddressPopUp
                openModal={openModal}
                closeModal={closeModal}
                isOpen={isOpen}
                addressList={addressList}
                setAddressList={setAddressList}
                id={id}
                fullName={fullName}
                telephone={telephone}
            />
            <Head>
                <title>Payment</title>
            </Head>
            <header className="sticky top-0 z-20 shadow-md  py-2 bg-white ">
                <div className="w-[1200px] mx-auto border-l px-6 my-5 border-red-600">
                    <Link href="/">
                        <a className="text-red-700">HOME</a>
                    </Link>
                    <h2 className="text-3xl text-rose-500">{order_title}</h2>
                </div>
            </header>
            {/* checkout page */}

            <main className="bg-gray-300 py-3">
                <section className="bg-white  w-[1200px] mx-auto shadow-md mb-3  ">
                    <div className="address-checkout"></div>
                    <div className="p-3 flex items-center space-x-3 text-amber-500 text-xl mb-3">
                        <GrLocation className="text-amber-500" />
                        <h3>{order_address}</h3>
                    </div>

                    <div className="grid grid-cols-4 mx-auto items-center justify-center px-4 pb-6">
                        <div className=" flex flex-col">
                            <span>{fullName}</span>
                            <span className="font-bold">
                                {telephone == null ? "No phone number yet" : telephone}
                            </span>
                        </div>
                        <div className="col-span-2">
                            <p>
                                <p>
                                    {addressList?.address1 == null
                                        ? "No address information yet"
                                        : addressList?.address1}
                                </p>
                            </p>
                        </div>
                        <div className="space-x-10">
                            <span className=" text-xs border p-1 border-rose-500 text-red-600 ">
                                Default
                            </span>
                            <>
                                <button
                                    type="button"
                                    onClick={() => openModal()}
                                    className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-rose-600 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                                >
                                    {order_button_change_address}
                                </button>
                            </>
                        </div>
                    </div>
                </section>

                {/* product checkout */}
                <section className="bg-white w-[1200px] mx-auto shadow-md px-2 py-4">
                    <div className="grid grid-cols-2 items-center px-4 mb-2">
                        <h3 className="text-2xl text-amber-600">{cart_product_table_title}</h3>
                        <div className="flex justify-between items-center text-gray-400">
                            <span>{cart_product_table_price} </span>
                            <span>{product_quantity} </span>
                            <span>{label_money}</span>
                        </div>
                    </div>

                    {itemToShops?.length > 0 ? (
                        itemToShops?.map((item, index) => (
                            <div className="grid grid-cols-4" key={index}>
                                <div className=" flex items-center space-x-3 px-2">
                                    <div className="w-32 h-32 relative">
                                        <Image
                                            src={item.productVariant?.imageUrl}
                                            alt={item.productVariant?.productName}
                                            layout="fill"
                                            className="object-center object-contain "
                                        ></Image>
                                    </div>
                                    <span>         {item.productVariant?.productName}</span>
                                </div>
                                <div className="items-center flex">
                                    <span className="text-gray-400">
                                        {/* {productVariant.industrial} */}
                                    </span>
                                </div>
                                <div className="flex col-span-2 justify-between items-center pr-4">
                                    <span>{Number(item.productVariant?.price.amount).toLocaleString("vi-VN")}VND</span>
                                    <span>{totalQuantity}</span>
                                    <span>{Number(item.productVariant?.price.amount).toLocaleString("vi-VN")}VND</span>
                                </div>
                            </div>
                        )
                        )) : (
                        <div>Không có sản phẩm nào trong giỏ hàng</div>
                    )}

                    <div className="bg-cyan-50 w-full  px-2 py-4 border border-cyan-200">
                        <div className="grid grid-cols-3">
                            <div className="space-x-3">
                                <span className="text-sm">{order_message}: </span>
                                <input
                                    type="text"
                                    placeholder={order_message_placeholder}
                                    className="rounded shadow"
                                />
                            </div>
                            <div className="col-span-2 flex justify-between">
                                <span className="text-green-500">{order_shipping_unit}:</span>
                                <div className="flex flex-col">
                                    <span>Nhanh</span>
                                    <span className="text-gray-500 text-sm">
                                        Nhận hàng vào ngày {new Date().getDate() + 1} tháng{" "}
                                        {new Date().getMonth() + 1} năm {new Date().getFullYear()}

                                    </span>
                                </div>
                                <a className="cursor-pointer rounded px-5 py-2.5 overflow-hidden group bg-rose-500 relative hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
                                    <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                                    <div className="flex items-center space-x-2">
                                        <FaDollarSign />
                                        {loading === false ? (<button
                                            onClick={handleCheckout}
                                            className="relative"
                                        >
                                            {td_order_pay}
                                        </button>) : (
                                            <button
                                                disabled
                                                className="relative"
                                            >
                                                {status_order_wating_process}
                                            </button>
                                        )}
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="bg-rose-50 w-full  px-2 py-4 border border-rose-50">
                        <div className="flex items-end justify-end space-x-4">
                            <span>
                                {total_price} ( {totalQuantity} {cart_product_table_title}):{" "}
                                {cart_discount}
                            </span>
                            <span className="text-2xl text-red-500">

                                {" "}
                                {Number(totalPrice).toLocaleString("vi-VN")}VND
                            </span>
                        </div>
                    </div>
                </section>
                {/* product checkout */}
            </main>

        </>

    );
};
export default CheckoutScreen;
