import React, { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Icons } from "../icon";
import { Menu } from "@headlessui/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/router";

import ScheduleFormModal, {
  useModal,
} from "@/components/form/schedule-form-modal";

const MenuButton = ({
  isOpen = false,
  width = 24,
  height = 24,
  strokeWidth = 1,
  color = "#000",
  transition = null,
  lineProps = null,
  ...props
}) => {
  const variant = isOpen ? "opened" : "closed";
  const top = {
    closed: {
      rotate: 0,
      translateY: 0,
    },
    opened: {
      rotate: 45,
      translateY: 2,
    },
  };
  const center = {
    closed: {
      opacity: 1,
    },
    opened: {
      opacity: 0,
    },
  };
  const bottom = {
    closed: {
      rotate: 0,
      translateY: 0,
    },
    opened: {
      rotate: -45,
      translateY: -2,
    },
  };
  lineProps = {
    stroke: color,
    strokeWidth: strokeWidth,
    vectorEffect: "non-scaling-stroke",
    initial: "closed",
    animate: variant,
    transition,
    ...lineProps,
  };
  const unitHeight = 4;
  const unitWidth = (unitHeight * width) / height;

  return (
    <motion.svg
      viewBox={`0 0 ${unitWidth} ${unitHeight}`}
      overflow="visible"
      preserveAspectRatio="none"
      width={width}
      height={height}
      {...props}
    >
      <motion.line
        x1="0"
        x2={unitWidth}
        y1="0"
        y2="0"
        variants={top}
        {...lineProps}
      />
      <motion.line
        x1="0"
        x2={unitWidth}
        y1="2"
        y2="2"
        variants={center}
        {...lineProps}
      />
      <motion.line
        x1="0"
        x2={unitWidth}
        y1="4"
        y2="4"
        variants={bottom}
        {...lineProps}
      />
    </motion.svg>
  );
};

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
  const router = useRouter();

  let press_media = router.pathname === "/press-media";
  console.log({ press_media });

  const [isOpen, setIsOpen] = useState(false);

  // Toggle the menu
  const toggleMenu = () => setIsOpen(!isOpen);

  const { isOpenFormModal, open, close } = useModal();

  const handleSubmit = (data) => {
    console.log("Form submitted:", data);
    // Handle the form submission
  };

  const menuVariants = {
    open: {
      clipPath: "circle(100% at 80% 50%)",
      transition: {
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
    closed: {
      clipPath: "circle(0px at 95% 3%)",
      transition: {
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0, filter: "blur(30px)" },
    visible: {
      opacity: 1,
      filter: "blur(0)",
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
                <li className="relative">
                  {item.submenu ? (
                    <>
                      <Menu className="group relative">
                        {({ open }) => (
                          <>
                            <Menu.Button
                              className={`px-2 font-roboto text-lg text-neutral-300 hover:text-primary-300 group-hover:text-primary lg:text-base ${open ? "text-primary" : ""} `}
                            >
                              {item.label}
                            </Menu.Button>
                            <Menu.Items
                              className={`absolute left-0 mt-2 w-48 rounded-md bg-secondary-300 shadow-lg ${
                                open ? "" : "hidden"
                              }`}
                            >
                              {item.submenu.map((submenu, subIndex) => (
                                <Menu.Item key={subIndex}>
                                  {({ active }) => (
                                    <Link
                                      href={submenu.url}
                                      className={`block px-4 py-2 text-[16px] hover:bg-primary-300 hover:text-secondary-300 ${
                                        active ? "bg-gray-100" : ""
                                      }`}
                                    >
                                      {submenu.label}
                                    </Link>
                                  )}
                                </Menu.Item>
                              ))}
                            </Menu.Items>
                          </>
                        )}
                      </Menu>
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
            <button
              onClick={open}
              className="flex items-center gap-x-2 bg-primary-300 px-5 py-3 text-lg text-secondary-300 lg:text-base"
            >
              Schedule a Meeting <Icons.TopRight />
            </button>
          </div>
          <div className="hidden md:flex">
            <AnimatePresence>
              <MenuButton
                className="relative z-[300] cursor-pointer"
                isOpen={isOpen}
                style={{ marginLeft: "2rem" }}
                onClick={toggleMenu}
              />
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
                  zIndex: 99,
                }}
                onClick={toggleMenu} // Close the menu when overlay is clicked
              />

              {/* Animated Circle to Full-Screen */}
              <motion.div
                className="mobile-menu container bg-primary"
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
                  zIndex: 100,
                }}
              >
                <div className="border-b border-b-secondary-300 pb-3 sm:pt-4">
                  <Link href={"/"}>
                    <svg
                      width="60"
                      height="25"
                      viewBox="0 0 60 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.81209 0.5L0 8.19802V0.5H4.81209Z"
                        fill="#F6F3EC"
                      />
                      <path
                        d="M6.60643 0.5V24.4949H0V11.0474L6.59204 0.5H6.60643Z"
                        fill="#F6F3EC"
                      />
                      <path
                        d="M45.3191 19.535V0.5H38.7126V24.5H45.3191H59.2036L60 19.535H45.3191Z"
                        fill="#F6F3EC"
                      />
                      <path
                        d="M35.5221 7.38317C34.0684 3.21278 30.2255 0.5 26.0083 0.5H13.5055L9.28833 7.46921H24.3243C26.9535 7.46921 29.1796 9.66575 29.1988 12.4393V12.5607C29.1748 15.3342 26.9582 17.5358 24.3243 17.5358H15.89V10.5008H9.28833V24.5H26.0083C30.1919 24.5 34.0061 21.8277 35.4886 17.713C35.5077 17.6523 35.5317 17.5915 35.5509 17.5308C36.0883 15.9568 36.3809 14.2663 36.3809 12.4949C36.3809 10.7286 36.0883 9.03817 35.5509 7.46415C35.5413 7.43884 35.5317 7.41354 35.5221 7.38317Z"
                        fill="#F6F3EC"
                      />
                    </svg>
                  </Link>
                </div>
                <ul className="ustify-center mt-8 flex flex-col items-start gap-y-4">
                  {navigations.map((item) => (
                    <li className="relative text-secondary-300">
                      {item.submenu ? (
                        <>
                          <Menu className="group relative">
                            {({ open }) => (
                              <>
                                <Menu.Button
                                  className={`px-2 font-roboto text-lg text-secondary-300`}
                                >
                                  {item.label}
                                </Menu.Button>
                                <Menu.Items
                                  className={`absolute left-0 z-50 mt-2 w-48 rounded-md border bg-primary-300 shadow-lg ${
                                    open ? "" : "hidden"
                                  }`}
                                >
                                  {item.submenu.map((submenu, subIndex) => (
                                    <Menu.Item key={subIndex}>
                                      {({ active }) => (
                                        <Link
                                          href={"/" + submenu.url}
                                          onClick={toggleMenu}
                                          className={`block px-4 py-2 text-[16px] hover:bg-primary-300 hover:text-secondary-300 ${
                                            active ? "bg-gray-100" : ""
                                          }`}
                                        >
                                          {submenu.label}
                                        </Link>
                                      )}
                                    </Menu.Item>
                                  ))}
                                </Menu.Items>
                              </>
                            )}
                          </Menu>
                        </>
                      ) : (
                        <Link
                          className="px-2 font-roboto text-lg text-secondary-300"
                          href={item.url}
                          onClick={toggleMenu}
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      <ScheduleFormModal
        isOpen={isOpenFormModal}
        onClose={close}
        onSubmit={handleSubmit}
        title="User Information"
      />
    </>
  );
}
