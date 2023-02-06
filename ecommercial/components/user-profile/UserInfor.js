import axios from "axios";
import moment from "moment/moment";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { getError } from "../../utils/error";
import AuthContext from "../../utils/User";

const UserInforScreen = ({
  fullName,
  username,
  imageUrl,
  birthday,
  email,
  telephone,
  gender,
  id,
}) => {
  const convertDob = moment(birthday).format("YYYY-MM-DD");
  const [dobApi, setDobApi] = useState("");
  const [genderApi, setGenderApi] = useState("");

  useEffect(() => {
    setDobApi(convertDob);
    setGenderApi(gender);
  }, [convertDob, gender]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const handleDob = (e) => {
    const selectDob = e.target.value;
    setDobApi(selectDob);
  };
  const handleGender = (e) => {
    const selectGender = e.target.value;
    setGenderApi(selectGender);
  };

  const { updateUserProfile } = useContext(AuthContext);
  const submitHandler = async ({ email, fullName, telephone, gender }, e) => {
    var date = new Date(dobApi); // some mock date
    var dateMilliseconds = date.getTime();
    updateUserProfile({
      email,
      fullName,
      telephone,
      dob: dateMilliseconds,
      gender: genderApi,
    });
  };

  return (
    <div>
      <div className="col-span-9 shadow rounded px-6 pt-5 pb-7 mt-6 lg:mt-0">
        <form onSubmit={handleSubmit(submitHandler)}>
          <h3 className="text-lg font-medium capitalize mb-4">
            Thông tin tài khoản
          </h3>
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-gray-600 mb-2 block">username</label>
                <input
                  {...register("username", {})}
                  id="username"
                  name="username"
                  type="text"
                  className="input-box"
                  defaultValue={username}
                />
              </div>
              <div>
                <label className="text-gray-600 mb-2 block">Tên đầy đủ</label>
                <input
                  {...register("fullName", {
                    required: "fullName không thể trống",
                    pattern: {
                      message: "Vui lòng nhập fullName",
                    },
                  })}
                  id="fullName"
                  name="fullName"
                  type="text"
                  className="input-box"
                  defaultValue={fullName}
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-gray-600 mb-2 block">Birthday</label>
                <input
                  type="date"
                  onChange={(e) => handleDob(e)}
                  id="dob"
                  name="dob"
                  value={dobApi}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-gray-600 mb-2 block">Giới tính</label>
                <select
                  {...register("gender", {})}
                  value={genderApi === "MAN" ? "MAN" : "WOMEN"}
                  className="input-box"
                  onChange={(e) => handleGender(e)}
                >
                  <option value="MAN">Nam</option>
                  <option value="WOMEN">Nữ</option>
                </select>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-gray-600 mb-2 block">Email</label>
                <input
                  type="text"
                  {...register("email", {
                    required: "fullName không thể trống",
                    pattern: {
                      message: "Vui lòng nhập fullName",
                    },
                  })}
                  id="email"
                  name="email"
                  className="input-box"
                  defaultValue={email}
                />
              </div>
              <div>
                <label className="text-gray-600 mb-2 block">Phone Number</label>
                <input
                  {...register("telephone", {
                    required: "fullName không thể trống",
                    pattern: {
                      message: "Vui lòng nhập fullName",
                    },
                  })}
                  id="telephone"
                  name="telephone"
                  type="text"
                  className="input-box"
                  defaultValue={telephone}
                />
              </div>
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="px-6 py-2 text-center text-white bg-rose-600 border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
            >
              Thay đổi
            </button>
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
