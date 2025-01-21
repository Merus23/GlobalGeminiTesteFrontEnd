import React, { useState, useEffect } from "react";

export type PopupProps = {
  status: boolean;
  message: string;
  id: number;
};

/**
 * @description Popup component
 * @param {boolean} status - Status of the popup (true for success, false for error)
 * @param {string} message - Message to be displayed
 * @param {number} id - Popup id
 */
export default function Popup({ status, message, id }: PopupProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if ((status || !status) && message) {
      setVisible(true);

      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status, message, id]);

  if (!visible) return null;

  return (
    <>
      <div
        className={`fixed top-2 left-1/2 transform -translate-x-1/2 p-4 rounded shadow-lg text-white w-11/12 max-w-sm md:max-w-md z-50 ${
          status ? "bg-green-500" : "bg-red-500"
        }`}
        key={id}
        style={{ margin: "0 auto" }}
      >
        <button
          onClick={() => setVisible(false)}
          className="absolute top-2 right-2 text-white"
        >
          &times;
        </button>
        <p>{message}</p>
      </div>
    </>
  );
}
