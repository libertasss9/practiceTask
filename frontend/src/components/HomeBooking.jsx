import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCalendar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { RiHotelFill } from "react-icons/ri";
import { IoMdPerson } from "react-icons/io";
import BookingPopup from "./BookingPopup";
import SuccessPopup from "./SuccesPopup";

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

const homeBookingData = [
  {
    id: 1,
    title: "Location",
    icon: <FaLocationDot className="icons" />,
    combobox: ["city", "Amsterdam", "Lviv", "Kharkiv"],
  },
  {
    id: 2,
    title: "Room type",
    icon: <RiHotelFill className="icons" />,
    combobox: ["room type", "Standard", "Lux", "Deluxe", "Economy"],
  },
  {
    id: 3,
    title: "Persons",
    icon: <IoMdPerson className="icons" />,
    combobox: ["number", "1", "2", "3"],
  },
  {
    id: 4,
    title: "Check in",
    icon: <FaCalendar className="icons" />,
    isDate: true,
    placeholder: "mm/dd/yyyy",
  },
  {
    id: 5,
    title: "Check out",
    icon: <FaCalendar className="icons" />,
    isDate: true,
    placeholder: "mm/dd/yyyy",
  },
];

const HomeBooking = ({
  roomType,
  location: initialLocation,
  persons,
  roomId,
}) => {
  const [formData, setFormData] = useState({
    location: initialLocation || "",
    roomType: roomType || "",
    persons: persons || "",
    checkIn: "",
    checkOut: "",
  });

  const [error, setError] = useState("");
  const [highlight, setHighlight] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [personalData, setPersonalData] = useState({
    phoneNumber: "",
    fullName: "",
    comments: "",
  });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const currentRoomType = queryParams.get("roomType");
    const currentLocation = queryParams.get("location");
    const currentPersons = queryParams.get("persons");
    const currentId = queryParams.get("roomId");

    if (
      (currentRoomType === roomType &&
        currentLocation === initialLocation &&
        currentPersons === persons &&
        currentId === roomId) ||
      location.hash === "#homeBooking"
    ) {
      setHighlight(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => setHighlight(false), 2000);
    }
  }, [location, roomType, initialLocation, persons, roomId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevValues) => ({
      ...prevValues,
      [name]: value || "",
    }));
  };

  const handlePersonalDataChange = (e) => {
    const { name, value } = e.target;
    setPersonalData((prevValues) => ({
      ...prevValues,
      [name]: value || "",
    }));
  };

  const handleHomeBooking = async (e) => {
    e.preventDefault();

    const checkInDate = new Date(formData.checkIn);
    const checkOutDate = new Date(formData.checkOut);

    if (checkInDate.getTime() < tomorrow.setHours(0, 0, 0, 0)) {
      setError("Check in date should be at least tomorrow.");
      return;
    }

    const dayAfterCheckIn = new Date(checkInDate);
    dayAfterCheckIn.setDate(checkInDate.getDate() + 1);

    if (checkOutDate.getTime() < dayAfterCheckIn.setHours(0, 0, 0, 0)) {
      setError("Check out date should be at least one day after check in.");
      return;
    }

    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

    if (
      checkInDate.getTime() > oneYearFromNow.getTime() ||
      checkOutDate.getTime() > oneYearFromNow.getTime()
    ) {
      setError("You can't book a room for a date more than a year from now!");
      return;
    }

    const hasErrors = homeBookingData.some((input) => {
      const fieldName = toCamelCase(input.title);
      const isRequiredField = input.combobox || input.isDate;

      if (
        (isRequiredField && !formData[fieldName]) ||
        (input.combobox && formData[fieldName] === input.combobox[0])
      ) {
        setError(`Please fill out the ${input.title} field.`);
        return true;
      }

      return false;
    });

    if (hasErrors) {
      return;
    }

    setError("");
    setShowPopup(true);
  };

  const handlePopupSubmit = async () => {
    const namePattern =
      /^[A-Za-z]+([-][A-Za-z]+)*([ ][A-Za-z]+([-][A-Za-z]+)*)*$/;
    if (!namePattern.test(personalData.fullName)) {
      setError("Full name should match format");
      return;
    }

    const phonePattern = /^\+?[1-9]\d{0,2}\s?\d{3}\s?\d{3}\s?\d{4}$/;
    if (!phonePattern.test(personalData.phoneNumber)) {
      setError("Phone number should match the format.");
      return;
    }

    try {
      let currentRoomId = roomId;

      if (!currentRoomId) {
        const roomsResponse = await fetch(`/api/v1/rooms`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!roomsResponse.ok) {
          throw new Error("Failed to fetch rooms.");
        }

        const response = await roomsResponse.json();

        const rooms = response.data?.rooms;


        if (!Array.isArray(rooms)) {
          throw new Error("Invalid rooms data format.");
        }

        const matchingRoom = rooms.find(
          (room) =>
            room.location.toUpperCase() === formData.location.toUpperCase() &&
            room.roomType.toUpperCase() === formData.roomType.toUpperCase() &&
            room.person === parseInt(formData.persons, 10) &&
            room.availability === true
        );

        if (!matchingRoom) {
          throw new Error("No matching room found.");
        }

        currentRoomId = matchingRoom._id;
      }

      const bookingResponse = await fetch("/api/v1/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          ...personalData,
          roomId: currentRoomId,
        }),
      });

      if (!bookingResponse.ok) {
        throw new Error("Booking failed");
      }

      const updateResponse = await fetch(`/api/v1/rooms/${currentRoomId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ availability: false }),
      });

      if (!updateResponse.ok) {
        throw new Error("Failed to update room availability");
      }

      setShowSuccessPopup(true);
      navigate("/");
    } catch (error) {
      setError("An error occurred during booking.");
    } finally {
      setShowPopup(false);
      setFormData({
        location: "",
        roomType: "",
        persons: "",
        checkIn: "",
        checkOut: "",
      });
      setPersonalData({
        phoneNumber: "",
        fullName: "",
        comments: "",
      });
    }

    setError("");
  };

  const toCamelCase = (str) => {
    return str
      .split(" ")
      .map((word, index) =>
        index === 0
          ? word.toLowerCase()
          : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join("");
  };

  return (
    <div
      id="homeBooking"
      className={`${highlight ? "ring-2 ring-secondary" : ""}`}
    >
      {error && (
        <p className="bg-red text-center font-semibold text-white">{error}</p>
      )}
      <form className="grid-container">
        {homeBookingData.map((input) => (
          <div key={input.id} className="home__booking-item">
            {input.icon}
            <div className="home__booking-inputs">
              <span className="booking__combobox-title">{input.title}</span>
              {input.combobox ? (
                <select
                  name={toCamelCase(input.title)}
                  className="booking__combobox"
                  value={formData[toCamelCase(input.title)]}
                  onChange={handleInputChange}
                >
                  {input.combobox.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : input.isDate ? (
                <input
                  type="date"
                  name={toCamelCase(input.title)}
                  className="booking__combobox"
                  value={formData[toCamelCase(input.title)]}
                  onChange={handleInputChange}
                  pattern={input.pattern}
                />
              ) : null}
            </div>
          </div>
        ))}
        <div className="flex items-center p-2 md:p-4">
          <button
            type="submit"
            className="btn px-8 py-4 md:px-12"
            onClick={handleHomeBooking}
          >
            Book now
          </button>
        </div>
      </form>
      {showPopup && (
        <BookingPopup
          personalData={personalData}
          onPersonalDataChange={handlePersonalDataChange}
          onClose={() => setShowPopup(false)}
          onSubmit={handlePopupSubmit}
          error={error}
        />
      )}
      {showSuccessPopup && (
        <SuccessPopup onClose={() => setShowSuccessPopup(false)} />
      )}
    </div>
  );
};

export default HomeBooking;
