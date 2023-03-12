import React, { useEffect, useState } from "react";
import Chart from "../../../components/chart/Chart";
import FeaturedInfor from "../../../components/featuredInfor/FeaturedInfor";
import "./Home.scss";
import { userData } from "../../../dummyData";
import WidgetSm from "../../../components/widgetSmall/WidgetSm";
import WidgetLg from "../../../components/widgetLarge/WidgetLg";

export default function Home() {

  return (
    
    <div className="home">
      <FeaturedInfor />
      <Chart
        data={userData}
        title="User Analytics"
        grid
        dataKey="Active User"
      />
      <div className="home__widgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
