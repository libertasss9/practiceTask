import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/icons/logo.svg";
import { companyLinks, socialMedia } from "./Footer";

const NavbarMenu = [
  { id: 1, title: "Home", link: "/" },
  { id: 2, title: "Explore", link: "/Explore" },
  { id: 3, title: "Rooms", link: "/Rooms" },
  { id: 4, title: "About", link: "/About" },
  { id: 5, title: "Contact", link: "/Contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="fixed top-0 z-20 w-full bg-primary shadow-md">
      <div className="container__x-paddings py-4 lg:py-6">
        <div className="flex items-center justify-between">
          <div className="h-[29px] w-[50px] lg:h-[32px] lg:w-[55px]">
            <Link to="/">
              <img src={logo} alt="logo" className="h-full w-full" />{" "}
            </Link>
          </div>
          <nav className="hidden md:flex">
            <ul className="flex items-center gap-8 lg:gap-14 2xl:gap-24">
              {NavbarMenu.map((link) => {
                const isActive = location.pathname === link.link;
                return (
                  <li key={link.id}>
                    <Link
                      to={link.link}
                      className={`text-poppins text-[15px] font-medium hover:text-secondary hover:underline hover:underline-offset-4 lg:text-[17px] ${
                        isActive
                          ? "text-secondary underline underline-offset-4"
                          : ""
                      }`}
                      style={{
                        textDecorationColor: isActive ? "secondary" : "",
                      }}
                    >
                      {link.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="flex items-center gap-5">
            <Link to="/#homeBooking">
              <button className="btn">Book now</button>
            </Link>
            <div className="block md:hidden">
              {menuOpen && (
                <div
                  className="fixed inset-0 z-50 bg-black bg-opacity-50"
                  onClick={toggleMenu}
                >
                  <div className="fixed inset-y-0 left-0 z-50 flex w-[80vw] flex-col bg-primary shadow-lg">
                    <div className="mt-6 text-center">
                      <h1 className="p-4 font-raleway text-2xl font-semibold text-secondary">
                        Navigation
                      </h1>
                      <ul className="flex flex-col gap-2 px-8">
                        {NavbarMenu.map((item) => (
                          <li
                            key={item.id}
                            className="font-raleway font-semibold"
                          >
                            <Link to={item.link} onClick={toggleMenu}>
                              {item.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="text-center">
                      <h1 className="p-4 font-raleway text-2xl font-semibold text-secondary">
                        Company
                      </h1>
                      <ul className="flex flex-col gap-2 px-8">
                        {companyLinks.map((item) => (
                          <li
                            key={item.id}
                            className="font-raleway font-semibold"
                          >
                            <Link to={item.link} onClick={toggleMenu}>
                              {item.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <h1 className="p-4 font-raleway text-2xl font-semibold text-secondary">
                        Social Media
                      </h1>
                      <ul className="flex items-center gap-4 px-8">
                        {socialMedia.map((item) => (
                          <li
                            key={item.id}
                            className="font-raleway font-semibold"
                          >
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {item.icon}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div
                      className="absolute right-5 top-5"
                      onClick={toggleMenu}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              )}
              <div className="block md:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  onClick={toggleMenu}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
