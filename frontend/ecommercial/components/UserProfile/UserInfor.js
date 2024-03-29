import React, { useContext, useEffect, useState } from "react";

import "react-datepicker/dist/react-datepicker.css";
import { set, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfoById, updateInfoBasic } from "../../redux/auth/authSlice";
import { formatDate } from "../../utils/formatDate";
import LanguageContext from "../../context/languageContext";

const UserInforScreen = ({
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
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const submitHandler = async ({
    emailInput,
    fullNameInput,
    telephoneInput,
    genderInput,
    usernameInput,
    birthdayInput,
  }) => {
    setLoading(true);
    const data = {
      email: emailInput === "" ? email : emailInput,
      fullName: fullNameInput === "" ? fullName : fullNameInput,
      telephone: telephoneInput === "" ? telephone : telephoneInput,
      gender:
        getValues("genderInput") === "" ? gender : getValues("genderInput"),
      username: usernameInput === "" ? username : usernameInput,
      birthday: birthdayInput === "" ? birthday : birthdayInput,
    };
    const userId = id;
    const response = await dispatch(updateInfoBasic({ userId, data }));
    const getUserById = await dispatch(getUserInfoById({ userId }));
    getUserById && setLoading(false);
  };
  const [genderCurrent, setGenderCurrent] = useState(gender || "");

  const { languageData } = useContext(LanguageContext);
  const {
    info_personal_infor,
    info_name,
    info_birthday,
    info_gender,
    info_telephone,
    info_update_information,
    info_gender_option
  } = languageData;

  useEffect(() => {
    if (gender !== undefined && gender !== "") {
      setGenderCurrent(gender);
    }
    if (gender) {
      setValue("genderInput", gender);
    }
  }, [gender, setValue]);

  return (
    <div className="bg-white rounded-md">
      <div className="col-span-9 shadow rounded px-6 pt-5 pb-7 mt-6 lg:mt-0">
        <form onSubmit={handleSubmit(submitHandler)}>
          <h3 className="block text-gray-700 text-2xl font-bold mt-3 mb-2">
            {info_personal_infor}
          </h3>
          <div className="">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mt-3 mb-2">
                  Username
                </label>
                <input
                  id="usernameInput"
                  defaultValue={username}
                  {...register("usernameInput", {
                    maxLength: 20,
                    required: username === "" ? true : false,
                  })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                />
                {errors?.usernameInput?.type === "required" && (
                  <p className="text-red-500">Vui lòng nhập tên người dùng</p>
                )}
                {errors?.usernameInput?.type === "maxLength" && (
                  <p className="text-red-500">Username không quá 20 ký tự</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mt-3 mb-2">
                  {info_name}
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  id="fullNameInput"
                  defaultValue={fullName}
                  {...register("fullNameInput", {
                    required: fullName === "" ? true : false,
                    pattern: /^[A-Za-z\\^\u00C0-\u1EF9. '-]+$/i,
                  })}
                />
                {errors?.fullNameInput?.type === "pattern" && (
                  <p className="text-red-500">Họ và tên không thể có số</p>
                )}
                {errors?.fullNameInput?.type === "required" && (
                  <p className="text-red-500">Họ và tên không thể trống</p>
                )}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mt-3 mb-2">
                  {info_birthday}
                </label>
                <input
                  className="shadow  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="date"
                  id="birthdayInput"
                  defaultValue={
                    formatDate(birthday) === "NaN-NaN-NaN"
                      ? ""
                      : formatDate(birthday)
                  }
                  {...register("birthdayInput", {
                    required: birthday === "" ? true : false,
                  })}
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mt-3 mb-2">
                  {info_gender}
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="genderInput"
                  id="genderInput"
                  {...register("genderInput", {
                    required: "Hãy chọn giới tính",
                  })}
                >
                  <option value="">{info_gender_option}</option>
                  <option value="MAN">Nam</option>
                  <option value="WOMEN">Nữ</option>
                  <option value="OTHER">Khác</option>
                </select>
                {errors?.genderInput?.message && (
                  <p className="text-red-500">{errors.genderInput.message}</p>
                )}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mt-3 mb-2">
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="email"
                  id="emailInput"

                  disabled
                  placeholder="example@gmail.com"
                  defaultValue={email}
                  {...register("emailInput", {
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    required: email === "" ? true : false,
                  })}
                />
                {errors?.emailInput?.type === "pattern" && (
                  <p className="text-red-500">Vui lòng nhập email hợp lệ</p>
                )}
                {errors?.emailInput?.type === "required" && (
                  <p className="text-red-500">Email không thể trống</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mt-3 mb-2">
                  {info_telephone}
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="number"
                  id="telephoneInput"
                  defaultValue={telephone}
                  {...register("telephoneInput", {
                    minLength: 8,
                    required: telephone === "" ? true : false,
                  })}
                />
                {errors?.telephoneInput?.type === "minLength" && (
                  <p className="text-red-500">
                    Số điện thoại phải có ít nhất 8 số
                  </p>
                )}
                {errors?.telephoneInput?.type === "required" && (
                  <p className="text-red-500">Vui lòng nhập số điện thoại</p>
                )}
              </div>
            </div>
          </div>
          <div className="mt-6">
            {loading ? (
              <button type="button"
                disabled
                className="inline-flex w-1/4 mt-3  items-center px-4 py-2 text-sm font-semibold leading-6 text-white transition duration-150 ease-in-out bg-indigo-500 rounded-md shadow cursor-not-allowed hover:bg-indigo-400"
              >
                <svg class="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                  </path>
                </svg>
                Loading...
              </button>
            ) : (<button
              type="submit"
              className="w-1/4 bg-gradient-to-r
               from-indigo-500 via-purple-500
                to-pink-500 cursor-pointer 
                hover:bg-purple-600
                 text-white font-bold
                  py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-3"
            >
              {info_update_information}
            </button>)}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserInforScreen;
export function getStaticProps() {
  return {
    props: {},
  };
}
