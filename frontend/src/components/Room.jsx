import { useNavigate } from "react-router-dom";
import { IoMdTv } from "react-icons/io";
import { PiShower } from "react-icons/pi";
import { GrWifi } from "react-icons/gr";

const iconMap = {
  TV: IoMdTv,
  Shower: PiShower,
  Wifi: GrWifi,
};

const Room = ({ roomId, imgPath, title, price, availability, amenities, location, numPersons }) => {
  const navigate = useNavigate();

  const handleRoomBook = (e) => {
    e.preventDefault();
    navigate(
      `/?roomType=${encodeURIComponent(title)}&location=${encodeURIComponent(location)}&persons=${encodeURIComponent(numPersons)}&roomId=${encodeURIComponent(roomId)}`,
    );
  };

  const isAvailable = availability === "Yes";

  return (
    <div className="relative flex aspect-roomCard w-full max-w-[350px] flex-col justify-between bg-white shadow-md hover:shadow-2xl md:w-[310px] lg:w-[260px] xl:w-[330px] 2xl:w-[370px]">
      <div className="h-[60%] w-full">
        <div
          className="bg-cover bg-center"
          style={{
            backgroundImage: `url(${imgPath})`,
            width: "100%",
            height: "100%",
          }}
        ></div>
      </div>
      <div className="flex w-full items-center justify-between p-2 px-4">
        <h1 className="font-mulish text-[20px] font-semibold text-secondary xl:text-[25px]">
          The {title} room
        </h1>
        <div
          className={`absolute right-4 top-4 rounded-md p-2 font-bold text-white ${
            isAvailable ? "bg-green" : "bg-red"
          }`}
        >
          Available: {availability}
        </div>
      </div>
      <div className="w-full p-1 px-4">
        <h2 className="font-poppins font-medium text-secondary xl:text-[20px]">
          ${price}
        </h2>
      </div>
      <div className="flex w-full items-center justify-between border-t-1 border-t-secondary50 p-4">
        <div className="grid w-[45%] grid-cols-3 gap-1 lg:gap-3">
          {amenities.map((amenity) => {
            const IconComponent = iconMap[amenity];
            if (!IconComponent) return null;
            return (
              <div
                key={amenity}
                className="flex size-8 items-center justify-center rounded-full bg-primary xl:size-10"
              >
                <IconComponent className="text-xl text-secondary" />
              </div>
            );
          })}
        </div>
        <div className="flex w-[45%] items-center justify-end">
          <button
            onClick={handleRoomBook}
            className={`btn xl:text-md w-full px-3 py-4 text-sm ${
              isAvailable
                ? ""
                : "cursor-not-allowed bg-lightGray text-secondary hover:bg-lightGray"
            }`}
            disabled={!isAvailable}
          >
            Book now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Room;
