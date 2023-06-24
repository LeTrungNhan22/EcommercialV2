/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
import React, { useContext, useEffect, useState } from "react";
import UserInforScreen from "../../../../components/UserProfile/UserInfor";
import UserLayout from "../../../../components/userProfile/UserLayout";
import AuthContext from "../../../../context/authContext";

const InforScreen = () => {
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
      <UserInforScreen
        username={username}
        fullName={fullName}
        imageUrl={imageUrl}
        email={email}
        birthday={birthday}
        telephone={telephone}
        gender={gender}
        id={id}
        address={address}
        shop={shop}
      />
    </UserLayout>
  );
};

export default InforScreen;
