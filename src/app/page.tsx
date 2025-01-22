"use client";
import axios from "axios";
import React, { useState } from "react";

interface IField {
  name: string;
  description: string;
}

export default function Home() {
  const [fields, setFields] = useState<IField[]>([]);
  const [field, setField] = useState<IField>({
    name: "",
    description: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  async function handleProcessFile(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", selectedFile as Blob);
    formData.append("fields", JSON.stringify(fields));
    //Mocado por agora
    formData.append("type", "Contrato");

    try {
      const response = await axios.post("", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }

    console.log("Fetching file");
  }

  return (
    <div className=" flex flex-col md:flex-row h-full">
      <form
        className="flex-1 w-full h-full flex flex-col gap-6 items-center"
        onSubmit={handleProcessFile}
      >
        <div className="h-32 w-full flex flex-col gap-2 items-center pb-4">
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
            required
            disabled={false}
          />
          <label
            htmlFor="file-upload"
            className="flex flex-col text-black px-4 py-2 rounded cursor-pointer items-center justify-center h-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={`${
                false ? "text-gray-600" : ""
              }upload-icon ml-2 text-black`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
              />
            </svg>
            Faça o upload do seu contrato aqui
          </label>

          {selectedFile ? (
            <p className="text-base w-fit">
              {selectedFile.name.substring(0, 40)}...
            </p>
          ) : (
            <p className="text-base w-fit">Nenhum contrato selecionado ainda</p>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-bold">
            Informe os campos que deseja buscar
          </h1>

          <input
            type="text"
            placeholder="Nome do campo"
            className="border-2 border-gray-300 rounded-lg p-1"
            value={field.name}
            onChange={(e) => setField({ ...field, name: e.target.value })}
          />
          <textarea
            name="description"
            id=""
            placeholder="Descrição do campo"
            className="resize-none border-2 p-1 border-gray-300 rounded-lg"
            value={field.description}
            onChange={(e) =>
              setField({ ...field, description: e.target.value })
            }
          ></textarea>

          <button
            className="bg-gray-700 text-white w-fit p-2 rounded-lg mx-auto"
            onClick={() => setFields(fields.concat(field))}
          >
            Adicionar campo
          </button>

          <div>
            {fields.map((field, index) => (
              <div
                key={index}
                className="flex flex-col gap-0 odd:bg-gray-700 odd:text-white even:bg-gray-300 even:text-black "
              >
                <h2 className="w-full pl-1 p-0.5">{field.name}</h2>
              </div>
            ))}
          </div>
        </div>

        <button className="bg-gray-700 text-white w-72 p-2 rounded-lg mx-auto">
          Buscar no contrato
        </button>
      </form>
      <div className="bg-white flex-1 w-full"></div>
    </div>
  );
}
