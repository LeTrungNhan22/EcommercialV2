import React, { useContext, useEffect, useState } from "react";
import BreadCrumb from "../../../../components/breadcrumb/BreadCrumb";
import Layout from "../../../../components/common/Layout";
import SideBar from "../../../../components/UserProfile/SideBar";
import UserInforScreen from "../../../../components/UserProfile/UserInfor";
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
    <div>
      <Layout title={`Profile`}>
        <div className="bg-gray-300">
          <BreadCrumb title={`Profile`} />
          <div className="w-[1200px] grid grid-cols-12 items-start gap-6 pt-4 pb-16 mx-auto">
            {/* sidebar */}
            <div className="col-span-3">
              <SideBar />
            </div>
            {/* sidebar */}
            {/* profile info */}
            <div className="col-span-9 grid bg-white p-3 shadow rounded mt-6 lg:mt-0">
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
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default InforScreen;
