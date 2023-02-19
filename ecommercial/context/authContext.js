import { createContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { logout } from "../redux/auth/authSlice";

export const AuthContext = createContext({});
export const AuthContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      setIsLogin(true);
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, [localStorage.getItem("user")]);
  //   logout context
  const logoutContext = () => {
    dispatch(logout());
    setIsLogin(false);
    setUser({});
    toast.success("Logout success");
  };

  console.group("AuthContext");
  console.log({ user: user, isLogin: isLogin });
  console.groupEnd();

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
