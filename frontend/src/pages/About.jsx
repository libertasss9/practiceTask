import Hero from "../components/Hero";
import managerPortrait from "../assets/about/manager-portrait.webp";
import nnpc from "../assets/clients/nnpc.svg";
import cbn from "../assets/clients/cbn.svg";
import ncc from "../assets/clients/ncc.svg";
import UN from "../assets/clients/UN.svg";
import nirsal from "../assets/clients/nirsal.svg";

const clients = [
  {
    id: 1,
    image: nnpc,
    link: "https://www.nnpc.gov.ng/",
  },
  {
    id: 2,
    image: cbn,
    link: "https://www.cbn.gov.ng/",
  },
  {
    id: 3,
    image: ncc,
    link: "https://ncc.gov.ng/",
  },

  {
    id: 4,
    image: UN,
    link: "https://www.un.org/en/",
  },
  {
    id: 5,
    image: nirsal,
    link: "https://nirsal.com/",
  },
];

const About = () => {
  return (
    <div>
      <section>
        <Hero
          title="About us"
          subtitle="The elegant luxury bedrooms in this gallery showcase custom interior designs & decorating ideas. View pictures and find your perfect luxury bedroom design."
        />
      </section>
      <section className="container__x-paddings h-auto pt-10 md:pt-16 lg:pt-0">
        <div className="mx-auto max-w-[1400px] flex flex-col justify-between gap-12 lg:mt-20 lg:flex-row lg:items-start h-full">
          <div className="flex flex-col items-center justify-center lg:max-w-[45%] lg:pt-[30px]">
            <img
              src={managerPortrait}
              alt="manager"
              className="w-[300px] shadow-smallShadow md:w-[350px] md:shadow-mediumShadow lg:w-[460px] lg:shadow-imageShadow xl:w-[480px]"
            />
            <h1 className="pt-3 text-center font-mulish text-[30px] font-semibold">
              Chidinma James (Manager)
            </h1>
          </div>
          <div className="lg:max-w-[45%]">
            <p className="text-justify font-mulish text-[15px] font-medium leading-snug">
              The United Nations is an international organization founded in
              1945. Currently made up of 193{" "}
              <span className="underline">Member States</span>, the{" "}
              <span className="underline">UN and its work</span> are guided by
              the purposes and principles contained in its founding{" "}
              <span className="underline">Secretary-General</span>. The UN has
              evolved over the years to keep pace with a rapidly changing world.
              But one thing has stayed the same: it remains the one place on
              Earth where all the world’s nations can gather together, discuss
              common problems, and find shared solutions that benefit all of
              humanity. The <span className="underline">Security-General</span>
              is Chief Administrative Officer of the UN – and is also a symbol
              of the Organization's ideals and an advocate for all the world's
              peoples, especially the poor and vulnerable.
              <br />
              <br />
              The Secretary-General is appointed by the{" "}
              <span className="underline">General Assembly</span> on the
              recommendation of the{" "}
              <span className="underline">Security Council</span> for a 5-year,
              renewable term. The current Secretary-General, and the 9th
              occupant of the post, is António Guterres of Portugal, who took
              office on 1 January 2017. On the 18th of June, 2021,{" "}
              <span className="underline">
                Guterres was re-appointed to a second term
              </span>
              , pledging as his priority to continue helping the world chart a
              course out of the <span className="underline">COVID-19</span>{" "}
              pandemic.
              <br />
              <br />
              The United Nations is an international organization founded in
              1945. Currently made up of 193{" "}
              <span className="underline">Member States</span>, the{" "}
              <span className="underline">UN and its work</span> are guided by
              the purposes and principles contained in its founding{" "}
              <span className="underline">Secretary-General</span>. The UN has
              evolved over the years to keep pace with a rapidly changing world.
              But one thing has stayed the same: it remains the one place on
              Earth where all the world’s nations can gather together, discuss
              common problems, and find shared solutions that benefit all of
              humanity. The <span className="underline">Security-General</span>
              is Chief Administrative Officer of the UN – and is also a symbol
              of the Organization's ideals and an advocate for all the world's
              peoples, especially the poor and vulnerable.
              <br />
              <br />
              The Secretary-General is appointed by the{" "}
              <span className="underline">General Assembly</span> on the
              recommendation of the{" "}
              <span className="underline">Security Council</span> for a 5-year,
              renewable term. The current Secretary-General, and the 9th
              occupant of the post, is António Guterres of Portugal, who took
              office on 1 January 2017. On the 18th of June, 2021,{" "}
              <span className="underline">
                Guterres was re-appointed to a second term
              </span>
              , pledging as his priority to continue helping the world chart a
              course out of the <span className="underline">COVID-19</span>{" "}
              pandemic.
            </p>
          </div>
        </div>
      </section>
      <section className="container__x-paddings my-10 lg:my-20">
        <div className="flex w-full flex-col items-center justify-center">
          <h1 className="text-center font-mulish text-[30px] font-semibold">
            Clients
          </h1>
          <div className="flex w-full items-center justify-evenly md:max-w-[750px]">
            {clients.map((client) => (
              <a
                key={client.id}
                href={client.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3"
              >
                <img src={client.image} alt="client logo" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
