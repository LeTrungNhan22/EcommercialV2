import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import BreadCrumb from "../../../../components/breadcrumb/BreadCrumb";
import Layout from "../../../../components/common/Layout";
import SideBar from "../../../../components/user-profile/SideBar";
import AuthContext from "../../../../context/authContext";

const UserProfileScreen = () => {
  const { user } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    setUserProfile(user);
  }, []);
  

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
          <div className="col-span-9 grid md:grid-cols-3 gap-4 mt-6 lg:mt-0">
            <div className="shadow rounded bg-white px-4 pt-6 pb-8">
              <div className="flex justify-between items center mb-4">
                <h3 className="font-medium capitalize text-gray-800 text-lg">
                  Thông tin cá nhân
                </h3>
                <Link href="/">
                  <a className="text-rose-500">Chỉnh sửa</a>
                </Link>
              </div>
              <div className="space-y-1">
                <h4 className="text-gray-700 font-medium">
                  {userProfile.fullName}
                </h4>
                <p className="text-gray-800">{userProfile.email}</p>
                <p className="text-gray-800">{userProfile.telephone}</p>
              </div>
            </div>

            <div className="shadow rounded bg-white px-4 pt-6 pb-8">
              <div className="flex justify-between items center mb-4">
                <h3 className="font-medium capitalize text-gray-800 text-lg">
                  Địa chỉ giao hàng
                </h3>
                <Link href="/user/account/address">
                  <a className="text-rose-500">Chỉnh sửa</a>
                </Link>
              </div>
              <div className="space-y-1">
                <h4 className="text-gray-700 font-medium">{user.fullName}</h4>
                <p className="text-gray-800">{userProfile.address?.address1}</p>

                <p className="text-gray-800">{userProfile.telephone}</p>
              </div>
            </div>
          </div>
          {/* profile info */}
        </div>
      </div>
    </Layout>
  );
};

export default UserProfileScreen;