import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import ViewProperties from "@/components/ViewProperties";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Listbox } from "@headlessui/react";
import { Icons } from "@/components/icon";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { CounterAnimation } from "@/components/animation/counter";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useRouter } from "next/router";
function SearchProperty({ locationsData, properties }) {
  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState();

  console.log(selectedLocation);

  const filteredProperties = properties.filter((project) => {
    const matchesLocation = selectedLocation
      ? project.location === selectedLocation.value
      : true;
    return matchesLocation;
  });

  const ViewProperty = () => {
    selectedProperty && router.push(`/projects/${selectedProperty.slug}`);
  };

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
                    className="absolute mt-1 max-h-44 no-scrollbar z-[500] w-full overflow-auto rounded-md bg-neutral-300 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
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
            <Listbox.Options className="absolute z-[5000] mt-1 max-h-44 no-scrollbar w-full overflow-auto rounded-md bg-neutral-300 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredProperties.length === 0 && (
                <>
                  <span className="inline-block py-2 text-base text-secondary-300">
                    No Properties
                  </span>
                </>
              )}
              {filteredProperties.map((property) => (
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
        <Button
          onClick={ViewProperty}
          className="h-full gap-2 self-stretch bg-primary text-base font-normal text-secondary-50 hover:bg-primary-300"
        >
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

export const Hero = ({
  locationsData,
  properties,
  testimonials,
  pageContent,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.3,
      },
    },
  };

  const letterVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  const animateText = (text, className = "") => {
    return text.split("").map((char, index) => (
      <motion.span key={index} variants={letterVariants} className={className}>
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ));
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1,
      );
    }, 5000); // Change testimonial every 5 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);
  return (
    <>
      <section className="align-between flex flex-wrap justify-center overflow-hidden bg-primary-50 sm:h-auto">
        <div className="relative z-50 h-[521px] pt-48 text-center md:h-[465px] md:pt-32 sm:h-auto sm:pt-24">
          <motion.h3
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="overflow-y-hidden font-roboto text-base font-medium uppercase lg:text-[10px] sm:text-xs"
          >
            {animateText("THE PERFECT PLAN FOR BUILD")}
          </motion.h3>

          <motion.h4
            className="font-roboto text-6xl font-light leading-tight xl:text-5xl lg:text-[40px] md:text-4xl sm:text-[28px]"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {animateText("Smart", "font-saol italic text-primary")}
            {animateText(" living ")}
            {animateText("starts with ")} <br />
            {animateText("smart ")}{" "}
            {animateText("buildings", "font-saol italic text-primary")}
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
                src={pageContent.video}
                className="h-full w-full"
              ></iframe>
            </DialogContent>
          </Dialog>
        </div>
        <div className="relative h-[660px] w-screen bg-[url('/images/home_bg.png')] bg-top bg-no-repeat text-center md:h-[379.8px] md:bg-cover md:bg-center sm:mt-6 sm:h-[297.69px] sm:bg-cover sm:bg-center">
          <div className="absolute bottom-48 left-1/2 -translate-x-1/2">
            <div className="m-auto w-full md:hidden sm:hidden">
              <SearchProperty
                locationsData={locationsData}
                properties={properties}
              />
            </div>
          </div>
        </div>
        <div className="absolute left-0 top-0 w-full sm:relative sm:block">
          <div className="container -mt-7 flex justify-between pt-96 md:bg-transparent md:pt-72 sm:mt-0 sm:h-full sm:bg-foreground sm:p-0">
            <motion.div
              layout
              className="flex w-80 flex-wrap gap-8 xl:gap-3 sm:flex sm:w-7/12 sm:flex-nowrap sm:justify-between sm:gap-4 sm:px-3 sm:py-4"
            >
              <LayoutGroup>
                <div className="relative w-full sm:hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="flex flex-col items-start justify-start p-4"
                    >
                      <motion.p className="mb-4 text-left font-roboto text-sm font-normal text-foreground lg:w-1/2 md:w-2/3">
                        {testimonials[currentIndex].description}
                      </motion.p>
                      <div className="flex items-start gap-x-2">
                        <Avatar className="h-10 w-10 md:h-12 md:w-12">
                          <AvatarImage
                            src={
                              process.env.NEXT_PUBLIC_API_URL +
                              "/assets/" +
                              testimonials[currentIndex].avatar
                            }
                          />
                          <AvatarFallback>
                            {testimonials[currentIndex].name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-saol text-xl text-primary md:text-2xl">
                            {testimonials[currentIndex].name}
                          </h4>
                          <h5 className="font-roboto text-xs font-light md:text-sm">
                            {testimonials[currentIndex].owner}
                          </h5>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="flex justify-start gap-x-8 xl:mt-1 md:-mt-2 md:gap-x-4 sm:gap-4">
                  {pageContent.lifecycle.map((item, index) => (
                    <div key={index} className="counter-item">
                      <motion.h4 className="text-center font-saol text-5xl font-normal text-primary xl:text-4xl md:text-2xl sm:text-3xl">
                        <CounterAnimation
                          value={+item.number}
                          direction="up"
                          index={index}
                        />
                      </motion.h4>
                      <p className="max-w-20 text-center font-saol text-lg font-normal text-foreground xl:text-sm md:w-12 md:text-xs sm:max-w-[50px] sm:text-background">
                        {item.name}
                      </p>
                    </div>
                  ))}
                </div>
              </LayoutGroup>
            </motion.div>
            <div className="mt-20 flex w-56 flex-col items-end text-end xl:mt-4 md:mt-0 sm:-mt-12 sm:flex sm:w-44 sm:flex-col sm:items-end sm:bg-primary sm:p-3">
              <p className="mb-3 text-right font-roboto text-base font-normal text-foreground lg:text-[16px] md:w-36 md:text-sm sm:text-sm sm:text-background">
                {pageContent.right_side_text}
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
