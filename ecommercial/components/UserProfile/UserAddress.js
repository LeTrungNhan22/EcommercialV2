import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsPlusLg } from "react-icons/Bs";
import { GrLocation } from "react-icons/gr";
import { getError } from "../../utils/error";
import AuthContext from "../../utils/User";

export default function UserAddress({ fullName, telephone }) {
  const basUrl = process.env.NEXT_PUBLIC_API_URL;

  // pop up voucher
  const [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }
  // pop up voucher
  const [provinceList, setProvinceList] = useState([]);
  const [provinceId, setProvinceId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [districtList, setDistrictList] = useState([]);
  const [wardList, setWardList] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    getFieldState,
    watch,
  } = useForm();

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
        console.log("provinceId is null");
      }
    };
    getListWardByProvinceId();
  }, [districtId]);

  const submitHandler = ({ district, province, ward, subAddress }, e) => {
    e.preventDefault();
    const dtl = districtList.find((item) => item.ghn_id == district);
    const pvl = provinceList.find((item) => item.ghn_id == province);
    const wl = wardList.find((item) => item.ghn_id == ward);
    updateUserAddress({
      district: dtl?.name,
      districtCode: dtl?.code,
      province: pvl?.name,
      provinceCode: pvl?.code,
      ward: wl?.name,
      wardCode: wl?.code,
      subAddress: subAddress,
    });
    window.location.reload();
  };

  return (
    <div>
      <div className="flex items-center m-4">
        <h3 className="text-lg font-medium capitalize flex-1">
          Địa chỉ của tôi
        </h3>
        {/* <button type="button" class=" focus:outline-none text-white bg-red-500 hover:bg-red-400 focus:ring-4 focus:ring-red-500 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 flex items-center"><BsPlusLg className="mr-2"/>Thêm địa chỉ mới</button> */}
        <>
          <button
            type="button"
            onClick={openModal}
            className="flex items-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-rose-600 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            <BsPlusLg className="mr-1" />
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
                              className="input-box"
                              defaultValue={fullName}
                              type="text"
                              placeholder="Họ và Tên"
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
                                onChange={(e) => handleProvince(e)}
                                className=" border border-gray-400  text-gray-500 rounded w-full px-4 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  "
                              >
                                <option selected disabled>
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
                                onChange={(e) => handleDistrict(e)}
                                className=" border border-gray-400  text-gray-500 rounded w-full px-4 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  "
                              >
                                <option selected disabled>
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
                                className=" border border-gray-400  text-gray-500 rounded w-full px-4 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  "
                              >
                                <option selected disabled>
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
      </div>
      <hr className="my-8 h-px bg-gray-200 border-0 dark:bg-gray-700 "></hr>
      <section className="bg-white    w-full mb-3  ">
        <div className="address-checkout"></div>
        <div className="p-3 flex items-center space-x-3 text-amber-500 text-xl mb-3">
          <GrLocation className="text-amber-500" />
          <h3>Địa chỉ nhận hàng</h3>
        </div>

        <div className="grid grid-cols-4 mx-auto items-center justify-center px-4 pb-6">
          <div className=" flex flex-col">
            {/* <span>{userById.fullName}</span> */}
            {/* <span className="font-bold">{userById.telephone}</span> */}
          </div>
          <div className="col-span-2">
            {/* <p>{userById.address?.address1}</p> */}
          </div>
          <div className="space-x-10 mx-auto">
            <>
              <button
                type="button"
                onClick={openModal}
                className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-rose-600 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              >
                Thay đổi địa chỉ
              </button>

              {/* <Transition appear show={isOpen} as={Fragment}>
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
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                      >
                        <Dialog.Panel className="w-full max-w-2xl  transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                          <Dialog.Title
                            as="h3"
                            className="text-lg font-medium border-b  pb-3 leading-6 text-gray-900"
                          >
                            Địa chỉ của tôi
                          </Dialog.Title>
                          <div className="mt-2 flex justify-between items-center  border-b pb-4">
                            <div className="flex items-center justify-center space-x-3">
                              <input
                                type="radio"
                                className="text-red-500 text-sm focus:ring-red-500 cursor-pointer"
                              />
                              <div>
                                <span className="font-semibold border-r pr-4">
                                  Lê Trung Nhân
                                </span>
                                <span>(+84) 353357781 </span>
                                <p>
                                  Cổng Sau Trường Đh Thể Dục Thể Thao Khu Phố 6,
                                  Phường Linh Trung, Thành Phố Thủ Đức, TP. Hồ
                                  Chí Minh
                                </p>
                                <span className=" text-xs border p-1 border-rose-500 text-red-600 ">
                                  Mặc định
                                </span>
                              </div>
                            </div>
                            <div>
                              <span className="text-cyan-500">Cập nhật</span>
                            </div>
                          </div>
                          <div className="mt-2 flex justify-between items-center py-4">
                            <div className="flex items-center justify-center space-x-3">
                              <input
                                type="radio"
                                className="text-red-500 text-sm focus:ring-red-500 cursor-pointer"
                              />
                              <div>
                                <span className="font-semibold border-r pr-4">
                                  Lê Trung Nhân
                                </span>
                                <span>(+84) 353357781 </span>
                                <p>
                                  Cổng Sau Trường Đh Thể Dục Thể Thao Khu Phố 6,
                                  Phường Linh Trung, Thành Phố Thủ Đức, TP. Hồ
                                  Chí Minh
                                </p>
                                <span className=" text-xs border p-1 border-rose-500 text-red-600 ">
                                  Địa chỉ giao hàng
                                </span>
                              </div>
                            </div>
                            <div>
                              <span className="text-cyan-500">Cập nhật</span>
                            </div>
                          </div>
                          <div className="my-4 px-6">
                            <button
                              href="#_"
                              className="cursor-pointer rounded px-8 py-1 overflow-hidden group bg-white-300 relative hover:bg-gradient-to-r hover:from-gray-800 hover:to-white text-black hover:ring-2 hover:ring-offset-2 hover:ring-black transition-all ease-out duration-300 border border-black"
                            >
                              <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                              <div className="flex items-center justify-center space-x-2 text-white-600 hover:text-black">
                                <span className="text-2xl">+</span>
                                <span className="relative">
                                  Thêm địa chỉ mới
                                </span>
                              </div>
                            </button>
                          </div>

                          <div className="mt-4 flex justify-end space-x-2">
                            <button
                              type="button"
                              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                              onClick={closeModal}
                            >
                              Trở lại
                            </button>
                            <button
                              type="button"
                              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                              onClick={closeModal}
                            >
                              Áp dụng
                            </button>
                          </div>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
                </Dialog>
              </Transition> */}
            </>
          </div>
        </div>
      </section>
      {/* <form action="">
        <div className="">
          <div className="flex items-center justify-center h-96">
            <svg fill="none" viewBox="0 0 121 120" className="w-32 h-32">
              <path
                d="M16 79.5h19.5M43 57.5l-2 19"
                stroke="#BDBDBD"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M56.995 78.791v-.001L41.2 38.195c-2.305-5.916-2.371-12.709.44-18.236 1.576-3.095 4.06-6.058 7.977-8 5.061-2.5 11.038-2.58 16.272-.393 3.356 1.41 7 3.92 9.433 8.43v.002c2.837 5.248 2.755 11.853.602 17.603L60.503 78.766v.001c-.617 1.636-2.88 1.643-3.508.024Z"
                fill="#fff"
                stroke="#BDBDBD"
                stroke-width="2"
              ></path>
              <path
                d="m75.5 58.5 7 52.5M13 93h95.5M40.5 82.5 30.5 93 28 110.5"
                stroke="#BDBDBD"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M44.5 79.5c0 .55-.318 1.151-1.038 1.656-.717.502-1.761.844-2.962.844-1.2 0-2.245-.342-2.962-.844-.72-.505-1.038-1.105-1.038-1.656 0-.55.318-1.151 1.038-1.656.717-.502 1.761-.844 2.962-.844 1.2 0 2.245.342 2.962.844.72.505 1.038 1.105 1.038 1.656Z"
                stroke="#BDBDBD"
                stroke-width="2"
              ></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M48.333 68H18.5a1 1 0 1 0 0 2h30.667l-.834-2Zm20.5 2H102a1 1 0 0 0 0-2H69.667l-.834 2Z"
                fill="#BDBDBD"
              ></path>
              <path
                d="M82 73h20l3 16H84.5L82 73ZM34.5 97H76l1.5 13H33l1.5-13ZM20.5 58h18l-1 7h-18l1-7Z"
                fill="#E8E8E8"
              ></path>
              <path
                clip-rule="evenodd"
                d="M19.5 41a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM102.5 60a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
                stroke="#E8E8E8"
                stroke-width="2"
              ></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M93.5 22a1 1 0 0 0-1 1v3h-3a1 1 0 1 0 0 2h3v3a1 1 0 1 0 2 0v-3h3a1 1 0 1 0 0-2h-3v-3a1 1 0 0 0-1-1Z"
                fill="#E8E8E8"
              ></path>
              <circle
                cx="58.5"
                cy="27"
                r="7"
                stroke="#BDBDBD"
                stroke-width="2"
              ></circle>
            </svg>
          </div>
        </div>
      </form> */}
    </div>
  );
}
