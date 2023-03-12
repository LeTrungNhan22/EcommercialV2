import { createContext, useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { logout } from "../redux/auth/authSlice";

export const AuthContext = createContext({});
export const AuthContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();

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
  };

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
