import { UtensilsCrossedIcon } from "lucide-react";
import React from "react";

const About = () => {
  return (
    <div className="mt-10 flex flex-col justify-between lg:flex-row gap-5 p-5">
      <div className="flex p-5 flex-col gap-3 justify-center items-center text-center bg-neutral-500">
        <UtensilsCrossedIcon className="w-24 h-24" />
        <p className="font-medium text-xl ">
         Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro provident commodi
      </div>
      <div className="flex p-5 flex-col gap-3 justify-center items-center text-center bg-neutral-500">
        <UtensilsCrossedIcon className="w-24 h-24" />
        <p className="font-medium text-xl ">
           Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro provident commodi
        </p>
      </div>
      <div className="flex p-5 flex-col gap-3 justify-center items-center text-center bg-neutral-500">
        <UtensilsCrossedIcon className="w-24 h-24" />
        <p className="font-medium text-xl ">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro provident commodi
        </p>
      </div>
    </div>
  );
};

export default About;
