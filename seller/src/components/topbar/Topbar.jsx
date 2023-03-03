import {
  LanguageOutlined,
  NotificationAddRounded,
  NotificationImportantOutlined,
  Notifications,
  NotificationsOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import React from "react";
import "./Topbar.scss";

export default function Topbar() {
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
            src="https://firebasestorage.googleapis.com/v0/b/instagram-rn-aa052.appspot.com/o/user.png?alt=media&token=f0f5c13b-ee34-4d16-9972-6c59e4f60f3e"
            alt=""
            className="topAvatar"
          />
        </div>
      </div>
    </div>
  );
}
