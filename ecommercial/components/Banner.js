import Image from "next/image";
import React from "react";
import banner from "../assets/home/home-banner.png";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
  return (
    <div>
      <div className="shadow-md h-[400px]">
        <Image src={banner} alt="" objectFit="cover" />
      </div>
      <div className="absolute top-[17%]  w-full flex items-center justify-center">
        <div className="flex space-x-2  w-[1200px]">
          <div className="w-2/3 shadow-md flex items-start bg-gray-100  cursor-pointer rounded-lg">
            <Carousel
              autoPlay
              infiniteLoop
              showStatus={false}
              showIndicators={false}
              showThumbs={false}
              interval={2000}
            >
              <div>
                <Image
                  src="https://cf.shopee.vn/file/b976bfe5c97a9d332f3fb871ebf04168_xxhdpi"
                  alt=""
                  loading="lazy"
                  width={800}
                  height={300}
                  className="object-contain object-center"
                ></Image>
              </div>
              <div>
                <Image
                  src="https://cf.shopee.vn/file/599c86160548b403d24be423bc2f132e_xxhdpi"
                  alt=""
                  loading="lazy"
                  width={800}
                  height={300}
                  className="object-contain object-center"
                ></Image>
              </div>
              <div>
                <Image
                  src="https://cf.shopee.vn/file/0481e5df1e159abe1db8b3549aa24ce1_xxhdpi"
                  alt=""
                  loading="lazy"
                  width={800}
                  height={300}
                  className="object-contain object-center"
                ></Image>
              </div>
              <div>
                <Image
                  src="https://cf.shopee.vn/file/4cb8330ad65416cee5ddcce6795d7de0_xxhdpi"
                  alt=""
                  loading="lazy"
                  width={800}
                  height={300}
                  className="object-contain object-center"
                ></Image>
              </div>
              <div>
                <Image
                  src="https://cf.shopee.vn/file/29fca44bafa911605e9171a74d536375_xxhdpi"
                  alt=""
                  loading="lazy"
                  width={800}
                  height={300}
                  className="object-contain object-center"
                ></Image>
              </div>
            </Carousel>
          </div>

          <div className="h-full w-1/3 flex flex-col justify-center items-center space-y-2">
            <div className=" h-1/2 flex shadow-md cursor-pointer rounded-lg ">
              <Image
                src="https://cf.shopee.vn/file/3dfc46aabbdfdd867b498d66a3bf8e2a_xhdpi"
                alt=""
                width={400}
                height={150}
                className="object-fill object-center rounded-lg "
              ></Image>
            </div>
            <div className="h-1/2 flex shadow-md cursor-pointer rounded-lg  ">
              <Image
                src="https://cf.shopee.vn/file/c1df8543bf46a1b35e4066a3025618d5_xhdpi"
                alt=""
                width={400}
                height={150}
                className="object-fill object-center rounded-lg "
              ></Image>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
