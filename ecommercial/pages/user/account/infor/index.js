import React, { useContext, useEffect, useState } from "react";
import BreadCrumb from "../../../../components/breadcrumb/BreadCrumb";
import Layout from "../../../../components/common/Layout";
import SideBar from "../../../../components/user-profile/SideBar";
import UserInforScreen from "../../../../components/user-profile/UserInfor";
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
              />
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default InforScreen;
{
  /* <form action="">
                <h3 className="text-lg font-medium capitalize mb-4">
                    Quản lý thông tin
                </h3>
                <div className="space-y-4">
                        <div>
                            <label className="text-gray-600 mb-2 block">
                                Họ
                            </label>
                            <input type="text" className="input-box"></input>
                        </div>
                        <div>
                            <label className="text-gray-600 mb-2 block">
                                Tên
                            </label>
                            <input type="text" className="input-box"  placeholder='te'></input>
                        </div>
                   
                        <div>
                            <label className="text-gray-600 mb-2 block">
                                Ngày sinh
                            </label>
                            <input type="date" value="1998-01-08" className="input-box"></input>
                        </div>
                        <div className="flex  items-center "   >
                    <div className="flex items-center justify-center">
                        <label className="text-gray-600 mr-10">
                            Giới tính:
                        </label>

                        <div className="flex items-center justify-center m-4">
                            <input id="default-radio-1" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                            <label for="default-radio-1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nam</label>
                        </div>

                        <div className="flex items-center justify-center m-4">
                            <input checked id="default-radio-2" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                            <label for="default-radio-2" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nữ</label>
                        </div>

                    </div>
                        </div>
                   
                        <div>
                            <label className="text-gray-600 mb-2 block">
                                Email
                            </label>
                            <input type="text" className="input-box" ></input>
                        </div>

                        <div>
                            <label className="text-gray-600 mb-2 block">
                                Số điện thoại
                            </label>
                            <input type="text" className="input-box"></input>
                        </div>

                </div>
                <div className="mt-6">
                    <button type="submit"
                        className="px-6 py-2 text-center text-white bg-red-500 border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-medium">
                        Lưu
                    </button>
                </div>
        </form> */
}
