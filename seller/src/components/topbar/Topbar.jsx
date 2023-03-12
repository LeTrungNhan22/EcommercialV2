import {
  LanguageOutlined,
  NotificationAddRounded,
  NotificationImportantOutlined,
  Notifications,
  NotificationsOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import React, { useContext } from "react";
import AuthContext from "../../context/authContext";
import "./Topbar.scss";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  return (
    <div className="topbar">
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
          <div className="topbarIconContainer">
            <SettingsOutlined />
          </div>
          <img
            src={user?.shop?.imageUrl}
            alt=""
            className="topAvatar"
          />
        </div>
      </div>
    </div>
  );
}
