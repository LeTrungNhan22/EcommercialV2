import { Dialog, Transition } from "@headlessui/react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useDispatch } from "react-redux";
import { getUserInfoById, updateAddress } from "../../redux/auth/authSlice";
import { getError } from "../../utils/error";

const AddressPopUp = ({
  openModal,
  closeModal,
  isOpen,
  setAddressList,
  id,
  fullName,
  telephone,
}) => {
  const basUrl = process.env.NEXT_PUBLIC_API_URL;

  const [provinceList, setProvinceList] = useState([]);
  const [provinceId, setProvinceId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [districtList, setDistrictList] = useState([]);
  const [wardList, setWardList] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  useEffect(() => {
    const getProvinceList = async () => {
      await axios
        .post(`${basUrl}/geo/1.0.0/province-list`)
        .then(function (response) {
          const { data } = response;
          setProvinceList(data);
        })
        .catch(function (error) {
          console.error(getError(error));
        });
    };
    getProvinceList();
  }, []);

  const handleProvince = (e) => {
    const provinceId = e.target.value;
    setProvinceId(provinceId);
  };
  useEffect(() => {
    const getListDistrictByProvinceId = async () => {
      if (provinceId != null) {
        await axios
          .post(`${basUrl}/geo/1.0.0/district-list/?province-id=${provinceId}`)
          .then(function (response) {
            const { data } = response;
            setDistrictList(data);
          })
          .catch(function (error) {
            console.error(getError(error));
          });
      } else {
        console.log("provinceId is null");
      }
    };
    getListDistrictByProvinceId();
  }, [provinceId]);

  const handleDistrict = (e) => {
    const selectDistrictId = e.target.value;
    setDistrictId(selectDistrictId);
  };
  useEffect(() => {
    const getListWardByProvinceId = async () => {
      if (provinceId != null) {
        await axios
          .post(`${basUrl}/geo/1.0.0/ward-list?district-id=${districtId}`)
          .then(function (response) {
            const { data } = response;
            setWardList(data);
          })
          .catch(function (error) {
            console.error(getError(error));
          });
      } else {
        console.log("districtId is null");
      }
    };
    getListWardByProvinceId();
  }, [districtId]);

  const submitHandler = async ({ district, province, ward, subAddress }) => {
    const dtl = districtList.find((item) => item.ghn_id == district);
    const pvl = provinceList.find((item) => item.ghn_id == province);
    const wl = wardList.find((item) => item.ghn_id == ward);
    const data = {
      district: dtl?.name,
      districtCode: dtl?.code,
      province: pvl?.name,
      provinceCode: pvl?.code,
      ward: wl?.name,
      wardCode: wl?.code,
      address1:
        dtl?.name +
        ", " +
        pvl?.name +
        ", " +
        wl?.name +
        " (" +
        subAddress +
        ")", // Địa chỉ chi tiết
    };
    const userId = id;
    const response = await dispatch(updateAddress({ userId, data }));
    if (response.meta.requestStatus === "fulfilled") {
      closeModal();
      const getUserInfo = await dispatch(getUserInfoById({ userId }));
      setAddressList(getUserInfo.payload.address);
    }
  };
  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="flex items-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-rose-600 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        <PlusCircleIcon className="mr-1" />
        Thêm địa chỉ mới
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <form
              onSubmit={handleSubmit(submitHandler)}
              className="flex min-h-full items-center justify-center p-4 text-center"
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Địa chỉ mới
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className=" p-2">
                      <div className="flex items-center justify-evenly gap-4">
                        <input
                          id="fullName"
                          name="fullName"
                          className="px-4 py-2 w-80 rounded"
                          type="text"
                          placeholder="Họ và Tên"
                          defaultValue={fullName}
                          disabled
                        />
                        <input
                          id="telephone"
                          name="telephone"
                          type="text"
                          placeholder="Số điện thoại"
                          className="px-4 py-2 w-80 rounded"
                          defaultValue={telephone}
                          disabled
                        />
                      </div>

                      <div className="mt-3">
                        <div className="flex space-x-2">
                          <select
                            {...register("province", {
                              required: "province không thể trống",
                              pattern: {
                                message: "Vui lòng nhập province",
                              },
                            })}
                            defaultValue=""
                            onChange={(e) => handleProvince(e)}
                            className=" border border-gray-400  text-gray-500 rounded w-full px-4 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  "
                          >
                            <option value="" disabled>
                              Tỉnh/Thành phố
                            </option>

                            {provinceList.map((province) => (
                              <option
                                key={province.id}
                                value={province?.ghn_id}
                              >
                                {province.name}
                              </option>
                            ))}
                          </select>
                          <select
                            {...register("district", {
                              required: "district không thể trống",
                              pattern: {
                                message: "Vui lòng nhập district",
                              },
                            })}
                            defaultValue=""
                            onChange={(e) => handleDistrict(e)}
                            className=" border border-gray-400  text-gray-500 rounded w-full px-4 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  "
                          >
                            <option value="" disabled>
                              Quận/Huyện
                            </option>
                            {districtList.map((district) => (
                              <option
                                key={district.id}
                                value={district?.ghn_id}
                              >
                                {district.name}
                              </option>
                            ))}
                          </select>
                          <select
                            {...register("ward", {
                              required: "ward không thể trống",
                              pattern: {
                                message: "Vui lòng nhập ward",
                              },
                            })}
                            defaultValue=""
                            className=" border border-gray-400  text-gray-500 rounded w-full px-4 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  "
                          >
                            <option value="" disabled>
                              Xã/Ấp
                            </option>
                            {wardList.map((ward) => (
                              <option key={ward.id} value={ward?.ghn_id}>
                                {ward.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <input
                        {...register("subAddress", {
                          required: "Địa chỉ cụ thể không thể trống",
                          pattern: {
                            message: "Địa chỉ cụ thể phải có hơn 6 kí tự",
                          },
                        })}
                        id="subAddress"
                        name="subAddress"
                        type="text"
                        placeholder="Địa chỉ cụ thể"
                        className="px-4 py-2 w-full rounded mt-4"
                      />
                    </div>
                    {errors.subAddress && (
                      <div className="text-red-500 mb-2 text-sm  w-full text-left font-medium italic inline-block duration-200 transition-all">
                        {errors.subAddress.message}
                      </div>
                    )}

                    <div className="flex items-center ml-2 mt-4">
                      <span className="mr-2">
                        <input type="checkbox" />
                      </span>
                      <span>Đặt làm địa chỉ mặc định</span>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end space-x-2">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Trở lại
                    </button>
                    <div
                      href="#_"
                      className="cursor-pointer rounded px-3 py-2 overflow-hidden group bg-rose-300 relative hover:bg-gradient-to-r hover:from-rose-500 hover:to-orange-400 text-rose-600 hover:text-black hover:ring-2 hover:ring-offset-2 hover:ring-orange-400 transition-all ease-out duration-300 border border-rose-600"
                    >
                      <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                      <div className="flex items-center space-x-2 ">
                        <button
                          onClick={handleSubmit(submitHandler)}
                          className="relative"
                        >
                          Áp dụng{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </form>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default AddressPopUp;
