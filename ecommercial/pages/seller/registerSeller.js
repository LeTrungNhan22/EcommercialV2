import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { FaShopify } from "react-icons/fa";
import AuthContext from "../../utils/User";
import { Dialog, Transition } from "@headlessui/react";
import { GrLocation } from "react-icons/gr";
import axios from "axios";
import { getError } from "../../utils/error";
import Image from "next/image";
import Footer from "../../components/common/Footer";
import { storage } from "../../firebase/initFirebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { toast } from "react-hot-toast";

const RegisterSellerScreen = () => {
  const basUrl = process.env.NEXT_PUBLIC_API_URL;
  const { user } = useContext(AuthContext);

  const { fullName, telephone, address, email } = user;
  const [provinceList, setProvinceList] = useState([]);
  const [provinceId, setProvinceId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [districtList, setDistrictList] = useState([]);
  const [wardList, setWardList] = useState([]);
  const [address1, setAddress1] = useState({});
  const [isFillAddress, setIsFillAddress] = useState(false);

  // handle image

  const [downloadURL, setDownloadURL] = useState("");
  // console.log(downloadURL);
  const inputEl = useRef(null);
  let [value, setValue] = useState(0);
  const [selectedFile, setSelectedFile] = useState();

  const [checkFile, setCheckFile] = useState(false);
  function uploadFile() {
    // get file
    var file = inputEl.current.files[0];
    setSelectedFile(file);
    setCheckFile(true);
    console.log(file);
    // create a storage ref
    const storageRef = ref(storage, "user_uploads/" + file.name);
    // upload file
    const task = uploadBytesResumable(storageRef, file);
    // update progress bar
    task.on(
      "state_change",
      function progress(snapshot) {
        setValue((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      function error(err) {
        console.log(getError(err));
      },
      () => {
        getDownloadURL(task.snapshot.ref).then((url) => {
          setDownloadURL(url);
        });
      },

      function complete() {
        toast.success("Uploaded to firebase storage successfully!");
      }
    );
  }
  // handle image
  // pop up voucher
  const [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }
  // pop up voucher
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandlerAddress1 = (
    { district, province, ward, subAddress },
    e
  ) => {
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
    closeModal();
  };
  const submitHandleCreateShop = ({ note, shopName }, e) => {
    e.preventDefault();
  };

  return (
    <>
      <Head>
        <title>Đăng ký người bán</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon " href="/favicon.ico" />
      </Head>
      <header className="p-5 sticky z-50 top-0 bg-white md:px-10 shadow-md grid grid-cols-1">
        <div className="flex items-center justify-between w-full">
          <div>
            <h3 className="text-3xl font-semibold">Đăng ký kênh người bán</h3>
            <Link href="/">
              <a className="text-red-700 italic">Trang chủ</a>
            </Link>
          </div>

          <p>Bạn cần hỗ trợ?</p>
        </div>
      </header>
      <div className="min h-screen bg-gray-300 ">
        <div className="pt-3 w-[1200px] mx-auto">
          <div className="col-span-9 bg-white mx-3 shadow rounded px-6 pt-6 pb-7  ">
            <form onSubmit={handleSubmit(submitHandleCreateShop)}>
              <h3 className="text-lg font-medium  mb-4">
                Điền thông tin để đăng ký
              </h3>
              <div className="space-y-4 w-[1000px] h-full mx-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="grid sm:grid-cols-1 gap-4">
                      <div>
                        <label className="text-gray-600 mb-2 block">
                          Tên shop
                        </label>
                        <input
                          {...register("shopName", {
                            required: "shopName không thể trống",
                            pattern: {
                              message: "shopName phải có hơn 6 kí tự",
                            },
                          })}
                          id="shopName"
                          name="shopName"
                          type="text"
                          className="input-box"
                        />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-gray-600 mb-2 block">
                            Email
                          </label>
                          <input
                            type="text"
                            placeholder={email}
                            id="email"
                            name="email"
                            className="input-box"
                          />
                        </div>
                        <div>
                          <label className="text-gray-600 mb-2 block">
                            Số điện thoại
                          </label>
                          <input
                            id="telephone"
                            name="telephone"
                            type="text"
                            className="input-box"
                            placeholder={telephone}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="w-[130px] h-[130px] relative">
                      <Image
                        src={
                          selectedFile
                            ? URL.createObjectURL(selectedFile)
                            : "https://firebasestorage.googleapis.com/v0/b/src-ecomer.appspot.com/o/Avatar%20copy.png?alt=media&token=cde526cc-e27b-4f55-b1e2-2cf874c4550a"
                        }
                        alt=""
                        layout="fill"
                        className="rounded-full"
                      ></Image>
                    </div>
                    <div>
                      <div style={{ margin: "5px 0" }}>
                        <progress
                          value={value}
                          max="100"
                          style={{ width: "100%" }}
                        ></progress>
                        <br />
                        <input
                          type="file"
                          onChange={uploadFile}
                          ref={inputEl}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className=" flex text-xs items-center space-x-3 text-amber-500">
                    <GrLocation className="text-amber-500" />
                    <h3>Địa chỉ nhận hàng</h3>
                  </div>

                  <div className="grid grid-cols-4 mx-auto items-end px-2 pb-6">
                    <div className=" flex flex-col">
                      <span>{fullName}</span>
                      <span className="font-bold">{telephone}</span>
                      <div className="col-span-1">
                        <p>{address1?.address1}</p>
                      </div>
                    </div>

                    <div className="mx-7 bottom-0">
                      <>
                        <button
                          type="button"
                          onClick={openModal}
                          className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-rose-600 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                        >
                          Thay đổi địa chỉ
                        </button>

                        <Transition appear show={isOpen} as={Fragment}>
                          <Dialog
                            as="div"
                            className="relative z-10"
                            onClose={closeModal}
                          >
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
                              <form className="flex min-h-full items-center justify-center p-4 text-center">
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
                                          />
                                          <input
                                            id="telephone"
                                            name="telephone"
                                            type="text"
                                            placeholder="Số điện thoại"
                                            className="px-4 py-2 w-80 rounded"
                                            defaultValue={telephone}
                                          />
                                        </div>

                                        <div className="mt-3">
                                          <div className="flex space-x-2">
                                            <select
                                              {...register("province", {
                                                required:
                                                  "province không thể trống",
                                                pattern: {
                                                  message:
                                                    "Vui lòng nhập province",
                                                },
                                              })}
                                              onChange={(e) =>
                                                handleProvince(e)
                                              }
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
                                                required:
                                                  "district không thể trống",
                                                pattern: {
                                                  message:
                                                    "Vui lòng nhập district",
                                                },
                                              })}
                                              onChange={(e) =>
                                                handleDistrict(e)
                                              }
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
                                                required:
                                                  "ward không thể trống",
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
                                                <option
                                                  key={ward.id}
                                                  value={ward?.ghn_id}
                                                >
                                                  {ward.name}
                                                </option>
                                              ))}
                                            </select>
                                          </div>
                                        </div>
                                        <input
                                          {...register("subAddress", {
                                            required:
                                              "Địa chỉ cụ thể không thể trống",
                                            pattern: {
                                              message:
                                                "Địa chỉ cụ thể phải có hơn 6 kí tự",
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
                                            onClick={handleSubmit(
                                              submitHandlerAddress1
                                            )}
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
                    <div className="col-span-2">
                      <div className="flex justify-center">
                        <div className="mb-3 xl:w-96">
                          <label
                            htmlFor="exampleFormControlTextarea1"
                            className="form-label inline-block mb-2 text-gray-700"
                          >
                            Ghi chú
                          </label>
                          <textarea
                            {...register("note", {
                              required: "ghi chú không thể trống",
                              pattern: {
                                message: "ghi chú phải có hơn 6 kí tự",
                              },
                            })}
                            className="
                                form-control
                                block
                                w-full
                                px-3
                                py-1.5
                                text-base
                                font-normal
                                text-gray-700
                                bg-white bg-clip-padding
                                border border-solid border-gray-300
                                rounded
                                transition
                                ease-in-out
                                m-0
                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                              "
                            id="exampleFormControlTextarea1"
                            rows="3"
                            placeholder="Your message"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <button className="w-1/4 cursor-pointer rounded px-3 py-2 overflow-hidden group bg-white-300 relative hover:bg-gradient-to-r hover:from-gray-800 hover:to-white text-black hover:ring-2 hover:ring-offset-2 hover:ring-black transition-all ease-out duration-300 border border-black">
                    <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                    <div className="flex items-center space-x-2 text-white-600 hover:text-black">
                      <FaShopify />
                      <span className="relative">Đăng ký</span>
                    </div>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RegisterSellerScreen;
