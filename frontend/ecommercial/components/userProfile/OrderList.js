/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */


import React from 'react'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { filterOrder, orderById, orderDetail, orderDetailById } from "../../redux/order/orderSlice";
import { useState } from "react";
import { useContext } from "react";
import LanguageContext from "../../context/languageContext";
import OrderListItem from "./OrderListItem";

const OrderList = ({ userId }) => {
    const dispatch = useDispatch();
    const orderFilter = useSelector(state => state.order.orderFilter);
    const ordersDetail = useSelector(state => state.order.ordersDetail);

    const loading = useSelector(state => state.order.loading);

    const { languageData } = useContext(LanguageContext);
    const {
        info_title_order,
    } = languageData;


    useEffect(() => {
        const getOrderDetail = async () => {
            const data = {
                "type": "PURCHASE",
                "userId": userId
            }
            const res = await dispatch(filterOrder(data));

            if (res.meta.requestStatus === "fulfilled") {
                res.payload.resultList.map(async (item) => {
                    // console.log(item);
                    const res2 = await dispatch(orderDetailById(item.id));
                    if (res2.meta.requestStatus === "fulfilled") {
                        // console.log(res2.payload);
                    }
                    // console.log(res2);
                })

            }
        }
        if (userId) {
            getOrderDetail();

        }
    }, [userId])
    console.log(ordersDetail, "ordersDetail");

    if (loading === true) {
        return (
            <>
                <div>Loading...</div>
            </>
        );
    } else if (ordersDetail.length === 0 || ordersDetail === []) {
        return <>
            <section className="bg-white rounded-md ">
                <div className="max-w-screen-lg mx-auto px-4 py-6 md:px-8">
                    <div className="max-w-md">
                        <h1 className="text-gray-800 text-xl font-bold sm:text-2xl">Bạn chưa có đơn hàng nào !!</h1>
                    </div>
                </div>
            </section>
        </>
    }
    return (
        <>
            {ordersDetail && ordersDetail.map((order, index) => (
                <OrderListItem key={index} orders={order} ordersDetail={ordersDetail} />

            ))}
        </>
    )
}

export default OrderList