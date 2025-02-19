import React from "react";

const Hero = ({ title, subtitle, icon, scrollToSection, showIcon }) => {
  return (
    <>
      <div className="relative">
        <div className="hero bg-hero bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-secondary opacity-30"></div>
        <div className="absolute top-0 flex h-full w-full flex-col items-center justify-center">
          <h1 className="mx-auto p-5 font-mulish text-2xl font-extrabold text-white lg:text-4xl xl:text-5xl">
            {title}
          </h1>
          <p className="w-[50%] pb-3 md:p-5 text-center font-mulish text-xs font-semibold text-white md:text-base lg:text-xl">
            {subtitle}
          </p>
          {showIcon && (
            <span
              onClick={scrollToSection}
              className="flex p-2 md:h-16 md:w-9 cursor-pointer items-center justify-center rounded-full border-2 text-white"
            >
              {icon}
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default Hero;
