"use client";
import Image from "next/image";
import React from "react";
import Lottie from "lottie-react";
import animationData from "@/public/zvoncek.json";

const Hero = () => {
  return (
    <div className="bg-black h-[70vh]  flex justify-center items-center">
      <div className="absolute top-36 inset-0 z-0 flex justify-center items-center">
        <Lottie
          animationData={animationData}
          className=" w-[200px] h-[200px] lg:h-[350px] lg:w-[350px]"
          loop={true}
        />
      </div>
      <div className="text-center ">
        <h1 className="text-2xl relative z-10 lg:text-5xl font-bold text-white px-10">
          Rezervujte si izbu rýchlo a jednoducho presne podľa vašich predstáv.
        </h1>
      </div>
    </div>
  );
};

export default Hero;
