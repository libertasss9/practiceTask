import {useEffect} from "react";
import Aos from "aos";
import "aos/dist/aos.css";

const Facility = ({ title, icon }) => {
    useEffect(() => {
        Aos.init({ duration: 700 });
      }, []);
  return (
    <div className="flex flex-col justify-center items-center gap-2 lg:gap-4 bg-primary aspect-square">
      {icon}
      <h1 className="text-secondary font-poppins font-medium text-[12px] md:text-base lg:text-lg">{title}</h1>
    </div>
  );
};

export default Facility;
