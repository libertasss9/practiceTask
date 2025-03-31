import homeHero from "../assets/bg/home hero.webp";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaPlay, FaParking, FaDumbbell } from "react-icons/fa";
import { FaPersonSwimming } from "react-icons/fa6";
import { IoIosWifi, IoLogoGameControllerB } from "react-icons/io";
import { GiChickenOven } from "react-icons/gi";
import { MdLocalLaundryService } from "react-icons/md";
import { RiLightbulbFlashLine } from "react-icons/ri";
import Facility from "../components/Facility";
import Testimonies from "../components/Testimonies";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/pagination.css";
import { Navigation, Pagination, Keyboard } from "swiper/modules";
import Aos from "aos";
import "aos/dist/aos.css";
import HomeBooking from "../components/HomeBooking";

const facilities = [
  {
    id: 1,
    icon: <FaPersonSwimming className="facilities__icon" />,
    title: "Swimming pool",
  },
  { id: 2, icon: <IoIosWifi className="facilities__icon" />, title: "Wifi" },
  {
    id: 3,
    icon: <GiChickenOven className="facilities__icon" />,
    title: "Breakfast",
  },
  { id: 4, icon: <FaDumbbell className="facilities__icon" />, title: "Gym" },
  {
    id: 5,
    icon: <IoLogoGameControllerB className="facilities__icon" />,
    title: "Game center",
  },
  {
    id: 6,
    icon: <RiLightbulbFlashLine className="facilities__icon" />,
    title: "24/7 Light",
  },
  {
    id: 7,
    icon: <MdLocalLaundryService className="facilities__icon" />,
    title: "Laundry",
  },
  {
    id: 8,
    icon: <FaParking className="facilities__icon" />,
    title: "Parking space",
  },
];

const generateBreakpointsRooms = () => {
  const breakpoints = {};
  let slidesPerView = 1;
  let spaceBetween = 20;

  for (let width = 350; width <= 1920; width += 38) {
    if (width >= 768) {
      if (width === 768) {
        slidesPerView = 1.8;
      }
      slidesPerView += 0.08;
    } else {
      slidesPerView += 0.15;
    }
    breakpoints[width] = { slidesPerView, spaceBetween };
  }

  return breakpoints;
};

