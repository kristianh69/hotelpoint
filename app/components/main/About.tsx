import React from "react";

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-gray-800 to-black min-h-screen flex flex-col items-center justify-center py-10">
      {" "}
      <div className="flex items-center justify-start p-4 w-full">
        <img
          src="/hotel.png"
          alt="Hotel"
          className="w-full max-w-xs md:max-w-md mr-4 -ml-10"
        />
        <p className="text-2xl font-bold text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
      <div className="flex items-center justify-start p-4 w-full">
        <img
          src="/hotel.png"
          alt="Hotel"
          className="w-full max-w-xs md:max-w-md mr-4 -ml-10"
        />
        <p className="text-2xl font-bold text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
      <div className="flex items-center justify-start p-4 w-full">
        <img
          src="/hotel.png"
          alt="Hotel"
          className="w-full max-w-xs md:max-w-md mr-4 -ml-10"
        />
        <p className="text-2xl font-bold text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
    </div>
  );
};

export default Hero;
