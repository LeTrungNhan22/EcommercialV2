import { Router, useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { logout } from "../redux/auth/authSlice";

export const AuthContext = createContext({});
export const AuthContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const router = useRouter();
  if (typeof window !== "undefined") {
    var items = localStorage.getItem("user");
  }

  useEffect(() => {
    const user = localStorage.getItem("user");
    const parseUser = JSON.parse(user);
    if (user !== null) {
      setIsLogin(true);
      setUser(parseUser);
    }
  }, [items]);
  //   logout context
  const logoutContext = () => {
    dispatch(logout());
    setIsLogin(false);
    setUser({});
    toast.success("Logout success");
    router.push("/").then(() => window.location.reload());
  };

  // console.group("AuthContext");
  // console.log({ user: user, isLogin: isLogin });
  // console.groupEnd();

  const context = {
    isLogin,
    logoutContext,
    user,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
