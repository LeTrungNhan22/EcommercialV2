import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Layout from "../common/Layout";
import AddressPopUp from "../UserProfile/AddressPopUp";

const CreateShopPage = ({
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
  closeModal,
  openModal,
  isOpen,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm();
  const dispatch = useDispatch();
  const [addressList, setAddressList] = useState({});
  useEffect(() => {
    setAddressList(address);
  }, [address]);
  return (
    <>
      <Layout title={"Tạo kênh bán hàng"}>
        <div className="bg-custome p-6">
          <div class="max-w-4xl w-full space-y-5 p-10 bg-white rounded-xl shadow-lg z-10 mx-auto ">
            <div class="grid gap-8 grid-cols-1">
              <div class="flex flex-col ">
                <div class="flex flex-col sm:flex-row items-center">
                  <h2 class="font-semibold text-lg mr-auto">Shop info</h2>
                  <div class="w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0"></div>
                </div>
                <div class="mt-5">
                  <div class="form">
                    <div class="md:space-y-2 mb-3">
                      <label class="text-xs font-semibold text-gray-600 py-2">
                        Company Logo
                        <abbr class="hidden" title="required">
                          *
                        </abbr>
                      </label>
                      <div class="flex items-center py-6">
                        <div class="w-12 h-12 mr-4 flex-none rounded-xl border overflow-hidden">
                          <img
                            class="w-12 h-12 mr-4 object-cover"
                            src="https://images.unsplash.com/photo-1611867967135-0faab97d1530?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1352&amp;q=80"
                            alt="Avatar Upload"
                          />
                        </div>
                        <label class="cursor-pointer ">
                          <span class="focus:outline-none text-white text-sm py-2 px-4 rounded-full bg-green-400 hover:bg-green-500 hover:shadow-lg">
                            Browse
                          </span>
                          <input
                            type="file"
                            class="hidden"
                            multiple="multiple"
                            accept="accept"
                          />
                        </label>
                      </div>
                    </div>
                    <div class="md:flex flex-row md:space-x-4 w-full text-xs">
                      <div class="mb-3 space-y-2 w-full text-xs">
                        <label class="font-semibold text-gray-600 py-2">
                          Tên shop <abbr title="required">*</abbr>
                        </label>
                        <input
                          placeholder="Company Name"
                          class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                          required="required"
                          type="text"
                          name="integration[shop_name]"
                          id="integration_shop_name"
                        />
                        <p class="text-red text-xs hidden">
                          Please fill out this field.
                        </p>
                      </div>
                    </div>

                    <div class="md:flex md:flex-col md:space-x-4 w-full text-xs mb-6">
                      <label class="font-semibold text-gray-600 py-2">
                        Địa chỉ
                      </label>
                      <span className="text-base font-normal">
                        {addressList?.address1 == null
                          ? "Bạn chưa có thông tin địa chỉ"
                          : addressList?.address1}
                      </span>
                      <div className="w-1/5 mt-3">
                        <AddressPopUp
                          openModal={openModal}
                          closeModal={closeModal}
                          isOpen={isOpen}
                          addressList={addressList}
                          setAddressList={setAddressList}
                          id={id}
                          fullName={fullName}
                          telephone={telephone}
                        />
                      </div>
                    </div>
                    <div class="md:flex flex-row md:space-x-4 w-full text-xs">
                      <div class="mb-3 space-y-2 w-full text-xs">
                        <label class="font-semibold text-gray-600 py-2">
                          Email <abbr title="required">*</abbr>
                        </label>
                        <input
                          placeholder={email}
                          class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                          required="required"
                          type="text"
                          name="integration[shop_name]"
                          id="integration_shop_name"
                          disabled
                        />
                      </div>
                      <div class="mb-3 space-y-2 w-full text-xs">
                        <label class="font-semibold text-gray-600 py-2">
                          Số điện thoại <abbr title="required">*</abbr>
                        </label>
                        <input
                          placeholder={telephone}
                          class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                          required="required"
                          type="text"
                          name="integration[shop_name]"
                          id="integration_shop_name"
                          disabled
                        />
                      </div>
                    </div>
                    <p className="text-xs mb-2 text-gray-400">
                      Để thay đổi thông tin này vui lòng đến trang cá nhân của
                      bạn{" "}
                      <Link href={`/user/account/profile`}>
                        <span className="text-blue-500 cursor-pointer">
                          Hồ sơ cá nhân
                        </span>
                      </Link>
                    </p>
                    <div class="flex-auto w-full mb-1 text-xs space-y-2">
                      <label class="font-semibold text-gray-600 py-2">
                        Description
                      </label>
                      <textarea
                        required=""
                        name="message"
                        id=""
                        class="w-full min-h-[100px] max-h-[300px] h-28 appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg  py-4 px-4"
                        placeholder="Enter your comapny info"
                        spellcheck="false"
                      ></textarea>
                      <p class="text-xs text-gray-400 text-left my-3">
                        You inserted 0 characters
                      </p>
                    </div>
                    <p class="text-xs text-red-500 text-right my-3">
                      Required fields are marked with an asterisk{" "}
                      <abbr title="Required field">*</abbr>
                    </p>
                    <div class="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse">
                      <button class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100">
                        {" "}
                        Cancel{" "}
                      </button>
                      <button class="mb-2 md:mb-0 bg-green-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-500">
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CreateShopPage;