const generateBreakpointsTestimoies = () => {
  const breakpoints = {};
  let slidesPerView = 1;
  let spaceBetween = 20;

  for (let width = 350; width <= 1920; width += 100) {
    if (width >= 768) {
      slidesPerView += 0.2;
    } else {
      slidesPerView += 0.1;
    }
    breakpoints[width] = { slidesPerView, spaceBetween };
  }

  return breakpoints;
};

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const [testimoniesData, setTestimonies] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const roomType = query.get("roomType") || "";
  const locationParam = query.get("location") || "";
  const persons = query.get("persons") || "";
  const selectedRoomId = query.get("roomId") || "";

  useEffect(() => {
    Aos.init({ duration: 700 });
  }, []);

  useEffect(() => {
    fetch("/api/v1/rooms")
      .then((res) => res.json())
      .then((response) => {
        if (response.data && Array.isArray(response.data.rooms)) {
          setRooms(response.data.rooms);
        } else {
          console.error("Unexpected data structure:", response);
          setRooms([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching rooms:", error);
      });

    fetch("/api/v1/testimonies")
      .then((res) => res.json())
      .then((response) => {
        if (response.data && Array.isArray(response.data.testimons)) {
          const filteredTestimonies = response.data.testimons.filter(
            (testimony) => testimony.star === 4 || testimony.star === 5,
          );

          const formattedTestimonies = filteredTestimonies.map((testimony) => {
            const dateObj = new Date(testimony.date);
            const day = dateObj.getUTCDate();
            const month = dateObj.toLocaleString("en-US", { month: "short" });
            const year = dateObj.getUTCFullYear();

            return {
              ...testimony,
              date: `${day} ${month} ${year}`,
            };
          });

          const sortedTestimonies = formattedTestimonies.sort(
            (a, b) => b.star - a.star,
          );

          setTestimonies(sortedTestimonies);
        } else {
          console.error("Unexpected data structure:", response);
          setTestimonies([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching testimonies:", error);
      });
  }, []);

  const filterLuxRooms = (rooms) => {
    return rooms.filter((room) => room.roomType === "LUX");
  };

  const luxRooms = filterLuxRooms(rooms);

  const countAvailableLuxRooms = (luxRooms) => {
    return luxRooms.reduce((acc, room) => {
      if (room.availability) {
        if (!acc[room.image]) {
          acc[room.image] = 0;
        }
        acc[room.image]++;
      }
      return acc;
    }, {});
  };

  const countOfSpecificRoom = countAvailableLuxRooms(luxRooms);

  const filterUniqueLuxRooms = (rooms) => {
    return rooms.reduce((acc, current) => {
      if (!acc.some((room) => room.image === current.image)) {
        acc.push(current);
      }
      return acc;
    }, []);
  };

  const uniqueLuxRooms = filterUniqueLuxRooms(luxRooms);

  const filteredRooms = uniqueLuxRooms.filter(
    (room) => countOfSpecificRoom[room.image] > 0,
  );

  return (
    <div>
      <section className="hero bg-primary">
        <div className="container__x-paddings flex h-full justify-between">
          <div className="flex h-full w-[45%] flex-col items-start justify-center xl:h-[85%]">
            <div className="max-w-[401px]">
              <h1 className="font-dancing text-[20px] font-semibold text-secondary md:text-[40px] lg:text-[50px]">
                Paradise View
              </h1>
              <h2 className="pb-1 font-raleway text-[20px] font-bold leading-tight text-darkGray md:pb-4 md:text-[30px] lg:text-[55px]">
                Hotel for every moment rich in emotion
              </h2>
              <h3 className="max-w-[261px] font-raleway text-[10px] font-medium text-darkGray lg:text-[15px]">
                Every moment feels like the first time in paradise view
              </h3>
            </div>
            <div className="max-x flex py-4 md:gap-5 md:py-5 lg:gap-8 xl:py-10">
              <Link to="/#homeBooking">
                <button className="btn hidden rounded-full px-6 py-3 font-inter text-[15px] font-medium md:block lg:py-4 xl:px-9 xl:text-[20px]">
                  Book now
                </button>
              </Link>
              <Link to="/about" className="flex items-center gap-3">
                <button className="transitions rounded-full bg-tarquoise p-3 delay-100 hover:bg-tarquoiseHover lg:p-5">
                  <FaPlay className="text-primary" />
                </button>
                <h1 className="font-inter text-[15px] font-medium text-darkGray xl:text-[20px]">
                  Take a tour
                </h1>
              </Link>
            </div>
          </div>
          <div className="relative h-full w-[45%]">
            <img
              src={homeHero}
              alt="homeHero"
              className="h-full w-full object-cover"
            />
            <div className="hidden w-full xl:flex">
              <div className="absolute bottom-8 right-0">
                <HomeBooking
                  roomType={roomType}
                  location={locationParam}
                  persons={persons}
                  roomId={selectedRoomId}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full border-t-8 border-t-white bg-primary xl:hidden">
        <div className="w-full">
          <HomeBooking
            roomType={roomType}
            location={locationParam}
            persons={persons}
            roomId={selectedRoomId}
          />
        </div>
      </section>
      <section className="mt-14 w-full">
        <div className="container__x-paddings">
          <h1 className="text-center font-poppins text-[20px] font-medium lg:text-[40px]">
            Our facilities
          </h1>
          <h2 className="text-center font-poppins text-[10px] font-medium lg:text-[15px]">
            We offer modern (5 star) hotel facilities for your comfort.
          </h2>
          <div className="grid grid-cols-3 items-center justify-center gap-1 py-5 md:grid-cols-4 md:gap-5 md:py-10 xl:grid-cols-5 xl:gap-20">
            {facilities.map((facility) => (
              <div
                key={facility.id}
                className="col-span-1 row-span-1"
                data-aos="fade-down"
              >
                <Facility title={facility.title} icon={facility.icon} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="relative mt-10 h-[600px] w-full md:h-[680px] lg:h-[700px] xl:h-[700px]">
        <div className="h-full w-full bg-rooms bg-cover"></div>
        <div className="absolute inset-0 bg-secondary70"></div>
        <div className="container__x-paddings absolute left-0 right-0 top-[50px] flex flex-col items-center justify-center">
          <h1 className="relative font-raleway text-2xl font-medium text-white md:text-3xl lg:text-5xl">
            Luxurious rooms
            <span className="absolute left-1/3 top-[40px] h-1 w-[35%] bg-white lg:top-[60px]"></span>
          </h1>
          <p className="p-5 text-center font-raleway font-medium text-white lg:p-10">
            All rooms are designed for your comfort
          </p>
        </div>
        <div className="absolute inset-0 top-[100px] w-full py-10">
          <div className="container__x-paddings h-full">
            <Swiper
              navigation={true}
              pagination={true}
              keyboard={true}
              modules={[Navigation, Pagination, Keyboard]}
              breakpoints={generateBreakpointsRooms()}
              className="h-full w-full"
              data-aos="fade-right"
            >
              {filteredRooms.length > 0 ? (
                filteredRooms.map((room) => (
                  <SwiperSlide key={room.id} className="flex items-center">
                    <Link to={`/rooms`} className="mt-[100px] h-full">
                      <div className="flex h-full max-h-[330px] w-full max-w-[250px] flex-col rounded-md bg-primary p-4 md:max-h-[400px] md:max-w-[350px] lg:max-h-[395px] lg:max-w-[400px]">
                        <div className="relative">
                          <img
                            src={room.image}
                            alt="lux room"
                            className="h-[200px] w-full rounded-md object-cover md:h-[285px]"
                          />
                          <div className="absolute right-4 top-4 rounded-md bg-secondary p-2 font-bold text-white">
                            {countOfSpecificRoom[room.image]} available room(s)
                          </div>
                        </div>
                        <p className="py-3 text-justify font-raleway text-[17px]">
                          {room.description}
                        </p>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))
              ) : (
                <p></p>
              )}
            </Swiper>
          </div>
        </div>
      </section>
      <section className="h-auto pb-10">
        <h1 className="my-10 text-center font-raleway text-3xl font-medium lg:my-20 lg:text-5xl">
          Testimonies
        </h1>
        <div className="container__x-paddings h-auto">
          <Swiper
            keyboard={true}
            modules={[Keyboard]}
            className="h-full w-full"
            breakpoints={generateBreakpointsTestimoies()}
            data-aos="fade-up"
          >
            {testimoniesData.map((testimony) => (
              <SwiperSlide
                key={testimony._id}
                className="flex items-start justify-center"
              >
                <Testimonies
                  date={testimony.date}
                  review={testimony.review}
                  reviewer_name={testimony.reviewer_name}
                  reviewer_image={testimony.reviewer_image}
                  star={testimony.star}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="container__x-paddings">
          <Link to="/contact">
            <h1 className="text-center text-base text-secondary70 hover:text-secondary lg:text-xl">
              Wanna leave a review?
            </h1>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
