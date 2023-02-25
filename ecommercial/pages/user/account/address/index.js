import React, { useContext, useEffect, useState } from "react";
import BreadCrumb from "../../../../components/breadcrumb/BreadCrumb";
import Layout from "../../../../components/common/Layout";
import SideBar from "../../../../components/UserProfile/SideBar";
import UserAddress from "../../../../components/UserProfile/UserAddress";
import UserLayout from "../../../../components/UserProfile/UserLayout";
import AuthContext from "../../../../context/authContext";

const UserAddressScreen = () => {
  const { user } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState({});
  useEffect(() => {
    setUserProfile(user);
  }, [user]);
  const [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }
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
      <UserAddress
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
        isOpen={isOpen}
        closeModal={closeModal}
        openModal={openModal}
      />
    </UserLayout>
  );
};

export default UserAddressScreen;
