import Image from "next/image";
import React from "react";

const MediumCard = ({ img, title }) => {
  return (
    <div className="cursor-pointer hover:scale-105 transform transition duration-300 ease-out">
      <div className="relative w-80 h-80 gap-3 m-3 mt-2">
        <Image
          src={img}
          alt="medium_card"
          layout="fill"
          loading="lazy"
          className="rounded-xl"
        />
      </div>
      <h3 className="text-2xl mt-3">{title}</h3>
    </div>
  );
};

export default MediumCard;
