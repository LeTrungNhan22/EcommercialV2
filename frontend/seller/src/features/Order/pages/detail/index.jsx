import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import "./style.scss";
import { useEffect } from "react";
import { orderDetail, updateOrderStatus } from "../../orderSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import OrderItem from "../../components/OrderItem";
const OrderDetail = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const orderId = history.location.pathname.split("/")[2];
    const orderDetailSelector = useSelector((state) => state.order.orderDetail);
    const { order, orderItems } = orderDetailSelector;


    useEffect(() => {
        const fetchOrderDetail = async () => {
            const action = orderDetail(orderId);
            const actionResult = await dispatch(action);
            const currentOrder = unwrapResult(actionResult);
            console.log(currentOrder);
        };
        fetchOrderDetail();
    }, [dispatch, orderId]);

    const handleConfirmOrder = async (orderId) => {
        const confirmAlert = window.confirm(`Are you sure to confirm order ${orderId}?`);
        if (confirmAlert) {
            try {
                const data = {
                    "byUser": {
                        "email": order?.emailCustomer,
                        "phone": order?.phoneCustomer,
                        "userId": order?.userId,
                        "userName": order?.nameCustomer,
                    },
                    "note": "update status order by seller",
                    "status": "DELIVERED"
                }
                const action = updateOrderStatus({ id: orderId, data: data });
                const actionResult = await dispatch(action);
                console.log(actionResult);
                const currentOrder = unwrapResult(actionResult);
                console.log(currentOrder);
                if (currentOrder) {
                    history.push("/orders");
                } else {
                    throw new Error();
                }
            } catch (error) {
                console.log(error);
            }

        }

    }

    return (
        <div className="order__container">
            <div className="productTitleContainer">
                <h1 className="productTitle">Order Detail</h1>
                <div className="buttonContainer">
                    <button
                        onClick={() => history.goBack()}
                        className="backButton">Back</button>

                    <button
                        onClick={() => handleConfirmOrder(orderId)}
                        className="productAddButton">Confirm</button>

                </div>
            </div>
            <div className="productTop">
                <div className="productTopLeft">
                    <div className="ProductInfoTop">
                        {/* <img
                src={product?.featuredImageUrl}
                className="productInfoImg"
                alt={product?.name}
              /> */}
                        <span className="productName">{ }</span>
                    </div>
                    <div className="ProductInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">Order ID:</span>
                            <span className="productInfoValue">{order?.id}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Discount Price:</span>
                            <span

                                className="productInfoValue">{Number(order?.discountTotalPrice.amount).toLocaleString("vi")}

                                {order?.discountTotalPrice.currencyCode}

                            </span>

                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Email Customer:</span>
                            <span className="productInfoValue">{order?.emailCustomer}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Name Customer:</span>
                            <span className="productInfoValue">{order?.nameCustomer}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Shipping Address:</span>
                            <span className="productInfoValue">{order?.shippingAddress?.address1}</span>
                        </div>

                    </div>
                </div>
                <div className="productTopRight">
                    <div className="ProductInfoTop">
                        {/* <img
                src={shop?.imageUrl}
                className="productInfoImg"
                alt={shop?.name}
              /> */}
                        <span className="productName"></span>
                    </div>
                    <div className="ProductInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">Shop ID:</span>
                            <span className="productInfoValue">{order?.shopId}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Shop Name:</span>
                            <span className="productInfoValue">{order?.shopName}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Status:</span>
                            <span className="productInfoValue">{order?.status}</span>
                        </div>
                        <div className="productInfoItem">
                            <span
                                style={{
                                    color: "red",
                                    fontWeight: "bold",
                                }}
                                className="productInfoKey">Total Price:</span>
                            <span className="productInfoValue">
                                {Number(order?.totalPrice.amount).toLocaleString("vi")}
                                {order?.totalPrice.currencyCode}
                            </span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Type:</span>
                            <span className="productInfoValue">{order?.type}</span>
                        </div>

                    </div>
                </div>
            </div>

            {orderItems && orderItems.map((item) => (
                <OrderItem key={item.id} item={item} />
            ))}


        </div>
    )
}

export default OrderDetail