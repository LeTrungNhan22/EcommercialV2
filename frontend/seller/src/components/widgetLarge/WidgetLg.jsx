import { Visibility } from "@mui/icons-material";
import React from "react";
import "./WidgetLg.css";

export default function WidgetLg() {
  const Button = ({ type }) => {
    return <button className={"widgetLargeButton " + type}>{type}</button>;
  };

  return (
    <div className="widgetLg">
      <h3 className="widgetLargeTitle">Latest Transactions</h3>
      <table className="widgetLargeTable">
        <tbody>
          <tr className="widgetLargeTr">
            <th className="widgetLargeTh">Customer</th>
            <th className="widgetLargeTh">Date</th>
            <th className="widgetLargeTh">Amount</th>
            <th className="widgetLargeTh">Status</th>
          </tr>
        </tbody>
        <tbody>
          <tr className="widgetLargeTr">
            <td className="widgetLargeUser">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/instagram-rn-aa052.appspot.com/o/user.png?alt=media&token=f0f5c13b-ee34-4d16-9972-6c59e4f60f3e"
                alt=""
                className="widgetLargeImg"
              />
              <span className="widgetLargeName">Anna Keller</span>
            </td>
            <td className="widgetLargeDate">2 Jun 2021</td>
            <td className="widgetLargeAmount">$122.00</td>
            <td className="widgetLargeStatus">
              <Button type="Approved" />
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr className="widgetLargeTr">
            <td className="widgetLargeUser">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/instagram-rn-aa052.appspot.com/o/user.png?alt=media&token=f0f5c13b-ee34-4d16-9972-6c59e4f60f3e"
                alt=""
                className="widgetLargeImg"
              />
              <span className="widgetLargeName">Anna Keller</span>
            </td>
            <td className="widgetLargeDate">2 Jun 2021</td>
            <td className="widgetLargeAmount">$122.00</td>
            <td className="widgetLargeStatus">
              <Button type="Declined" />
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr className="widgetLargeTr">
            <td className="widgetLargeUser">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/instagram-rn-aa052.appspot.com/o/user.png?alt=media&token=f0f5c13b-ee34-4d16-9972-6c59e4f60f3e"
                alt=""
                className="widgetLargeImg"
              />
              <span className="widgetLargeName">Anna Keller</span>
            </td>
            <td className="widgetLargeDate">2 Jun 2021</td>
            <td className="widgetLargeAmount">$122.00</td>
            <td className="widgetLargeStatus">
              <Button type="Pending" />
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr className="widgetLargeTr">
            <td className="widgetLargeUser">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/instagram-rn-aa052.appspot.com/o/user.png?alt=media&token=f0f5c13b-ee34-4d16-9972-6c59e4f60f3e"
                alt=""
                className="widgetLargeImg"
              />
              <span className="widgetLargeName">Anna Keller</span>
            </td>
            <td className="widgetLargeDate">2 Jun 2021</td>
            <td className="widgetLargeAmount">$122.00</td>
            <td className="widgetLargeStatus">
              <Button type="Approved" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
