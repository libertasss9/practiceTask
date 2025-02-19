import React from "react";
import { FaTimes } from "react-icons/fa";

const BookingPopup = ({
  personalData,
  onPersonalDataChange,
  onClose,
  onSubmit,
  error,
}) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="popup-close" onClick={onClose}>
          <FaTimes />
        </button>
        <h2 className="p-3 text-center font-dancing text-[30px] font-bold text-secondary md:p-5 md:text-[50px]">
          Enter your personal data
        </h2>
        <form>
          <div className="flex flex-col gap-2 py-5">
            <label
              htmlFor="fullName"
              className="text-poppins font-mediu text-[18px] md:text-[20px]"
            >
              Fullname
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={personalData.fullName}
              placeholder="e.g John Becker"
              onChange={onPersonalDataChange}
              className="w-full rounded-md border-1 border-[#eee3ff] bg-[#f6f1ff] p-3 focus:outline-[#e3d1ff]"
            />
          </div>
          <div className="flex flex-col gap-2 py-5">
            <label
              htmlFor="phoneNumber"
              className="text-poppins text-[18px] font-medium md:text-[20px]"
            >
              Phone number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={personalData.phoneNumber}
              onChange={onPersonalDataChange}
              placeholder="+38 067 829 3824"
              className="w-full rounded-md border-1 border-[#eee3ff] bg-[#f6f1ff] p-3 focus:outline-[#e3d1ff]"
            />
          </div>

          <div className="flex flex-col gap-2 py-5">
            <label
              htmlFor="comments"
              className="text-poppins font-mediu text-[18px] md:text-[20px]"
            >
              Comments
            </label>
            <textarea
              id="comments"
              name="comments"
              value={personalData.comments}
              onChange={onPersonalDataChange}
              className="w-full rounded-md border-1 border-[#eee3ff] bg-[#f6f1ff] p-3 focus:outline-[#e3d1ff]"
            />
          </div>

          {error && (
            <p className="my-3 bg-red text-center font-semibold text-white">
              {error}
            </p>
          )}

          <button type="button" onClick={onSubmit} className="btn w-full">
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingPopup;
