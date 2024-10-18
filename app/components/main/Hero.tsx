import React from "react";

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-gray-800 to-black h-screen flex justify-center items-center">
      <div className="absolute inset-0 flex justify-center items-center">
        <img
          src="/hotel.png"
          alt="Hotel"
          className=" shadow-lg opacity-30"
          width={1000}
          height={1000}
        />
      </div>
      <div className="text-center ">
        <h1 className="text-5xl font-bold text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </h1>
      </div>
    </div>
  );
};

export default Hero;
