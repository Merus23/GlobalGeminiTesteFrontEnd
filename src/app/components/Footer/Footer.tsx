import React from "react";

export type FooterProps = {};

//
export default function Footer({}: FooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer className="text-center h-12 bg-[#054e9c] text-white flex flex-col">
      <p className="my-auto text-lg">
        Desenvolvido por GlobalTIRH &copy; {year}
      </p>
    </footer>
  );
}
