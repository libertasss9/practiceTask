import { useState, useRef, useEffect } from "react";
import Advantage from "../components/Advantage";
import luxuriousRoom from "../assets/explore/luxurious rooms.webp";
import { MdPlayCircle, MdPauseCircle } from "react-icons/md";
import gymCenter from "../assets/explore/gym center.webp";
import restaurant from "../assets/explore/restaurant.webp";
import exploreVideo from "../assets/video/explore video.mp4";

const AdvantagesData = [
  {
    id: 1,
    imagePath: luxuriousRoom,
    title: "Luxurious rooms",
    description:
      "The elegant luxury bedrooms in this gallery showcase custom interior designs & decorating ideas. View pictures and find your perfect luxury bedroom design.Luxurious bedrooms that will make you never want to leave your room again. See more ideas about luxurious bedrooms, bedroom design.",
  },
  {
    id: 2,
    imagePath: gymCenter,
    title: "Gym center",
    description:
      "We have a modern and elegant gym center. You can enjoy our fitness classes and activities.",
  },
  {
    id: 3,
    imagePath: restaurant,
    title: "Restaurant",
    description:
      "We have a modern and elegant restaurant. You can enjoy our food and drinks. All of our food is fresh and delicious. We have",
  },
];

const Explore = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlayPause = async () => {
    const video = videoRef.current;

    if (video) {
      try {
        if (isPlaying) {
          await video.pause();
        } else {
          await video.play();
        }
        setIsPlaying(!isPlaying);
      } catch (error) {
        console.error(isPlaying ? "Error pausing the video:" : "Error playing the video:", error);
      }
    }
  };

  useEffect(() => {
    const video = videoRef.current;

    const handleEnded = () => {
      setIsPlaying(false);
    };

    if (video) {
      video.addEventListener("ended", handleEnded);
    }

    return () => {
      if (video) {
        video.removeEventListener("ended", handleEnded);
      }
    };
  }, []);

  return (
    <div>
      <section className="hero relative">
        <video
          width="750"
          height="500"
          src={exploreVideo}
          type="video/mp4"
          ref={videoRef}
          className="absolute inset-0 h-full w-full"
          style={{ objectFit: "cover" }}
        />

        <div className="absolute inset-0 bg-secondary opacity-30"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          {isPlaying ? (
            <MdPauseCircle
              className="size-20 cursor-pointer text-primary md:size-24 lg:size-32"
              onClick={handlePlayPause}
            />
          ) : (
            <MdPlayCircle
              className="size-20 cursor-pointer text-primary md:size-24 lg:size-32"
              onClick={handlePlayPause}
            />
          )}
        </div>
      </section>
      <section className="container__x-paddings w-full">
        <h1 className="py-5 text-center font-raleway text-[25px] font-semibold md:py-8 md:text-[35px] xl:py-12 xl:text-[40px]">
          Take a tour
        </h1>
        {AdvantagesData.map((advantage) => (
          <div key={advantage.id} className="pb-32 lg:pb-40">
            <Advantage {...advantage} />
          </div>
        ))}
      </section>
    </div>
  );
};

export default Explore;
