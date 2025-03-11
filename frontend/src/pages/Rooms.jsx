import React, { useRef, useState, useEffect } from "react";
import Room from "../components/Room";
import Hero from "../components/Hero";
import { FaArrowDown } from "react-icons/fa";
import InputForm from "../components/InputForm";

const Rooms = () => {
  const aboutSection = useRef(null);
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [location, setCity] = useState("");
  const [numPersons, setNumPersons] = useState(1);
  const [roomType, setRoomType] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const errorMessageRef = useRef(null);

  useEffect(() => {
    fetch("/api/v1/rooms")
      .then((res) => res.json())
      .then((response) => {
        if (response.data && Array.isArray(response.data.rooms)) {
          const sortedRooms = response.data.rooms.sort((a, b) => {
            return a.availability === true && b.availability === false ? -1 : 1;
          });
          setRooms(sortedRooms);
          setFilteredRooms(sortedRooms);
        } else {
          console.error("Unexpected data structure:", response);
          setRooms([]);
          setFilteredRooms([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching rooms:", error);
        setErrorMessage("Failed to fetch rooms. Please try again later.");
      });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        errorMessageRef.current &&
        !errorMessageRef.current.contains(event.target)
      ) {
        setErrorMessage("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filterUniqueRooms = (rooms) => {
    const uniqueRooms = rooms.reduce((acc, current) => {
      const x = acc.find((room) => room.image === current.image);
      if (!x) {
        acc.push(current);
      }
      return acc;
    }, []);
    return uniqueRooms;
  };

  const formatRoomType = (type) => {
    if (!type) return "";
    return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
  };

  const checkAvailability = (image) => {
    return rooms.some((room) => room.image === image && room.availability);
  };

  const formatAvailability = (availability) => {
    return availability ? "Yes" : "No";
  };

  const fetchFilteredRooms = async (location, roomType, numPersons) => {
    try {
      const response = await fetch(
        `/api/v1/rooms/filter/f?location=${location}&type=${roomType}&person=${numPersons}`,
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      if (data && data.data && Array.isArray(data.data.rooms)) {
        return data.data.rooms;
      } else {
        console.error("Unexpected data structure:", data);
        setErrorMessage("Unexpected data structure.");
        return [];
      }
    } catch (error) {
      console.error("Failed to fetch rooms:", error);
      setErrorMessage("Failed to fetch rooms.");
      return [];
    }
  };

  const applyFilters = async () => {
    if (!location || !roomType || !numPersons) {
      setErrorMessage("Please select all criteria.");
      return;
    }

    const filteredRooms = await fetchFilteredRooms(
      location,
      roomType,
      numPersons,
    );

    const sortedRooms = filteredRooms.sort((a, b) => {
      return a.availability === "yes" && b.availability === "no" ? -1 : 1;
    });

    setFilteredRooms(sortedRooms);
  };

  const uniqueRooms = filterUniqueRooms(filteredRooms);

  return (
    <div className="bg-primary">
      <section className="w-full">
        <Hero
          title="Rooms and Suites"
          subtitle="The elegant luxury bedrooms in this gallery showcase custom interior designs & decorating ideas. View pictures and find your perfect luxury bedroom design."
          icon={<FaArrowDown />}
          showIcon={true}
          scrollToSection={() => {
            window.scrollTo({
              top: aboutSection.current.offsetTop,
              behavior: "smooth",
            });
          }}
        />
      </section>
      <div
        ref={aboutSection}
        className="container__x-paddings items-center mt-10 flex flex-col gap-5 md:flex-row"
      >
        <div className="flex gap-2 overflow-auto lg:gap-5">
          <InputForm
            type="select"
            placeholder="Persons"
            className="rounded-md border-1 border-[#dbdbdb] bg-[#fafafa] py-1 md:p-2 focus:outline-[#cccccc]"
            options={["1", "2", "3"]}
            value={numPersons}
            onChange={(e) => setNumPersons(Number(e.target.value))}
          />
          <InputForm
            type="select"
            placeholder="Location"
            className="rounded-md border-1 border-[#dbdbdb] bg-[#fafafa] py-1 md:p-2 focus:outline-[#cccccc]"
            options={["Lviv", "Amsterdam", "Kharkiv"]}
            value={location}
            onChange={(e) => setCity(e.target.value)}
          />
          <InputForm
            type="select"
            placeholder="Room type"
            className="rounded-md border-1 border-[#dbdbdb] bg-[#fafafa] py-1 md:p-2 focus:outline-[#cccccc]"
            options={["Lux", "Deluxe", "Standard", "Economy"]}
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="btn py-2 px-12" onClick={applyFilters}>
            Filter
          </button>
          {errorMessage && (
            <div
              ref={errorMessageRef}
              className="text-sm font-semibold text-red lg:text-lg"
            >
              {errorMessage}
            </div>
          )}
        </div>
      </div>
      <section className="container__x-paddings grid grid-cols-1 place-items-center gap-5 py-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-10 lg:py-12 2xl:grid-cols-4">
        {uniqueRooms.map((room) => (
          <Room
            key={room.id}
            id={room.id}
            imgPath={room.image}
            title={formatRoomType(room.roomType)}
            price={room.cost}
            availability={formatAvailability(checkAvailability(room.image))}
            amenities={room.amenities}
            location={room.location}
            numPersons={room.person}
            roomId={room._id}
          />
        ))}
      </section>
    </div>
  );
};

export default Rooms;
