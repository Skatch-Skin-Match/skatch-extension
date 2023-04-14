
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { AlertProps } from "./interfaces";
import { MdClose } from "react-icons/md";

// to use toast msg add this into code
// const { addSuccessMessage, addErrorMessage } = useContext(AlertMessengerContext);

//   addSuccessMessage({
//     message: "data added successfully",
//   });

// const noop = (_?: MouseEvent<HTMLButtonElement>) => { };

const Alert = (props: AlertProps) => {
  const { type, message, onAction } = props;
  return (
    <div
      id="toast-success"
      className="flex items-center p-2 mb-3 justify-between gap-2 w-full text-white bg-gray-700 rounded-xl"
      role="alert"
    >
      <div className="ml-3 flex-center">
        {type === "success" ? (
          <FaCheckCircle className="text-green-600 mr-2 text-[20px]" />
        ) : (
          <FaTimesCircle className="text-red-600 mr-2 text-[20px]" />
        )}
        <p className="text-white text-base">{message}</p>
      </div>

      <button
        type="button"
        className=" text-[20px] bg-transparent text-red-400 rounded-lg p-2 inline-flex "
        data-dismiss-target="#toast-success"
        aria-label="Close"
        onClick={onAction}
      >
        <MdClose />
      </button>
    </div>
  );
};

export default Alert;
