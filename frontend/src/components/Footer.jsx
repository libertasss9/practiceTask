import { useState, useEffect } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const quickLinks = [
  { id: 1, title: "Room bookin", link: "/" },
  { id: 2, title: "Rooms", link: "/rooms" },
  { id: 3, title: "Contact", link: "/contact" },
  { id: 4, title: "Explore", link: "/explore" },
];

const companyLinks = [
  { id: 1, title: "Privacy policy", link: "#" },
  { id: 2, title: "Refund policy", link: "#" },
  { id: 3, title: "F.A.Q", link: "/contact" },
  { id: 4, title: "About", link: "/about" },
];

const socialMedia = [
  {
    id: 1,
    title: "Facebook",
    icon: <FaFacebook className="size-6" />,
    link: "https://facebook.com",
  },
  {
    id: 2,
    title: "Twitter",
    icon: <FaTwitter className="size-6" />,
    link: "https://twitter.com",
  },
  {
    id: 3,
    title: "Instagram",
    icon: <FaInstagram className="size-6" />,
    link: "https://instagram.com",
  },
  {
    id: 4,
    title: "Linkedin",
    icon: <FaLinkedin className="size-6" />,
    link: "https://linkedin.com",
  },
];

const Footer = () => {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setErrorMessage("Email address is required.");
      return;
    }

    try {
      const response = await fetch("/api/v1/mails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address: email }),
      });

      if (response.ok) {
        setSuccessMessage("Subscription successful!");
        setErrorMessage("");
        setEmail("");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Subscription failed.");
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Error submitting email:", error);
      setErrorMessage("An error occurred. Please try again.");
      setSuccessMessage("");
    }
  };

  const clearMessages = () => {
    setSuccessMessage("");
    setErrorMessage("");
  };

  useEffect(() => {
    document.addEventListener("click", clearMessages);

    return () => {
      document.removeEventListener("click", clearMessages);
    };
  }, []);

  return (
    <footer className="bg-secondary text-white">
      <section className="container__x-paddings items-top justify-between py-5 md:flex md:py-10">
        <div className="hidden xl:block">
          <h1 className="p-2 text-center font-dancing text-4xl font-bold text-lightGray md:text-left md:text-2xl md:text-white lg:text-3xl">
            Paradise view
          </h1>
          <p className="w-[17vw] p-2 text-left font-raleway text-xs font-bold leading-snug lg:text-sm">
            The service at the Hotel Monteleone was exceptional. There was
            absolutely no issue that was not addressed timely and with
            satisfactory results. We were particulary impressed with how the
            hotel staff anticipated our needs (periodically coming by the Board
            Room to check with us)
          </p>
        </div>
        <div className="hidden p-3 md:block">
          <h1 className="footer__list-title">Quick Links</h1>
          <ul className="footer__list">
            {quickLinks.map((item) => (
              <li key={item.id} className="footer__list-item">
                <a href={item.link}>{item.title}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden p-3 md:block">
          <h1 className="footer__list-title">Company</h1>
          <ul className="footer__list">
            {companyLinks.map((item) => (
              <li key={item.id} className="footer__list-item">
                <a href={item.link}>{item.title}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden p-3 md:block">
          <h1 className="footer__list-title">Social Media</h1>
          <ul className="footer__list">
            {socialMedia.map((item) => (
              <li key={item.id} className="footer__list-item">
                <a href={item.link}>{item.title}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-6 p-3">
          <div>
            <h1 className="footer__list-title text-center md:text-left">
              Newsletter
            </h1>
            <p className="footer__list-item p-2 text-center leading-snug md:text-justify lg:w-[18rem]">
              Kindly subscribe to our newsletter to get latest deals on our
              rooms and vacation discount.
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex h-auto w-full max-w-[500px] mx-auto flex-col gap-3 rounded-md bg-white p-3"
          >
            <div className="flex gap-3 md:flex-col lg:flex-row md:items-center md:gap-3">
              <input
                type="email"
                id="email"
                placeholder="john.becker@gmail.com"
                autoComplete="on"
                className="w-full text-darkGray focus:outline-none"
                value={email}
                onChange={handleEmailChange}
              />
              <button
                type="submit"
                className="btn px-6 py-2 md:w-full lg:px-4 lg:py-2"
              >
                Subscribe
              </button>
            </div>
          </form>

          <div className="mx-auto">
            {successMessage && (
              <p className="w-52 rounded-lg bg-green text-center">
                {successMessage}
              </p>
            )}
            {errorMessage && (
              <p className="w-52 rounded-lg bg-red text-center">
                {errorMessage}
              </p>
            )}
          </div>
        </div>
      </section>
      <div className="h-[0.1rem] w-full bg-primary opacity-40"></div>
      <section className="p-5 text-center md:p-10">
        <h1 className="font-raleway font-semibold">Paradise view 2024</h1>
      </section>
    </footer>
  );
};

export { Footer as default, companyLinks, socialMedia };
