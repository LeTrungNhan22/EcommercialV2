import React, { useContext, useEffect, useState } from "react";
import BreadCrumb from "../../../../components/breadcrumb/BreadCrumb";
import Layout from "../../../../components/common/Layout";
import SideBar from "../../../../components/user-profile/SideBar";
import UserAddress from "../../../../components/user-profile/UserAddress";
import AuthContext from "../../../../utils/User";

const UserAddressScreen = () => {
  const { user } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState({});
  useEffect(() => {
    setUserProfile(user);
  }, [user]);
  return (
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
          <div className="col-span-9 gap-4 mt-6 lg:mt-0 bg-white">
            <UserAddress
              username={userProfile.username}
              fullName={userProfile.fullName}
              imageUrl={userProfile.imageUrl}
              email={userProfile.email}
              telephone={userProfile.telephone}
              gender={userProfile.gender}
              id={userProfile.id}
            />
          </div>
          {/* profile info */}
        </div>
      </div>
    </Layout>
  );
};

export default UserAddressScreen;
