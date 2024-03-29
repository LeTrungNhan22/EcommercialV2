/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
import React, { useContext } from "react";
import UserLayout from "../../../../components/UserProfile/UserLayout";

import AuthContext from "../../../../context/authContext";
import OrderList from "../../../../components/UserProfile/UserOrderList";

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
