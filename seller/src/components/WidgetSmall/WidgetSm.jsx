import { Visibility } from "@mui/icons-material";
import React from "react";
import "./WidgetSm.css";

export default function WidgetSm() {
  return (
    <div className="widgetSm">
      <span className="widgetSmallTitle">New User</span>
      <ul className="widgetSmallList">
        <li className="widgetSmallListItem">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/instagram-rn-aa052.appspot.com/o/user.png?alt=media&token=f0f5c13b-ee34-4d16-9972-6c59e4f60f3e"
            alt=""
            className="widgetSmallImg"
          />
          <div className="widgetSmallUser">
            <span className="widgetSmallUsername">Anna Keller</span>
            <span className="widgetSmallUserTitle">Software Engineer</span>
          </div>
          <button className="widgetSmallButton">
            <Visibility className="widgetSmallIcon" />
            Display
          </button>
        </li>
        <li className="widgetSmallListItem">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/instagram-rn-aa052.appspot.com/o/user.png?alt=media&token=f0f5c13b-ee34-4d16-9972-6c59e4f60f3e"
            alt=""
            className="widgetSmallImg"
          />
          <div className="widgetSmallUser">
            <span className="widgetSmallUsername">Anna Keller</span>
            <span className="widgetSmallUserTitle">Software Engineer</span>
          </div>
          <button className="widgetSmallButton">
            <Visibility className="widgetSmallIcon" />
            Display
          </button>
        </li>{" "}
        <li className="widgetSmallListItem">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/instagram-rn-aa052.appspot.com/o/user.png?alt=media&token=f0f5c13b-ee34-4d16-9972-6c59e4f60f3e"
            alt=""
            className="widgetSmallImg"
          />
          <div className="widgetSmallUser">
            <span className="widgetSmallUsername">Anna Keller</span>
            <span className="widgetSmallUserTitle">Software Engineer</span>
          </div>
          <button className="widgetSmallButton">
            <Visibility className="widgetSmallIcon" />
            Display
          </button>
        </li>{" "}
        <li className="widgetSmallListItem">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/instagram-rn-aa052.appspot.com/o/user.png?alt=media&token=f0f5c13b-ee34-4d16-9972-6c59e4f60f3e"
            alt=""
            className="widgetSmallImg"
          />
          <div className="widgetSmallUser">
            <span className="widgetSmallUsername">Anna Keller</span>
            <span className="widgetSmallUserTitle">Software Engineer</span>
          </div>
          <button className="widgetSmallButton">
            <Visibility className="widgetSmallIcon" />
            Display
          </button>
        </li>
      </ul>
    </div>
  );
}
