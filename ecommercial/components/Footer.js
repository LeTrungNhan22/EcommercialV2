import Image from "next/image";
import React from "react";

const footerLinks = [
  {
    title: "Get to Know Us",
    list: ["About Amazon", "Connect with Us", "Amazon Cares", "Gift a Smile"],
  },
  {
    title: "Make Money with Us",
    list: [
      "Sell products on Amazon",
      "Sell apps on Amazon",
      "Become an Affiliate",
      "Advertise Your Products",
      "Self-Publish with Us",
      "Host an Amazon Hub",
      "› See More",
    ],
  },
  {
    title: "Amazon Payment",
    list: [
      "Amazon Business Card",
      "Shop with Points",
      "Reload Your Balance",
      "Amazon Currency Converter",
    ],
  },
  {
    title: "Let Us Help You",
    list: [
      "Amazon and COVID-19",
      "Shipping Rates & Policies",
      "Returns & Replacements",
      "Manage Your Devices",
      "Amazon Assistant",
    ],
  },
];
const Footer = () => {
  return (
    <div className=" bg-gray-400 flex flex-col flex-nowrap items-center w-full pt-10">
      <div className="px-3 md:px-10 max-w-screen-2xl mx-0 my-auto w-full">
        <div className="text-md bg-[#1a1a2c] text-white px-4 py-5 ">
          <strong>Disclaimer: </strong> This is not the official website. It is
          a redesign, built purely for educational purpose.
        </div>
        <div className=" flex-col md:flex-row flex lg:p-12 items-start justify-between">
          {footerLinks.map((link, index) => (
            <div className="mr-12 w-full py-3 " key={index}>
              <h6 className="font-bold mb-2">{link.title}</h6>
              <ul>
                {link.list.map((item, index) => (
                  <li className="text-sm text-gray-200/80" key={index}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="px-8 py-12 flex items-center bg-[#eaeaea] border border-[rgba(26, 26, 44, 0.05)]">
          <span className="text-sm whitespace-nowrap opacity-75">
            &copy; 2022 | Developed by{" "}
            <a
              href="#"
              className="color-[#f90] leading-5 transition border-b border-dotted-[#f90] hover:text-[#dc143c] hover:border-dotted-[#dc143c]"
            >
              letrungnhan
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};
export default Footer;
