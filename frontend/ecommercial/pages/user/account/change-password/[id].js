/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
import React, { useContext, useEffect, useState } from "react";
import UserLayout from "../../../../components/UserProfile/UserLayout";

import ChangePassPage from "../../../../components/userProfile/ChangePassPage";
import AuthContext from "../../../../context/authContext";

const ChangPassWordScreen = () => {
  const { user } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState({});
  useEffect(() => {
    setUserProfile(user);
  }, [user]);
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
  } = userProfile;
  return (
    <UserLayout userId={id}>
      <ChangePassPage></ChangePassPage>
    </UserLayout>
  );
};

export default ChangPassWordScreen;
