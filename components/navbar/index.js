import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Icons } from "../icon";
import { Menu } from "@headlessui/react";
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
    closed: { rotate: 0, translateY: 0 },
    opened: { rotate: 45, translateY: 2 },
  };
  const center = { closed: { opacity: 1 }, opened: { opacity: 0 } };
  const bottom = {
    closed: { rotate: 0, translateY: 0 },
    opened: { rotate: -45, translateY: -2 },
  };
  lineProps = {
    stroke: color,
    strokeWidth,
    vectorEffect: "non-scaling-stroke",
    initial: "closed",
    animate: variant,
    transition,
    ...lineProps,
  };
  const unitHeight = 4,
    unitWidth = (unitHeight * width) / height;

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

const navigations = [
  { label: "Home", url: "/" },
  {
    label: "About",
    submenu: [
      { label: "About Us", url: "/about" },
      { label: "Massage", url: "/team" },
    ],
  },
  { label: "Properties", url: "/projects" },
  { label: "Press & Media", url: "/press-media" },
  { label: "Contact", url: "/contact" },
];

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { isOpenFormModal, open, close } = useModal();
  const [scrollingUp, setScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isInBanner, setIsInBanner] = useState(true);
  const [isHomePage, setIsHomePage] = useState(router.pathname === "/");

  const handleScroll = () => {
    if (typeof window !== "undefined") {
      const currentScrollY = window.scrollY;
      const isScrollingUp = currentScrollY < lastScrollY;
      if (currentScrollY < window.innerHeight) {
        setIsInBanner(true);
      } else {
        setIsInBanner(false);
      }
      // // Adjust the scroll speed calculation to make hiding faster
      // const scrollSpeed = Math.min(
      //   (Math.abs(currentScrollY - lastScrollY) * 2.5) / 100,
      //   1,
      // ); // Amplify speed and cap at 1

      setScrollingUp(isScrollingUp);
      setLastScrollY(currentScrollY);

      if (!isScrollingUp) {
        document.documentElement.style.setProperty(
          "--scroll-speed",
          70,
          // scrollSpeed.toString(),
        ); // Set CSS variable for animation speed
      }
    }
  };

  useEffect(() => setIsHomePage(router.pathname === "/"), [router.pathname]);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const headerVariants = {
    hidden: {
      y: -100,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
    visible: { y: 0, opacity: 1, transition: { duration: 0.3 } },
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {scrollingUp && (
          <motion.header
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={headerVariants}
            className={`fixed left-0 top-0 z-[100] w-full ${
              isInBanner && isHomePage ? "bg-transparent" : "bg-secondary-300"
            } transition-all duration-300`}
          >
            <nav className="container mx-auto flex items-center justify-between py-4 md:py-2">
              <div className="md:flex md:h-8 md:items-center">
                <Link href={"/"}>
                  <Icons.logo className="h-8 md:h-6" />
                </Link>
              </div>
              <div className="md:hidden">
                <ul className="flex gap-x-2">
                  {navigations.map((item) => (
                    <li key={item.label} className="relative">
                      {item.submenu ? (
                        <Menu className="group relative">
                          {({ open }) => (
                            <>
                              <Menu.Button
                                className={`px-2 font-roboto text-lg ${isInBanner && isHomePage ? "text-secondary-300" : "text-neutral-300"} hover:text-primary-300`}
                              >
                                {item.label}
                              </Menu.Button>
                              <Menu.Items
                                className={`absolute left-0 mt-2 w-48 rounded-md bg-secondary-300 shadow-lg ${open ? "" : "hidden"}`}
                              >
                                {item.submenu.map((submenu) => (
                                  <Menu.Item key={submenu.label}>
                                    {({ active }) => (
                                      <Link
                                        href={submenu.url}
                                        className={`block px-4 py-2 text-[16px] hover:bg-primary-300 hover:text-secondary-300 ${active ? "bg-gray-100" : ""}`}
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
                      ) : (
                        <Link
                          className={`px-2 font-roboto text-lg ${isInBanner && isHomePage ? "text-secondary-300" : "text-neutral-300"} hover:text-primary-300`}
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
                  className={`flex items-center gap-x-2 border-2 border-primary px-5 py-3 text-lg text-secondary-300 ${isInBanner && isHomePage ? "bg-transparent" : "bg-primary-300"}`}
                >
                  Schedule a Meeting <Icons.TopRight />
                </button>
              </div>
              <div className="hidden md:flex">
                <MenuButton
                  isOpen={isOpen}
                  onClick={() => setIsOpen(!isOpen)}
                />
              </div>
            </nav>
          </motion.header>
        )}
      </AnimatePresence>
      <ScheduleFormModal
        isOpen={isOpenFormModal}
        onClose={close}
        onSubmit={() => {}}
        title="User Information"
      />
    </>
  );
}
