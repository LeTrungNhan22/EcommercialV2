import React from "react";
import Chart from "../../components/chart/Chart";
import FeaturedInfor from "../../components/featuredInfor/FeaturedInfor";
import "./Home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/WidgetSmall/WidgetSm";
import WidgetLg from "../../components/WidgetLarge/WidgetLg";

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
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
