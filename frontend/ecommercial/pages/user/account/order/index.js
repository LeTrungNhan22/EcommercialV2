import React, { useContext, useEffect, useState } from "react";
import BreadCrumb from "../../../../components/breadcrumb/BreadCrumb";
import Layout from "../../../../components/common/Layout";
import SideBar from "../../../../components/UserProfile/SideBar";
import UserInforScreen from "../../../../components/UserProfile/UserInfor";
import UserLayout from "../../../../components/UserProfile/UserLayout";
import AuthContext from "../../../../context/authContext";
import OrderList from "../../../../components/userProfile/OrderList";

const OrderScreen = () => {
    const { user } = useContext(AuthContext);
    const {
        username,
        fullName,
        imageUrl,
        email,
        birthday,
        telephone,
        gender,
        id,
        address,
        shop,
    } = user;

    return (
        <UserLayout userId={id}>
            <OrderList
                userId={id}
            />
        </UserLayout>
    );
};

export default OrderScreen;
