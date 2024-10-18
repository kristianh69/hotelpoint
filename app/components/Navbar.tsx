"use client";

import Image from "next/image";
import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-gray-800  fixed top-0 left-0 right-0 mx-auto  text-white w-full z-50 border-b-2">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center justify-center text-center">
            <Image
              width={50}
              height={50}
              className="h-16 w-auto"
              src="/logo.png"
              alt="Logo"
            />

            <span className="font-bold text-2xl">HotelPoint.</span>
          </div>

          <div className="hidden md:ml-6 md:flex space-x-4">
            <NavItem href="" label="Rezervacie" />
            <div className="border-2">
              <NavItem href="/registracia" label="Registrácia" />
            </div>
            <div>
              <NavItem href="/login" label="Prihlásenie" />
            </div>
          </div>
          {/* Hamburger menu */}
          <div className="md:hidden flex justify-center items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-400 hover:text-white"
            >
              {isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9.293l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707A1 1 0 015.707 4.293L10 8.586z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 5h12a1 1 0 100-2H4a1 1 0 100 2zm0 5h12a1 1 0 100-2H4a1 1 0 100 2zm0 5h12a1 1 0 100-2H4a1 1 0 100 2z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobilné menu */}
      <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <NavItem href="#" label="Registrácia" mobile />
          <NavItem href="#" label="Rezervácia" mobile />
          <NavItem href="#" label="Prihlásenie" mobile />
        </div>
      </div>
    </nav>
  );
};

const NavItem: React.FC<{ href: string; label: string; mobile?: boolean }> = ({
  href,
  label,
  mobile,
}) => (
  <a
    href={href}
    className={`block rounded-md px-3 py-2 text-sm font-medium ${
      mobile
        ? "text-gray-300 hover:bg-gray-700 hover:text-white"
        : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`}
  >
    {label}
  </a>
);

export default Navbar;
