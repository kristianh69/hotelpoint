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
        <h1 className="text-3xl relative z-10 md:text-4xl lg:text-5xl font-bold text-white px-10">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </h1>
      </div>
    </div>
  );
};

export default Hero;
