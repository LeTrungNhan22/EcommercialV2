import Image from "next/image";
import React from "react";

const SmallCard = ({ img, serviceName }) => {
  return (
    <div
      className="flex items-center m-2 mt-5 space-x-4 rounded-xl cursor-pointer
    hover:bg-red-100 hover:scale-105 transition duration-200 ease-out 
    "
    >
      <div className="relative h-16 w-16 flex items-center justify-center">
        <Image
          src={img}
          alt="service"
          height={50}
          width={50}
          loading="lazy"
          className="rounded-md"
        />
      </div>
      <div>
        <h2 className="font-bold text-sm ">{serviceName}</h2>
      </div>
    </div>

    // Left
  );
};

export default SmallCard;
