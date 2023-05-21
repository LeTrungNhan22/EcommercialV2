import React, { useContext, useEffect, useState } from "react";
import ChangePassword from "../../../../components/UserProfile/ChangePassword";
import UserLayout from "../../../../components/UserProfile/UserLayout";

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
      <ChangePassword></ChangePassword>
    </UserLayout>
  );
};

export default ChangPassWordScreen;
