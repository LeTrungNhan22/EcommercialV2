import {
  LanguageOutlined, NotificationsOutlined,
  SettingsOutlined
} from "@mui/icons-material";
import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/authContext";
import AccountMenu from "./AccountMenu";
import "./Topbar.scss";

export default function Topbar() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        document.getElementById("topbar").classList.add("floatingNav");
      } else {
        document.getElementById("topbar").classList.remove("floatingNav");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div  id="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Seller Admin</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsOutlined />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <LanguageOutlined />
          </div>
          <AccountMenu accountImage={user?.shop?.imageUrl} />
        </div>
      </div>
    </div>
  );
}
