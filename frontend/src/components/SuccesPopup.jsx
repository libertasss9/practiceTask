import React from "react";
import { FaTimes } from "react-icons/fa";

const SuccessPopup = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content flex h-[200px] max-w-[600px] flex-col items-center justify-center">
        <button className="popup-close" onClick={onClose}>
          <FaTimes />
        </button>
        <h1 className="p-5 text-center text-[18px] font-semibold text-green md:text-[25px]">
          Action was successful!
        </h1>
        <button className="btn mx-auto w-full max-w-[300px]" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessPopup;
