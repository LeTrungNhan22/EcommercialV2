import React from "react";
import { ScaleLoader } from "react-spinners";
// scss
import "./LoadingPage.scss";

const LoadingPage = ({ loading }) => {

  return (
    <div className="loading-page">
      <ScaleLoader
        size={100} color={"#123abc"} loading={loading} />
    </div>
  );
};

export default LoadingPage;