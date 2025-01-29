"use client";
import axios from "axios";
import React, { useState } from "react";
import Spinner from "./components/Spinner/Spinner";

interface IField {
  name: string;
  description: string;
}

interface IResponse extends IField {
  response: string;
}

export default function Home() {
  const catalog = [
    { label: "Contrato", href: "/pages/Contracts" },
    { label: "Edital", href: "/" },
    { label: "Termo de Referência", href: "/" },
    { label: "Documento", href: "/" },
    { label: "Boleto", href: "/" },
    { label: "Requerimento", href: "/" },
  ];

  return (
    <>
      <div className="w-full h-full overflow-y-hidden flex items-center justify-center">
        <nav>
          <ul className="grid grid-cols-3 text-center gap-16 md:gap-40">
            {catalog.map((item, index) => {
              return (
                <li key={index}>
                  <a href={item.href} className="">
                    <div className="text-xl bg-gray-300 md:w-40 md:h-40 hover:scale-110 rounded-lg flex items-center justify-center">
                      <p>{item.label}</p>
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}
