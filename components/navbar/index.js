import React, { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Icons } from "../icon";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

let navigations = [
  {
    label: "Home",
    url: "/",
  },
  {
    label: "About",
    type: "button",
    submenu: [
      {
        label: "About Us",
        url: "/about",
      },
      {
        label: "Massage",
        url: "/team",
      },
    ],
  },
  {
    label: "Properties",
    url: "/projects",
  },
  {
    label: "Press & Media",
    url: "/press-media",
  },
  {
    label: "Contact",
    url: "/contact",
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the menu
  const toggleMenu = () => setIsOpen(!isOpen);

  const menuVariants = {
    open: {
      clipPath: "circle(50% at 80% 50%)",
      transition: {
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
    closed: {
      clipPath: "circle(0px at 89% 5%)",
      transition: {
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 },
    },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      <header className="absolute left-0 top-0 z-[100] w-full bg-secondary-200">
        <nav className="container flex items-center justify-between py-4 md:py-2 sm:py-2">
          <div className="md:flex md:h-8 md:items-center">
            <Link href={"/"}>
              <svg
                className="md:h-6"
                width="80"
                height="32"
                viewBox="0 0 80 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6.37969 0L0 10.264V0H6.37969Z" fill="#A07758" />
                <path
                  d="M8.75856 0V31.9933H0V14.0633L8.73948 0H8.75856Z"
                  fill="#A07758"
                />
                <path
                  d="M60.0818 25.38V0H51.3232V32H60.0818H78.4894L79.5453 25.38H60.0818Z"
                  fill="#A07758"
                />
                <path
                  d="M47.0943 9.17756C45.167 3.61704 40.0721 0 34.4812 0H17.9054L12.3145 9.29228H32.2486C35.7342 9.29228 38.6855 12.221 38.711 15.919V16.081C38.6792 19.779 35.7406 22.7145 32.2486 22.7145H21.0666V13.3345H12.3145V32H34.4812C40.0276 32 45.0843 28.4369 47.0497 22.9507C47.0752 22.8697 47.107 22.7887 47.1324 22.7077C47.8448 20.609 48.2328 18.3551 48.2328 15.9933C48.2328 13.6381 47.8448 11.3842 47.1324 9.28553C47.1197 9.25179 47.107 9.21805 47.0943 9.17756Z"
                  fill="#A07758"
                />
              </svg>
            </Link>
          </div>
          <div className="md:hidden">
            <ul className="flex items-center gap-x-2">
              {navigations.map((item) => (
                <li>
                  {item.submenu ? (
                    <>
                      <DropdownMenu className="group p-0">
                        <DropdownMenuTrigger className="px-2 py-0 font-roboto text-lg text-neutral-300 hover:text-primary-300 group-hover:text-primary-300 lg:text-base">
                          {item.label}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-secondary-300 p-0">
                          {item.submenu.map((item) => (
                            <DropdownMenuItem className="p-0">
                              {" "}
                              <Link
                                className="hover:text-secondar-300 block w-full px-4 py-3 font-roboto text-lg text-primary-300 hover:bg-primary-300 hover:text-secondary-300 lg:text-base"
                                href={item.url}
                              >
                                {item.label}
                              </Link>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </>
                  ) : (
                    <Link
                      className="px-2 font-roboto text-lg text-neutral-300 hover:text-primary-300 lg:text-base"
                      href={item.url}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:hidden">
            <Link
              href={"/contact"}
              className="flex items-center gap-x-2 bg-primary-300 px-5 py-3 text-lg text-secondary-300 lg:text-base"
            >
              Schedule a Meeting <Icons.TopRight />
            </Link>
          </div>
          <div className="lg:hidden md:flex">
            <AnimatePresence>
              {!isOpen && (
                <motion.button
                  initial={{ opacity: 0, scale: 1 }}
                  animate={{ opacity: 1, scale: 0.8 }}
                  exit={{ opacity: 0, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => toggleMenu()}
                >
                  <svg
                    className="md:h-8"
                    width="32"
                    height="33"
                    viewBox="0 0 32 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 4.5H28M4 16.5H28M4 28.5H28"
                      stroke="#1D1D1D"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </nav>
        {/* mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Overlay for background */}
              <motion.div
                className="overlay"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={overlayVariants}
                style={{
                  position: "fixed",
                  top: 200,
                  left: 0,
                  width: "100vw",
                  height: "200px",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  zIndex: 99,
                }}
                onClick={toggleMenu} // Close the menu when overlay is clicked
              />

              {/* Animated Circle to Full-Screen */}
              <motion.div
                className="mobile-menu"
                initial="closed"
                animate="open"
                exit="closed"
                variants={menuVariants}
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  height: "100vh",
                  width: "100vw",
                  backgroundColor: "#fff",
                  zIndex: 100,
                }}
              >
                <nav style={{ paddingTop: "3rem", textAlign: "center" }}>
                  <ul>
                    <li>
                      <a href="#home">Home</a>
                    </li>
                    <li>
                      <a href="#about">About</a>
                    </li>
                    <li>
                      <a href="#services">Services</a>
                    </li>
                    <li>
                      <a href="#contact">Contact</a>
                    </li>
                    <li>
                      <Button onClick={() => toggleMenu()}>Close</Button>
                    </li>
                  </ul>
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
