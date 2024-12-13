import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">HotelPoint</p>
        <p className="text-sm mt-2">
          Sledovať nás:
          <a href="#" className="text-blue-400 hover:underline ml-1">
            Facebook
          </a>
          |
          <a href="#" className="text-blue-400 hover:underline ml-1">
            Twitter
          </a>
          |
          <a href="#" className="text-blue-400 hover:underline ml-1">
            Instagram
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
