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
import { Banner } from "@/components/animation/banner";
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
                    className="no-scrollbar absolute z-[500] mt-1 max-h-44 w-full overflow-auto rounded-md bg-neutral-300 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
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
            <Listbox.Options className="no-scrollbar absolute z-[5000] mt-1 max-h-44 w-full overflow-auto rounded-md bg-neutral-300 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
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
          className="h-full gap-2 self-stretch bg-primary px-6 text-base font-normal text-secondary-50 hover:bg-primary-300"
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
  banners,
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
      <section className="relative">
        <Banner slides={banners} />
        <div className="absolute sm:hidden md:hidden bottom-[15%] left-1/2 z-50 -translate-x-1/2">
          <SearchProperty
            locationsData={locationsData}
            properties={properties}
          />
        </div>
      </section>
    </>
  );
};
