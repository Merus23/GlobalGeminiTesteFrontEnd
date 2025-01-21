import React from "react";

type SpinnerProps = { isVisible: boolean };

/**
 * @description Spinner component to show a loading spinner
 * @param {boolean} isVisible - Show or hide the spinner
 */

export default function Spinner({ isVisible }: SpinnerProps) {
  return (
    <>
      {isVisible && (
        <div className="inset-0 bg-gray-600/50 z-50 fixed flex justify-center items-center">
          <div
            className=" fixed h-72 w-72 animate-spin rounded-full border-[14px] border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      )}
    </>
  );
}
