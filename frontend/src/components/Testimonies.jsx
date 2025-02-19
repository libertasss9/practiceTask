import { MdStar } from "react-icons/md";


const Testimonies = ({ date, review, reviewer_name, reviewer_image, star }) => {


  return (
    <div className="relative mb-10 flex h-auto w-full max-w-[450px] flex-col rounded-md bg-primary font-poppins">
      <p className="flex items-center justify-between px-6 py-10 lg:px-8">
        <span className="text-sm font-[500] text-darkGray">{date}</span>
        <span className="flex md:gap-1 text-sm">
          {[...Array(5)].map((_, index) => (
            <MdStar
              key={index}
              className={index < star ? "text-yellow" : "text-darkGray60"}
            />
          ))}
        </span>
      </p>
      <blockquote className="relative flex h-[150px] cursor-pointer overflow-x-auto px-6 text-justify font-raleway font-[500] leading-snug text-darkGray lg:px-8">
        <div
          className="full scrollbar-hide w-full overflow-x-auto fade-right"
        >
          <span className="quote-mark pr-1 align-super">
            <svg
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              height="24px"
              viewBox="0 0 512.000000 512.000000"
              preserveAspectRatio="xMidYMid meet"
            >
              <g
                transform="translate(512.000000,0.000000) scale(-0.100000,0.100000)"
                fill="#7C6A46"
                stroke="none"
              >
                <path d="M0 3290 l0 -1100 545 0 c300 0 545 -2 545 -5 0 -3 -162 -329 -360 -725 -198 -396 -360 -722 -360 -725 0 -3 245 -5 545 -5 l545 0 365 730 365 730 0 1100 0 1100 -1095 0 -1095 0 0 -1100z" />
                <path d="M2930 3290 l0 -1100 545 0 545 0 -365 -730 -365 -730 550 0 550 0 365 730 365 730 0 1100 0 1100 -1095 0 -1095 0 0 -1100z" />
              </g>
            </svg>
          </span>
          {review}
          <span className="quote-mark translate-x-1 translate-y-2 align-sub">
            <svg
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              height="24px"
              viewBox="0 0 512.000000 512.000000"
              preserveAspectRatio="xMidYMid meet"
            >
              <g
                transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                fill="#7C6A46"
                stroke="none"
              >
                <path
                  d="M0 3290 l0 -1100 545 0 c300 0 545 -2 545 -5 0 -3 -162 -329 -360
  -725 -198 -396 -360 -722 -360 -725 0 -3 245 -5 545 -5 l545 0 365 730 365
  730 0 1100 0 1100 -1095 0 -1095 0 0 -1100z"
                />
                <path
                  d="M2930 3290 l0 -1100 545 0 545 0 -365 -730 -365 -730 550 0 550 0
  365 730 365 730 0 1100 0 1100 -1095 0 -1095 0 0 -1100z"
                />
              </g>
            </svg>
          </span>
        </div>
      </blockquote>
      <p className="flex items-center gap-1 px-6 py-4 lg:gap-3 lg:px-8">
        <img
          src={reviewer_image}
          alt="customer"
          className="size-10 rounded-full"
        />
        <span className="p-3 text-sm font-[500] text-darkGray md:p-5 md:text-base">
          {reviewer_name}
        </span>
      </p>
    </div>
  );
};

export default Testimonies;