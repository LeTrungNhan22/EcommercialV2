import {
  ChatBubbleOutline,
  DynamicFeed,
  LineStyle,
  MailOutline,
  Money,
  PermIdentity,
  Report,
  Storefront,
  Timeline,
  TrendingUp,
  WorkOutline,
} from "@mui/icons-material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.scss";

export default function Sidebar() {
  // return active class css when onclick sidebar
  const [active, setActive] = useState("home");

  const handleActive = (e) => {
    setActive(e.target.innerText.toLowerCase());
  };

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link
              to="/dashboard-seller"
              className="link"
              onClick={handleActive}
            >
              <li
                className={`sidebarListItem ${active === "home" ? "active" : null
                  } `}
              >
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>


          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link" onClick={handleActive}>
              <li
                className={`sidebarListItem ${active === "users" ? "active" : null
                  } `}
              >
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/products" className="link" onClick={handleActive}>
              <li
                className={`sidebarListItem ${active === "products" ? "active" : null
                  } `}
              >
                <Storefront className="sidebarIcon" />
                Products
              </li>
            </Link>
            <Link to="/orders" className="link" onClick={handleActive}>
              <li
                className={`sidebarListItem ${active === "orders" ? "active" : null
                  } `}
              >
                <Money className="sidebarIcon" />
                Orders
              </li>
            </Link>
          </ul>
        </div>
        {/* <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MailOutline className="sidebarIcon" />
              Mail
            </li>
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              FeedBack
            </li>
            <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Messages
            </li>
          </ul>
        </div> */}
        {/* <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <WorkOutline className="sidebarIcon" />
              Manager
            </li>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <Report className="sidebarIcon" />
              Report
            </li>
          </ul>
        </div> */}
      </div>
    </div>
  );
}
