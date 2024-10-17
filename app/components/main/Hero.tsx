import React from "react";

const Hero = () => {
  return (
    <div className="mx-auto h-[500px] flex flex-col md:flex-row justify-between pt-32">
      {" "}
      {/* Zvýšený padding-top */}
      {/* Text na ľavej strane */}
      <div className="flex flex-col w-full gap-4 items-center justify-center text-center p-4 md:w-[50%]">
        <div className="flex flex-col h-full justify-center">
          <h1 className="text-2xl font-bold">Welcome to HotelPoint</h1>
          <p>This is the main content of the homepage.</p>
        </div>
      </div>
      {/* Obrázok na pravej strane */}
      <div className="md:w-[50%] w-full h-[500px] relative">
        <img
          src="/hotel.png"
          alt="Image Description"
          className="h-full w-full object-cover hidden md:block" // Obrázok sa zobrazuje iba na md a vyšších obrazovkách
        />
      </div>
    </div>
  );
};

export default Hero;
