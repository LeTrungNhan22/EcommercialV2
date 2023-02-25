import React, { useState } from "react";
import BreadCrumb from "../breadcrumb/BreadCrumb";
import Layout from "../common/Layout";
import SideBar from "./SideBar";

const UserLayout = ({ children, userId }) => {
  return (
    <>
      <Layout title={`Profile`}>
        <div className="w-full min-h-screen bg-custome">
          <BreadCrumb title={`Profile`} userId={userId} />
          <div className="w-[1200px] grid grid-cols-12 items-start gap-6 pt-4 pb-16 mx-auto">
            {/* sidebar */}
            <div className="col-span-3">
              <SideBar />
            </div>
            {/* sidebar */}

            {/* profile info */}
            <div className="col-span-9 gap-4 mt-6 lg:mt-0 bg-opacity-95  rounded">
              <main>{children}</main>
            </div>
            {/* profile info */}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default UserLayout;
