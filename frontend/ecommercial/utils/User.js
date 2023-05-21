import { createContext, useEffect, useReducer, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { getError } from "./error";
import { useRouter } from "next/router";
import moment from "moment";
import { auth } from "../firebase/initFirebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

export const AuthContext = createContext({
  user: {},
  logout: () => {},
  login: () => {},
  updateUserProfile: () => {},
  createUserShop: () => {},
  updateUserAddress: () => {},
  loginGoogle: () => {},
  getCartDetailById: () => {},
});
export const AuthContextProvider = ({ children }) => {
  const axios = require("axios");
  const basUrl = process.env.NEXT_PUBLIC_API_URL;
  const [user, setUser] = useState({});
  const [userById, setUserById] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();
  const [addressFetching, setAddressFetching] = useState({});
  const [shopData, setShopData] = useState({});
  const base64 = require("base-64");

  // loginGoogle
  const [googleUser, setGoogleUser] = useAuthState(auth);
  const googleAuth = new GoogleAuthProvider();

  const loginGoogle = async () => {
    const result = await signInWithPopup(auth, googleAuth);
    axios
      .post(`${basUrl}/user/1.0.0/login/customer`, null, {
        params: {
          email: googleUser?.providerData[0].email,
          password: base64.encode(1111111),
          "full-name": googleUser?.providerData[0].displayName,
          image: googleUser?.providerData[0].photoURL,
          "service-type": "GOOGLE",
        },
      })
      .then(
        function (result) {
          if (result.data.status == "success") {
            toast.success("Đăng nhập thành công");
            setIsLogin(true);
            router.push("/");
          } else {
            setIsLogin(false);
            toast.error(
              "Đăng nhập không thành công tài khoản hoặc mật khẩu không chính xác"
            );
          }
        },
        (error) => {
          setIsLogin(false);
          console.log(getError(error));
        }
      );
  };

  // tạo shop
  const createUserShop = async ({
    address,
    description,
    district_id,
    imageUrl,
    name,
    phone,
    wardCode,
  }) => {
    if (isLogin == true) {
      try {
        await axios
          .post(`${basUrl}/user/1.0.0/shop/create?user-id=${user.id}`, {
            address: address,
            description: description,
            district_id: district_id,
            imageUrl: imageUrl,
            name: name,
            phone: phone,
            status: "ACTIVE",
            wardCode: wardCode,
          })
          .then(function (response) {
            if (response.status == 200) {
              const { data } = response;
              console.log(response);
              setShopData(data);
              toast.success("Tạo shop thành công");
              router.push("/");
            }
          })
          .catch(function (error) {
            console.error(getError(error));
          });
      } catch (error) {
        console.log(getError);
      }
    }
  };

  const updateUserAddress = async ({
    district,
    districtCode,
    province,
    provinceCode,
    ward,
    wardCode,
    subAddress,
  }) => {
    if (isLogin == true) {
      try {
        await axios
          .put(`${basUrl}/user/1.0.0/user/${user.id}/info-address`, {
            address1:
              ward.toString() +
              ", " +
              district.toString() +
              ", " +
              province.toString() +
              "" +
              "(" +
              subAddress.toString() +
              ")",
            district: district,
            districtCode: districtCode,
            province: province,
            provinceCode: provinceCode,
            ward: ward,
            wardCode: wardCode,
          })
          .then(function (response) {
            if (response.status == 200) {
              const { data } = response;
              setAddressFetching(data.address);
              toast.success("Thay đổi địa chỉ thành công");
            }
          })
          .catch(function (error) {
            console.error(getError(error));
          });
      } catch (error) {
        console.log(getError(error));
        toast.error("có lỗi trong quá trình xử lý");
      }
    }
  };

  const updateUserProfile = async ({
    email,
    fullName,
    telephone,
    dob,
    gender,
  }) => {
    if (localStorage.getItem("userToken") != null) {
      try {
        await axios
          .put(`${basUrl}/user/1.0.0/user/${user.id}/info-basic`, {
            email: email,
            fullName: fullName,
            telephone: telephone,
            birthday: dob,
            gender: gender,
          })
          .then(function (response) {
            if (response.status == 200) {
              const { data } = response;
              console.log(data);
              toast.success("Thay đổi địa chỉ thành công");
            }
          })
          .catch(function (error) {
            console.error(getError(error));
          });
      } catch (error) {
        console.log(getError(error));
        toast.error("có lỗi trong quá trình xử lý");
      }
    }
  };

  const logout = () => {
    auth.signOut();
    localStorage.removeItem("userToken");
    setIsLogin(false);
    setUser({});
    toast.error("Đăng xuất thành công");
    router.push("/");
  };

  const login = async ({ email, password }) => {
    try {
      await axios
        .post(`${basUrl}/user/1.0.0/login/customer`, null, {
          params: {
            email: email,
            password: base64.encode(password),
            "full-name": "null",
            image: "null",
            "service-type": "NORMALLY",
          },
        })
        .then(
          function (result) {
            if (result.data.status == "success") {
              localStorage.setItem("userToken", result.data.data);
              setIsLogin(true);
              toast.success("Đăng nhập thành công");
              router.push("/");
            } else {
              setIsLogin(false);
              toast.error(
                "Đăng nhập không thành công tài khoản hoặc mật khẩu không chính xác"
              );
            }
          },
          (error) => {
            setIsLogin(false);
            console.log(getError(error));
          }
        );
    } catch (error) {
      console.log(getError(error));
    }
  };
  useEffect(() => {
    const getUserProfile = async () => {
      if (localStorage.getItem("userToken") != null) {
        try {
          await axios
            .get(`${basUrl}/user/1.0.0/login/info`, {
              params: {
                "code-token": localStorage.getItem("userToken"),
                "service-type": "NORMALLY",
              },
              headers: {
                "X-RapidAPI-Key": "your-rapidapi-key",
                "X-RapidAPI-Host":
                  "body-mass-index-bmi-calculator.p.rapidapi.com",
              },
            })
            .then(function (response) {
              const { data } = response;
              setUser(data);
              setIsLogin(true);
            })
            .catch(function (error) {
              console.error(getError(error));
            });
        } catch (error) {
          console.log(getError(error));
        }
      }
    };

    getUserProfile();
  }, [isLogin]);
  useEffect(() => {
    const getUserProfileById = async () => {
      if (isLogin == true) {
        try {
          await axios
            .get(`${basUrl}/user/1.0.0/user/${user.id}`)
            .then(function (response) {
              const { data } = response;
              setUserById(data);
            })
            .catch(function (error) {
              console.error(getError(error));
            });
        } catch (error) {
          console.log(getError(error));
        }
      }
    };
    getUserProfileById();
  }, [axios, user.id]);
  useEffect(() => {
    const getCartDetailById = async () => {
      if (isLogin == true) {
        try {
          await axios
            .get(`${basUrl}/cart/1.0.0/cart/${user.id}/detail`)
            .then(function (response) {
              const { data } = response;
              localStorage.setItem("cartDetail", JSON.stringify(data));
            })
            .catch(function (error) {
              console.error(getError(error));
            });
        } catch (error) {
          console.log(getError(error));
        }
      }
    };
    getCartDetailById();
  }, [isLogin, user.id]);

  const context = {
    user,
    userById,
    logout,
    isLogin,
    login,
    updateUserProfile,
    updateUserAddress,
    createUserShop,
    addressFetching,
    loginGoogle,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;

export function getStaticProps() {
  return {
    props: {},
  };
}
