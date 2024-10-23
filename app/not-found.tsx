import React from "react";

const notfound = () => {
  return (
    <div>
      <div className="bg-white h-screen flex flex-col justify-center items-center">
        <h1
          className="text-5xl font-bold text-black
        "
        >
          Ooops
        </h1>
        <p className="kablammo">404 EROR !</p>
        <a href="/" className="">
          <button className=" border-solid bg-orange-400 m-5 p-2 border-r-2">
            Vrať sa
          </button>
        </a>
      </div>
    </div>
  );
};

export default notfound;
