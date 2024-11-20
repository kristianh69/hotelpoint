"use client";

import Image from "next/image";
import React, { useState } from "react";
import * as DropdownMenu from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const session = useSession();
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-gray-800 fixed top-0 left-0 right-0 text-white w-full z-50 border-b-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo a názov */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <Image
                width={50}
                height={50}
                src="/logo.png"
                alt="Logo"
                className="h-12 w-auto"
              />
              <span className="font-bold text-xl">HotelPoint</span>
            </a>
          </div>
          <div className="relative  ml-auto ">
            <DropdownMenu.DropdownMenu>
              {session.status === "authenticated" && (
                <DropdownMenu.DropdownMenuTrigger className="px-3 py-2 rounded-md hover:bg-gray-700">
                  Možnosti
                </DropdownMenu.DropdownMenuTrigger>
              )}
              <DropdownMenu.DropdownMenuContent>
                <DropdownMenu.DropdownMenuItem>
                  <a href="/addroom">Pridať hotel</a>
                </DropdownMenu.DropdownMenuItem>
                <DropdownMenu.DropdownMenuItem>
                  <a href="/rezervacie">Rezervácie</a>
                </DropdownMenu.DropdownMenuItem>
              </DropdownMenu.DropdownMenuContent>
            </DropdownMenu.DropdownMenu>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-4">
            <NavItem href="/rezervovanie" label="Rezervácie" />
            {session.status === "authenticated" ? (
              <button onClick={() => signOut()}>Odhlásiť</button>
            ) : (
              <>
                <NavItem href="/registracia" label="Registrácia" />
                <NavItem href="/login" label="Prihlásenie" />
              </>
            )}
          </div>

          {/* Hamburger menu (mobilné zariadenia) */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white"
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
      <div className={`${isOpen ? "block" : "hidden"} md:hidden bg-gray-800`}>
        <div className="px-2 pb-3 space-y-1">
          <NavItem href="/rezervovanie" label="Rezervácie" mobile />
          <NavItem href="/registracia" label="Registrácia" mobile />
          <NavItem href="/login" label="Prihlásenie" mobile />
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
