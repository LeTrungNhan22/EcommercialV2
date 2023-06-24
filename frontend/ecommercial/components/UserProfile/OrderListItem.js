/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
import React, { useContext } from 'react'
import LanguageContext from "../../context/languageContext";
import { useDispatch } from "react-redux";
import { cancelOrder } from "../../redux/order/orderSlice";
import { toast } from "react-hot-toast";
const OrderListItem = ({ orders, ordersDetail }) => {
    console.log();
    const { order, orderItems } = orders;
    const { languageData } = useContext(LanguageContext);
    const {
        info_title_order,
        info_order_see_shop,
        product_color,
        product_quantity,
        cart_discount,
        total_price,
        button_order_cancel,
        mess_confirm,
        mess_cancel_order
    } = languageData;
    const dispatch = useDispatch();

    const handleCancelOrder = async (id) => {
        const confirm = window.confirm(`${mess_confirm} ${button_order_cancel}${id}`);
        if (confirm) {
            const res = await dispatch(cancelOrder(id));
            if (res.meta.requestStatus === "fulfilled") {

                toast.success(`${mess_cancel_order} ${id}`);
            } else {
                toast.error("Hủy đơn hàng thất bại");
            }
        }
    }

    return (
        <div>
            <section className="bg-white rounded-md shadow-md mb-4">
                <div className="max-w-screen-lg mx-auto px-4 py-4 md:px-8">
                    <div className="w-full flex justify-between">
                        {order && <h1 className="text-gray-800 text-2xl font-bold sm:text-2xl">{info_title_order} {order.id}</h1>}
                        <button
                            onClick={() => handleCancelOrder(order.id)}
                            className="inline-flex items-center w-full px-2 py-2 mb-3 mr-5 text-base font-semibold text-white no-underline align-middle bg-rose-600 border border-transparent border-solid rounded-md cursor-pointer select-none sm:mb-0 sm:w-auto hover:bg-rose-700 hover:border-rose-700 hover:text-white transition-all duration-100">
                            {button_order_cancel}
                        </button>
                    </div>
                    <ul className="mt-5 divide-y space-y-3">
                        {
                            orderItems && orderItems.map((item) => (
                                <li key={item.id} className="px-4 py-5 duration-150 hover:border-white hover:rounded-xl hover:bg-gray-100">
                                    <div className="flex items-center justify-between pb-3">
                                        <span className="font-bold text-ellipsis line-clamp-1 w-80">{item.variant.productName}</span>
                                        <span className="text-sm text-gray-600 bg-blue-400 px-2 py-1 rounded-md mr-1">
                                            {order.status}

                                        </span>
                                    </div>
                                    <a href={`/product/${item.variant.productId}`} className="space-y-3">
                                        <div className="flex items-center gap-x-3">
                                            <div className="bg-gray-100 w-14 h-14 border rounded-full flex items-center justify-center">
                                                <picture>
                                                    <img src={item.variant.imageUrl} alt="company icon" />
                                                </picture>
                                            </div>
                                            <div>
                                                <span className="block text-sm text-indigo-600 font-medium">{item.variant.productName}</span>
                                                <h3 className="text-base text-gray-800 font-semibold mt-1">{Number(item.variant.price.amount).toLocaleString()}</h3>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 sm:text-sm font-bold">
                                            {product_color}:  {item.variant.color}
                                        </p>
                                        <div className="text-sm text-gray-600 flex items-center justify-between">
                                            <div className="flex  text-sm items-center  gap-6">
                                                <span className="flex items-center gap-2 text-rose-500 font-bold">
                                                    {product_quantity}: {item.quantity}
                                                </span>
                                                <span className="flex items-center gap-2">
                                                    {cart_discount} : {Number(order.discountTotalPrice.amount * item.quantity).toLocaleString()} ({item.variant.discount}%)
                                                </span>
                                                <span className="flex items-center gap-2">
                                                    {total_price}: {Number(order.totalPrice.amount).toLocaleString()}
                                                </span>
                                            </div>
                                            <a href={`/shop/view/${order.shopId}`} className="inline-flex items-center w-full px-2 py-2 mb-3 mr-1 text-base font-semibold text-white no-underline align-middle bg-gray-600 border border-transparent border-solid rounded-md cursor-pointer select-none sm:mb-0 sm:w-auto hover:bg-gray-700 hover:border-gray-700 hover:text-white focus-within:bg-gray-700 focus-within:border-blue-700">
                                                {info_order_see_shop}
                                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                            </a>
                                        </div>
                                    </a>

                                </li>
                            ))
                        }
                    </ul>
                </div>
            </section>
        </div>
    )
}

export default OrderListItem