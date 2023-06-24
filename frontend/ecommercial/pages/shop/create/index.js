/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
import React, { useContext, useEffect, useState } from "react";
import CreateShopPage from "../../../components/Shop/CreateShop";
import AuthContext from "../../../context/authContext";
import { useRouter } from "next/router";

const CreateShopeScreen = () => {
  const { user, isLogin } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (isLogin === false) {
      router.push("/user/auth/login");
    }
  }, [isLogin]);
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
    <>
      <CreateShopPage
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
    </>
  );
};

export default CreateShopeScreen;
