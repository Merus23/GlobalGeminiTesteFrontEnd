export type ConfirmationProps = {
  message: string;
  sucessButtonMessage: string;
  onSucess: () => void;
  unsuccessfulButtonMessage: string;
  onUnsuccessful: () => void;
  subMessage?: string;
  isVisible: boolean;
};

/**
 * @description This component will render a confirmation modal
 * @param {string} message - The message to be displayed
 * @param {string} sucessButtonMessage - The message to be displayed on the success button
 * @param {() => void} onSucess - The function to be executed on success button click
 * @param {string} unsuccessfulButtonMessage - The message to be displayed on the unsuccessful button
 * @param {() => void} onUnsuccessful - The function to be executed on unsuccessful button click
 * @param {string} subMessage - The sub message to be displayed
 * @param {boolean} isVisible - Set the visibility of the modal
 *
 */

export default function Confirmation({
  message,
  sucessButtonMessage,
  onSucess,
  unsuccessfulButtonMessage,
  onUnsuccessful,
  subMessage,
  isVisible,
}: ConfirmationProps) {
  return (
    <>
      {isVisible && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div
            className={`w-11/12 lg:w-8/12 h-auto bg-white p-6 rounded-lg shadow-lg overflow-hidden relative `}
          >
            <div className="flex flex-col gap-2 ">
              <h2 className="text-3xl font-bold text-center">Confirmação</h2>
              <p className="text-xl text-center">{message}</p>
              {subMessage && (
                <div className="w-7/12 mx-auto">
                  <p className="text-wrap text-sm text-center text-red-600 whitespace-pre-line">
                    {subMessage}
                  </p>
                </div>
              )}

              <div className="flex justify-evenly pt-2">
                <button
                  className="py-3 px-5 rounded-lg bg-[#009f3b] text-white"
                  onClick={onSucess}
                >
                  {sucessButtonMessage}
                </button>
                <button
                  className="py-3 px-5 rounded-lg bg-red-500 text-white"
                  onClick={onUnsuccessful}
                >
                  {unsuccessfulButtonMessage}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
