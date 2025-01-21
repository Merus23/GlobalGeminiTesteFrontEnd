"use client";

import React, { ReactNode, useState } from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";

//import { FaBars } from "react-icons/fa";
//import { IoMdClose } from "react-icons/io";

interface navItem {
  label: string;
  href: string;
}

type Props = {
  logo?: StaticImageData;
  navItems: navItem[];
};

export default function NavBar(NavbarProps: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className={`  ${
        isOpen
          ? " flex flex-col justify-between py-4 px-8 items-center gap-8  h-screen "
          : " flex justify-between py-4 px-8 items-center gap-8"
      }`}
    >
      {NavbarProps.logo ? (
        <>
          <Link href="/">
            <Image
              src={NavbarProps.logo}
              alt="logo"
              className={`${isOpen ? "w-24 hidden" : "w-24 block"}`}
            />
          </Link>
        </>
      ) : (
        <>
          <p>Adicione um imagem para o logo</p>
        </>
      )}

      <ul
        className={` md:flex flex-row gap-10 ${
          isOpen
            ? "flex-col space-y-5 w-full justify-center items-center"
            : "hidden "
        }`}
      >
        {NavbarProps.navItems.map((item, index) => (
          <li
            className={` ${
              isOpen ? "border-y-2 p-6 w-full flex justify-center" : ""
            }`}
            key={index}
          >
            <Link
              href={item.href}
              className={`inline-block text-gray-700 hover:text-gray-900 transform scale-100 transition-transform duration-700 hover:scale-110 ${
                isOpen ? "" : ""
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <button
        onClick={handleMenu}
        className={` ${isOpen ? "block w-full" : "md:hidden"}`}
      >
        {isOpen ? (
          <p className="bg-red-500 font-bold text-white rounded-md w-12/12 text-center mx-auto">
            Fechar
          </p>
        ) : (
          <div className="flex flex-col gap-1 w-8">
            <div key={1} className="w-full bg-black h-1.5 rounded-md"></div>
            <div key={2} className="w-full bg-black h-1.5 rounded-md"></div>
            <div key={3} className="w-full bg-black h-1.5 rounded-md"></div>
          </div>
        )}
      </button>
    </nav>
  );
}
