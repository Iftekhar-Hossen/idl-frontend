import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import ViewProperties from "@/components/ViewProperties";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Listbox } from "@headlessui/react";
import { Icons } from "@/components/icon";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { CounterAnimation } from "@/components/animation/counter";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
function SearchProperty({ locationsData }) {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState();
  const [properties, setProperties] = useState([]);

  return (
    <div className="flex gap-2">
      <div className="w-72">
        <Listbox value={selectedLocation} onChange={setSelectedLocation}>
          {({ open }) => (
            <div className="relative">
              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-neutral-300 px-5 py-2 text-left text-secondary-500 shadow-md focus:outline-none focus:ring-0 sm:text-sm">
                <label className="block text-left text-[12px] text-sm font-medium text-primary-50">
                  Location
                </label>
                <span className="block truncate text-[15px]">
                  {selectedLocation ? selectedLocation.name : "Select Location"}
                </span>
                <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 pr-2">
                  <motion.svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="transform transition-transform"
                  >
                    <path
                      d="M6 9L12 15L18 9"
                      stroke="#F6F1EE"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                </span>
              </Listbox.Button>
              <AnimatePresence>
                {open && (
                  <motion.div
                    key="listbox-options"
                    initial={{ opacity: 0, y: -10, scaleY: 0.97 }}
                    animate={{ opacity: 1, y: 0, scaleY: 1 }}
                    exit={{ opacity: 0, y: -10, scaleY: 0.97 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-neutral-300 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                  >
                    <Listbox.Options>
                      {locationsData.map((location) => (
                        <Listbox.Option
                          key={location.id}
                          className={({ active }) =>
                            `relative z-50 cursor-default select-none py-2 pl-10 pr-4 text-left ${
                              active
                                ? "bg-primary-300 text-secondary-300"
                                : "text-primary-300"
                            }`
                          }
                          value={location}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                {location.name}
                              </span>
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </Listbox>
      </div>
      <div className="w-72">
        <Listbox value={selectedProperty} onChange={setSelectedProperty}>
          <div className="relative">
            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-neutral-300 px-5 py-2 text-left text-secondary-500 shadow-md focus:outline-none focus:ring-0 sm:text-sm">
              <label className="block text-left text-[12px] text-sm font-medium text-primary-50">
                Property
              </label>
              <span className="block truncate text-[15px]">
                {selectedProperty?.name || "Select Property"}
              </span>
              <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 pr-2">
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="#F6F1EE"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Listbox.Button>
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-neutral-300 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {properties.map((property) => (
                <Listbox.Option
                  key={property.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 text-left ${active ? "bg-primary-300 text-secondary-300" : "text-primary-300"}`
                  }
                  value={property}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${selected ? "font-medium" : "font-normal"}`}
                      >
                        {property.name}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>
      </div>
      <div>
        <Button className="h-full gap-2 self-stretch bg-primary text-base font-normal text-secondary-50 hover:bg-primary-300">
          <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
              stroke="#FEFEFD"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21.0004 20.9984L16.6504 16.6484"
              stroke="#FEFEFD"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Search</span>
        </Button>
      </div>
    </div>
  );
}
export const Hero = ({ locationsData }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const counts = [
    { count: 5, label: "Handover Projects" },
    { count: 5, label: "Ongoing Projects" },
    { count: 9, label: "Upcoming Projects" },
  ];

  return (
    <>
      <section className="align-between flex flex-wrap justify-center overflow-hidden bg-primary-50 sm:h-auto">
        <div className="relative z-50 h-[521px] pt-48 text-center md:h-[465px] md:pt-32 sm:h-auto sm:pt-24">
          <motion.h3
            initial={{ y: -100, opacity: 0, filter: "blur(10px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0)" }}
            transition={{
              duration: 0.5,
            }}
            className="font-roboto text-base font-medium uppercase lg:text-[10px] sm:text-xs"
          >
            THE PERFECT PLAN FOR BUILD
          </motion.h3>
          <motion.h4
            initial={{ y: -100, opacity: 0, filter: "blur(10px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0)" }}
            transition={{
              duration: 0.5,
            }}
            className="font-roboto text-6xl font-light leading-tight xl:text-5xl lg:text-[40px] md:text-4xl sm:text-[28px]"
          >
            <span className="font-saol italic text-primary">Smart </span> living
            starts with <br /> smart
            <span className="font-saol italic text-primary"> buildings</span>
          </motion.h4>
          <Dialog className="aspect-video">
            <DialogTrigger asChild>
              <button
                onClick={() => setOpen(true)}
                className="z-50 mt-6 border-2 border-primary px-5 py-3 font-roboto text-base text-primary md:px-4 md:py-3 md:text-base sm:mt-3 sm:px-3 sm:py-2 sm:text-base"
              >
                <span className="flex items-center gap-2 sm:gap-1">
                  <Icons.Play className="sm:h-4" /> Watch Video
                </span>
              </button>
            </DialogTrigger>
            <DialogContent className="h-96 w-full max-w-xl border-2 border-primary bg-primary-200 px-1 py-1">
              <iframe
                src="https://www.youtube.com/embed/h2_CcNuNgXw"
                className="h-full w-full"
              ></iframe>
            </DialogContent>
          </Dialog>
        </div>
        <div className="relative h-[660px] w-screen bg-[url('/images/home_bg.png')] bg-top bg-no-repeat text-center md:h-[379.8px] md:bg-cover md:bg-center sm:mt-6 sm:h-[297.69px] sm:bg-cover sm:bg-center">
          <div className="absolute bottom-48 left-1/2 -translate-x-1/2">
            <div className="m-auto w-full md:hidden sm:hidden">
              <SearchProperty locationsData={locationsData} />
            </div>
          </div>
        </div>
        <div className="absolute left-0 top-0 w-full sm:relative sm:block">
          <div className="container -mt-7 flex justify-between pt-96 md:bg-transparent md:pt-72 sm:mt-0 sm:h-full sm:bg-foreground sm:p-0">
            <div className="flex w-80 flex-wrap gap-8 xl:gap-3 sm:flex sm:w-7/12 sm:flex-nowrap sm:justify-between sm:gap-4 sm:px-3 sm:py-4">
              <div className="w-full sm:hidden">
                <p className="font-roboto text-xs font-normal text-foreground lg:text-[12px] md:hidden md:w-48 md:text-xs">
                  We are delighted to share our experience working with IDL on
                  the Parvin Villa project. Their consistent record of on-time
                  completion, IDL delivered on time and met all expectations.
                  Throughout the entire process, working with IDL was a
                  pleasure. Their professionalism and commitment to deadlines
                  made the experience smooth and stress-free.
                </p>
                <motion.div
                  className="hidden md:block"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.p
                    onClick={() => setIsExpanded(!isExpanded)}
                    initial={{
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                    }}
                    animate={{
                      height: isExpanded ? "auto" : "50px",
                      WebkitLineClamp: isExpanded ? "none" : 3,
                    }}
                    exit={{
                      height: "50px",
                      overflow: "hidden",
                      WebkitLineClamp: 3,
                    }}
                    transition={{ duration: 0.5 }}
                    className="cursor-pointer font-roboto text-xs font-normal text-foreground md:w-48 md:text-xs"
                  >
                    We are delighted to share our experience working with IDL on
                    the Parvin Villa project. Their consistent record of on-time
                    completion, IDL delivered on time and met all expectations.
                    Throughout the entire process, working with IDL was a
                    pleasure. Their professionalism and commitment to deadlines
                    made the experience smooth and stress-free.
                  </motion.p>
                </motion.div>
                <div className="mt-4 flex items-center gap-x-2 md:mt-2">
                  <Avatar className="h-10 w-10 md:h-8 md:w-8">
                    <AvatarImage src="/images/avatar.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-saol text-2xl text-primary lg:text-[16px] md:text-base">
                      Parvin Hossain
                    </h4>
                    <h5 className="font-roboto text-xs font-light lg:text-[10px] md:text-[10px]">
                      Landowner of IDL Parvin Villa
                    </h5>
                  </div>
                </div>
              </div>
              <div className="flex justify-start gap-x-8 xl:mt-1 md:-mt-2 md:gap-x-4 sm:gap-4">
                {counts.map((item, index) => (
                  <div key={index} className="counter-item">
                    <motion.h4 className="text-center font-saol text-5xl font-normal text-primary xl:text-4xl md:text-2xl sm:text-3xl">
                      <CounterAnimation
                        value={item.count}
                        direction="up"
                        index={index}
                      />
                    </motion.h4>
                    <p className="max-w-20 text-center font-saol text-lg font-normal text-foreground xl:text-sm md:w-12 md:text-xs sm:max-w-[50px] sm:text-background">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-20 flex w-56 flex-col items-end text-end xl:mt-4 md:mt-0 sm:-mt-12 sm:flex sm:w-44 sm:flex-col sm:items-end sm:bg-primary sm:p-3">
              <p className="mb-3 text-right font-roboto text-base font-normal text-foreground lg:text-[16px] md:w-36 md:text-sm sm:text-sm sm:text-background">
                Real estate is property consisting of land and the buildings on
                it, along with its natural resources.
              </p>
              <Link href={"/projects"}>
                <ViewProperties className="h-16 w-16 self-end md:h-12 md:w-12 sm:h-10 sm:w-10" />
              </Link>{" "}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
