import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { storage } from "../../firebase/initFirebase";
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
  } = useForm();
  const dispatch = useDispatch();
  const [addressList, setAddressList] = useState({});
  useEffect(() => {
    setAddressList(address);
  }, [address]);
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
    const storageRef = ref(storage, `shopImage/${id}/` + file.name);
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
  const submitHandler = async ({
    shopNameInput,
    emailInput,
    telephoneInput,
    descriptionInput,
  }) => {
    const data = {
      shopName: shopNameInput,
      email: emailInput === undefined ? email : emailInput,
      telephone: telephoneInput === undefined ? telephone : telephoneInput,
      description: descriptionInput,
      address: addressList,
      imageUrl:
        downloadURL === ""
          ? "https://firebasestorage.googleapis.com/v0/b/storageimageweb.appspot.com/o/common%2FcommonAnvatar.png?alt=media&token=ed5c9b52-4338-40ad-bd40-75359e99d379"
          : downloadURL,
    };
    console.log(data);
  };
  return (
    <>
      <Layout title={"Tạo kênh bán hàng"}>
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="bg-custome p-5 flex justify-center "
        >
          <div className="max-w-4xl w-full space-y-5 p-5 bg-white rounded-xl shadow-lg z-10 mx-auto mr-0 ">
            <div className="grid gap-8 grid-cols-1">
              <div className="flex flex-col ">
                <div className="flex flex-col sm:flex-row items-center">
                  <h2 className="font-semibold text-lg mr-auto">Shop info</h2>
                  <div className="w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0"></div>
                </div>
                <div className="mt-5">
                  <div className="form">
                    <div className="md:flex flex-row md:space-x-4 w-full text-md ">
                      <div className="mb-3 space-y-2 w-full text-md ">
                        <label className="font-semibold text-gray-600 py-2">
                          Tên shop <abbr title="required">*</abbr>
                        </label>
                        <input
                          {...register("shopNameInput", {
                            required: "Tên shop không được để trống",
                            minLength: 5,
                            maxLength: 20,
                          })}
                          placeholder="Tên shop"
                          className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                          type="text"
                          name="shopNameInput"
                          id="shopNameInput"
                        />
                        {errors?.shopNameInput?.type === "required" && (
                          <span className="text-red-500 text-sm">
                            {errors?.shopNameInput?.message}
                          </span>
                        )}
                        {errors?.shopNameInput?.type === "minLength" && (
                          <span className="text-red-500 text-sm">
                            Tên shop phải có ít nhất 5 ký tự
                          </span>
                        )}
                        {errors?.shopNameInput?.type === "minLength" && (
                          <span className="text-red-500 text-sm">
                            Tên shop không được quá 20 ký tự
                          </span>
                        )}
                      </div>
                    </div>

                    <div class="md:flex md:flex-col md:space-x-4 w-full text-md mb-6">
                      <label class="font-semibold text-gray-600 py-2">
                        Địa chỉ
                      </label>
                      <span className="text-base font-normal text-gray-600">
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
                    <div class="md:flex flex-row md:space-x-4 w-full text-md">
                      <div class="mb-3 space-y-2 w-full text-md">
                        <label class="font-semibold text-gray-600 py-2">
                          Email <abbr title="required">*</abbr>
                        </label>
                        <input
                          {...register("emailInput", {
                            required: email === null ? true : false,
                          })}
                          placeholder={email}
                          class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                          required="required"
                          type="text"
                          name="emailInput"
                          id="emailInput"
                          disabled
                        />
                      </div>
                      <div class="mb-3 space-y-2 w-full text-md">
                        <label class="font-semibold text-gray-600 py-2">
                          Số điện thoại <abbr title="required">*</abbr>
                        </label>
                        <input
                          {...register("telephoneInput", {
                            required: telephone === null ? true : false,
                          })}
                          placeholder={telephone}
                          class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                          type="text"
                          name="telephoneInput"
                          id="telephoneInput"
                          disabled
                        />
                        {errors?.telephone?.type === "required" && (
                          <span className="text-red-500 text-sm">
                            {errors?.telephone?.message}
                          </span>
                        )}
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
                    <div class="flex-auto w-full mb-1 text-md space-y-2">
                      <label class="font-semibold text-gray-600 py-2">
                        Mô tả
                      </label>
                      <textarea
                        {...register("descriptionInput", {
                          required: "Mô tả không được để trống",
                          minLength: 5,
                          maxLength: 200,
                        })}
                        name="descriptionInput"
                        id="descriptionInput"
                        className=" min-h-[100px] max-h-[300px] h-28 appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg  py-4 px-4"
                        placeholder="Ghi chú về shop của bạn"
                        spellCheck="false"
                      ></textarea>
                      {errors?.messageInput?.type === "required" && (
                        <span className="text-red-500 text-sm">
                          {errors?.messageInput?.message}
                        </span>
                      )}
                      {errors?.messageInput?.type === "minLength" && (
                        <span className="text-red-500 text-sm">
                          Mô tả phải có ít nhất 5 ký tự
                        </span>
                      )}
                      {errors?.messageInput?.type === "maxLength" && (
                        <span className="text-red-500 text-sm">
                          Mô tả không được quá 200 ký tự
                        </span>
                      )}
                    </div>

                    <div className="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse">
                      <button className="mb-2 md:mb-0 bg-green-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-500">
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/5 h-full space-y-5 p-6 bg-white rounded-xl shadow-lg z-10 mx-auto ml-3 ">
            <label className="text-md font-semibold text-gray-600 py-2">
              Ảnh đại diện
              <abbr className="hidden" title="required">
                *
              </abbr>
            </label>
            <div className="flex items-center flex-col">
              <div className="w-40 h-40 mr-4 flex-none rounded-xl border overflow-hidden">
                <img
                  className="w-40 h-40 mr-4 object-cover"
                  src={
                    selectedFile
                      ? URL.createObjectURL(selectedFile)
                      : "https://firebasestorage.googleapis.com/v0/b/storageimageweb.appspot.com/o/common%2FcommonAnvatar.png?alt=media&token=ed5c9b52-4338-40ad-bd40-75359e99d379"
                  }
                  alt="Avatar Upload"
                />
              </div>
            </div>
            <div className="text-sm">
              <div style={{ margin: "5px 0" }}>
                <progress
                  value={value}
                  max="100"
                  style={{ width: "100%" }}
                ></progress>
                <br />
                <input type="file" onChange={uploadFile} ref={inputEl} />
              </div>
            </div>
          </div>
        </form>
      </Layout>
    </>
  );
};

export default CreateShopPage;
