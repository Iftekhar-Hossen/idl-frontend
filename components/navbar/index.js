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
  color = "#fff",
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
      className={"relative z-[9999999]"}
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

const menuVariants = {
  closed: {
    opacity: 0,
    y: "-100%",
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  open: {
    opacity: 1,
    y: "0%",
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const submenuVariants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  open: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

const containerVariants = {
  closed: {
    opacity: 0,
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
  open: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  closed: {
    opacity: 0,
    x: -20,
  },
  open: {
    opacity: 1,
    x: 0,
  },
};

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { isOpenFormModal, open, close } = useModal();
  const [scrollingUp, setScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isInBanner, setIsInBanner] = useState(true);
  const [isHomePage, setIsHomePage] = useState(router.pathname === "/");
  const [openSubmenu, setOpenSubmenu] = useState(null);

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
            <nav className="container mx-auto flex items-center justify-between py-4 md:py-4">
              <div className="md:flex md:h-8 md:items-center">
                <Link href={"/"}>
                  {isInBanner && isHomePage ? (
                    <img src="/logo-light.svg" alt="logo" className="h-8" />
                  ) : (
                    <img src="/logo-dark.svg" alt="logo" className="h-8" />
                  )}
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
                  className={`flex items-center gap-x-2 border-2 border-primary px-5 py-3 text-lg text-secondary-300 ease-in-out hover:bg-primary-500 ${isInBanner && isHomePage ? "bg-transparent" : "bg-primary-300"}`}
                >
                  Schedule a Meeting <Icons.TopRight />
                </button>
              </div>
              <div className="hidden md:flex sm:flex">
                <MenuButton
                  isOpen={isOpen}
                  color={isInBanner && isHomePage ? "#fff" : "#000"}
                  onClick={() => setIsOpen(!isOpen)}
                />
              </div>
            </nav>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Mobile Navigation */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-40 bg-primary"
          >
            <motion.div
              className="flex h-full flex-col overflow-y-auto px-4 pb-6 pt-20"
              variants={containerVariants}
            >
              {navigations.map((item) => (
                <motion.div
                  key={item.label}
                  variants={itemVariants}
                  className="py-1"
                >
                  {item.submenu ? (
                    <div>
                      <div
                        className="flex cursor-pointer items-center justify-between px-3 py-1 text-xl font-medium text-secondary-300"
                        onClick={() =>
                          setOpenSubmenu(
                            openSubmenu === item.label ? null : item.label,
                          )
                        }
                      >
                        <span>{item.label}</span>
                        {/* <ChevronDown 
                          className={`h-5 w-5 transition-transform duration-200 ${
                            openSubmenu === item.label ? 'rotate-180' : ''
                          }`}
                        /> */}
                      </div>
                      <AnimatePresence>
                        {openSubmenu === item.label && (
                          <motion.div
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={submenuVariants}
                            className="pl-6"
                          >
                            {item.submenu.map((subitem) => (
                              <Link
                                key={subitem.label}
                                href={subitem.url}
                                onClick={() => setIsOpen(false)}
                                className="block px-3 py-2 text-lg text-secondary-300"
                              >
                                {subitem.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.url}
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-1 text-xl font-medium text-secondary-300"
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
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
