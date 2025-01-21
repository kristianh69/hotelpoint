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

          <div className="hidden md:flex space-x-4">
            <DropdownMenu.DropdownMenu>
              {session.data?.user.role === "admin" && (
                <DropdownMenu.DropdownMenuTrigger className="px-3 py-2 rounded-md hover:bg-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
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

            <NavItem href="/rezervovanie" label="Rezervácie" />
            {session.status === "authenticated" ? (
              <button
                className="flex items-center px-4 py-2 bg-sky-500 text-white font-medium rounded-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-300"
                onClick={() => signOut()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 4.5A1.5 1.5 0 014.5 3h11a1.5 1.5 0 011.5 1.5v11a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 013 15.5v-11zM13.5 9a.5.5 0 00-.5.5V11h-5v-1.5a.5.5 0 00-1 0V11a1.5 1.5 0 001.5 1.5h5V14a.5.5 0 00.854.354l2-2a.5.5 0 000-.708l-2-2A.5.5 0 0013.5 9z"
                    clipRule="evenodd"
                  />
                </svg>
                Odhlásiť
              </button>
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
          {session.status === "authenticated" ? (
            <button
              className="block w-full text-left rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              onClick={() => signOut()}
            >
              Odhlásiť
            </button>
          ) : (
            <>
              <NavItem href="/registracia" label="Registrácia" mobile />
              <NavItem href="/login" label="Prihlásenie" mobile />
            </>
          )}
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
