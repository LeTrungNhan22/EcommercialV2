/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
import React, { useContext } from "react";
import UserLayout from "../../../../components/userProfile/UserLayout";
import OrderList from "../../../../components/userProfile/OrderList";
import AuthContext from "../../../../context/authContext";

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
