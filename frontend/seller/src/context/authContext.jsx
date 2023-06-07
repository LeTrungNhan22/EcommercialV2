import { createContext, useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { logout } from "../redux/auth/authSlice";
import { useHistory } from "react-router-dom";
import PageNotFound from "../components/pageNotFound/PageNotFound";

export const AuthContext = createContext({});
export const AuthContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const router = useHistory();

  if (typeof window !== "undefined") {
    var items = localStorage.getItem("user");
  }

  useEffect(() => {
    const user = localStorage.getItem("user");
    const parseUser = JSON.parse(user);
    if (user !== null && parseUser.shop !== null) {
      setIsLogin(true);
      setUser(parseUser);
    } else {
      setUser({});
    }
  }, [items]);
  //   logout context
  const logoutContext = async () => {
    setIsLogin(false);
    setUser({});
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.clear();
    dispatch(logout());
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
