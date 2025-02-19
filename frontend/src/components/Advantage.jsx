import React from "react";

const Advantage = ({ imagePath, title, description }) => {
  return (
    <div
      className="relative flex h-[300px] w-full items-center justify-center rounded-[30px] bg-cover bg-center shadow-xl md:h-[500px] lg:h-[650px]"
      style={{ backgroundImage: `url(${imagePath})` }}
    >
      <div className="absolute top-[80%] mx-auto flex h-auto max-w-[85%] flex-col justify-evenly rounded-[30px] border-t-[10px] border-t-secondary bg-white text-center shadow-xl md:border-t-[15px] lg:border-t-[20px]">
        <h1 className="m:text-[24px] py-3 font-raleway text-[18px] font-semibold text-secondary md:py-5 md:text-[20px] xl:text-[28px]">
          {title}
        </h1>
        <p className="px-4 pb-5 font-raleway text-[10px] font-medium md:text-[15px] lg:px-7 lg:pb-10 xl:text-[20px]">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Advantage;