"use client";
import axios from "axios";
import React, { useState } from "react";
import Spinner from "@/app/components/Spinner/Spinner";

interface IField {
  name: string;
  description: string;
}

interface IResponse extends IField {
  response: string;
}

interface ServiceContract {
  [key: string]: IResponse[];
}

export default function Documents() {
  const [loading, setLoading] = useState<boolean>(false);
  const [fields, setFields] = useState<IField[]>([]);
  const [field, setField] = useState<IField>({
    name: "",
    description: "",
  });

  const [selectedDocumentType, setSelectedDocumentType] = useState<string>("");

  const ContratoPadrao: IField[] = [
    {
      name: "CNPJ Contratante",
      description:
        "CNPJ do contratante do serviço. CNPJ é do formato xx.xxx.xxx/xxxx-xx.",
    },
    {
      name: "CNPJ Contratado",
      description:
        "CNPJ do contratado do serviço. CNPJ é do formato xx.xxx.xxx/xxxx-xx.",
    },
    { name: "Nome Contratante", description: "Nome do contratante do serviço" },
    { name: "Nome Contratado", description: "Nome do contratado do serviço" },
  ];

  const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null);
  const [responses, setResponses] = useState<IResponse[]>([]);
  const [ServiceContract, setServiceContract] = useState<ServiceContract>();

  const [documentsId, setDocumentsId] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    setSelectedFiles((prevFiles) => [...(prevFiles || []), ...files]);
  };

  function addFields(fields: IField[]) {
    setFields(fields);
  }

  async function handleGenerateXLS(id: string) {
    try {
      const response = await axios.get(`http://127.0.0.1:8080/request_excel/${id}`, {
        headers: {
          "Content-Type":
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        },
        responseType: "blob",
      });

      if (response) {
        const blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = `arquivo_${id}.xlsx`;
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error("Erro ao gerar o arquivo XLSX", err);
    }
  }

  async function handleProcessFile(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData();
    let fileIndex = 0;
    if (selectedFiles) {
      for (const file of selectedFiles) {
        formData.append(`files[${fileIndex}]`, file as Blob);
        fileIndex++;
      }
    }
    formData.append("fields", JSON.stringify(fields));
    formData.append("type", selectedDocumentType);

    try {
      setLoading(true);
      const response = await axios.post(
        "http://127.0.0.1:8080/processo_dinamico",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response) {
        setDocumentsId(response.data.uid);

        setServiceContract(response.data.resposta);

        setResponses(response.data.resposta);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }

    console.log("Fetching file");
  }

  return (
    <div className="flex flex-col md:flex-row h-auto p-10">
      <form
        className="flex-1 w-full h-full flex flex-col gap-6 items-center p-2 md:p-0"
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
            multiple={true}
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
            Faça o upload do seu arquivo aqui
          </label>
          {selectedFiles && selectedFiles.length > 0 ? (
            selectedFiles.length === 1 ? (
              <p className="text-base w-fit">Apenas um arquivo selecionado</p>
            ) : (
              <p className="text-base w-fit">
                {selectedFiles.length} arquivos selecionados
              </p>
            )
          ) : (
            <p className="text-base w-fit">Nenhum arquivo selecionado ainda</p>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-bold">
            Informe os campos que deseja buscar
          </h1>

          <div className="w-full border-4 p-2 rounded-lg">
            <h1 className="text-lg">Campos pré-definidos.</h1>
            <h3 className="text-sm">
              Caso queira um campos pré-definido, basta selecionar um item.
            </h3>
            <select
              name="SelectDocumentType"
              id="Select-document-type"
              className="border-2 border-gray-300 rounded-lg p-1 w-full"
              onChange={(e) => {
                setSelectedDocumentType(e.target.value);
                if (e.target.value === "Contrato") {
                  addFields(ContratoPadrao);
                }
              }}
            >
              <option value="">Selecione um documento</option>
              <option value="Contrato">Contrato Padrão</option>
            </select>
          </div>

          <div className="w-full border-4 p-2 rounded-lg space-y-2">
            <h1 className="text-lg">Campos personalizados</h1>
            <input
              type="text"
              placeholder="Nome do campo"
              className="border-2 border-gray-300 rounded-lg p-1 w-full"
              value={field.name}
              onChange={(e) => setField({ ...field, name: e.target.value })}
            />
            <textarea
              name="description"
              id=""
              placeholder="Descrição do campo"
              className="resize-none border-2 p-1 border-gray-300 rounded-lg w-full"
              value={field.description}
              onChange={(e) => {
                setField({ ...field, description: e.target.value });
              }}
            ></textarea>
            <button
              className="bg-gray-700 text-white w-fit p-2 rounded-lg mx-auto"
              onClick={() => {
                if (field.name && field.description) {
                  setFields(fields.concat(field));
                } else {
                  alert("Preencha todos os campos nome e descrição");
                }
              }}
            >
              Adicionar campo personalizado
            </button>
          </div>

          <div>
            {fields.map((field, index) => (
              <details
                key={index}
                className="flex flex-col gap-0 odd:bg-gray-700 odd:text-white even:bg-gray-300 even:text-black "
              >
                <summary className="p-1">{field.name}</summary>
                <p className="max-w-80 md:max-w-full text-wrap text-center md:text-left md:pl-4">
                  {field.description}
                </p>
              </details>
            ))}
          </div>
        </div>

        <button className="bg-gray-700 text-white w-72 p-2 rounded-lg mx-auto">
          Buscar no arquivo
        </button>
      </form>
      <div className="flex-1 w-full flex flex-col">
        <div className="flex-1">
          <h1 className="text-2xl py-4">Resultados</h1>

          {Object.keys(responses).map((key, index) => (
            <details
              key={index}
              className="p-1 flex flex-col gap-1 odd:bg-gray-700 odd:text-white even:bg-gray-300 even:text-black"
            >
              <summary className="text-lg font-semibold">
                Arquivo {index + 1}
              </summary>
              {responses[key].map((r: IResponse, index: number) => {
                return (
                  <details key={index*2} className="pl-4 flex flex-col gap-1  ">
                    <summary>Campo {index + 1}</summary>
                    <div className="pl-4">
                      <p className="text-base font-semibold">{r.name}</p>
                      <p className="text-base">{r.response}</p>
                    </div>
                  </details>
                );
              })}
            </details>
          ))}
        </div>
        <div>
          <button
            className={`bg-gray-700 text-white p-3 rounded-lg`}
            disabled={documentsId ? false : true}
            onClick={() => {
              if (documentsId) handleGenerateXLS(documentsId);
              setDocumentsId(null);
            }}
          >
            Download em XLSX
          </button>
        </div>
      </div>
      <Spinner isVisible={loading} />
    </div>
  );
}
