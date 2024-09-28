import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { useState, useRef } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/router";

export const Project = ({ properties }) => {
  let [isActive, setActive] = useState("ongoing");
  let router = useRouter();

  let filteredItems = properties.filter(
    (property) => property.current_status === isActive,
  );

  return (
    <>
      <motion.section className="bg-accent py-24 sm:py-10">
        <div className="container m-auto flex flex-wrap pb-24 lg:pb-0 md:pb-0 sm:flex-nowrap sm:pb-0 sm:pt-0">
          <div className="m-auto flex flex-wrap items-end">
            <div className="w-3/12 self-baseline lg:mb-0 lg:w-full md:mb-0 md:w-full sm:w-full">
              <h5 className="text-xl text-secondary-400 md:text-sm sm:text-center sm:text-xs">
                Our Projects
              </h5>
            </div>
            <div className="w-5/12 lg:mb-4 lg:w-6/12 md:w-6/12 sm:w-full">
              <h3 className="columns-1 items-center text-6xl font-normal lg:text-3xl md:text-3xl md:font-medium md:leading-none sm:text-center sm:text-2xl">
                We build
                <span className="ml-2 font-saol font-semibold italic text-primary">
                  Quality
                </span>{" "}
                <br className="lg:none" />
                real estate projects
              </h3>
            </div>
            <div className="w-4/12 pl-20 lg:mb-4 lg:w-6/12 md:w-6/12 md:pl-0 sm:w-full sm:pl-0">
              <p className="text-xl font-normal leading-6 lg:text-sm md:text-sm sm:text-center sm:text-sm">
                IDL is working in the market since 2019. The beginning of our
                activity, we have had a clear goal – to provide people with a
                fundamentally new housing environment!
              </p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="flex flex-wrap justify-between">
            <div className="relative flex w-3/12 flex-col items-start justify-between lg:w-2/12 lg:justify-between md:w-full md:flex-row md:items-center sm:w-full sm:items-center sm:justify-center">
              <div className="flex flex-col items-start justify-start gap-3 bg-transparent lg:items-start lg:justify-start lg:gap-0 md:flex-row md:gap-x-3 sm:flex-row sm:justify-center">
                {["ongoing", "upcoming", "complete"].map((item, index) => (
                  <Button
                    value={item}
                    onClick={() => setActive(item)}
                    className={`bg-transparent px-0 py-0 text-left font-saol text-4xl font-normal capitalize hover:bg-transparent lg:text-sm md:text-sm sm:text-sm ${
                      isActive == item
                        ? "font-bold text-primary"
                        : "text-secondary-400"
                    }`}
                  >
                    {item}
                  </Button>
                ))}
              </div>
              <div className="md:flex md:items-end sm:hidden">
                <Link
                  href="/projects"
                  className="flex items-center gap-x-1 text-base text-primary md:text-sm"
                >
                  See all projects{" "}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 8.10498H15"
                      stroke="#C8B09E"
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8 1.10498L15 8.10498L8 15.105"
                      stroke="#C8B09E"
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="w-9/12 max-w-[956px] px-0 py-0 lg:w-10/12 md:w-full sm:w-full">
              <div className="mt-0 h-full">
                <Carousel className="relative h-full w-full">
                  <CarouselContent className="-mx-1 h-[350px] lg:h-[300px] md:h-[280px] sm:h-[275px] sm:max-h-[290px]">
                    <AnimatePresence mode="wait">
                      {filteredItems.map((property, index) =>
                        property.current_status == "upcoming" ? (
                          <CarouselItem
                            key={property.slug}
                            className={`basis-1/4 px-1 sm:basis-1/2`}
                          >
                            <motion.div
                              key={property.slug}
                              transition={{ duration: 0.4 }}
                              whileHover={"hover"}
                              className={`group relative h-full overflow-hidden`}
                            >
                              <div>
                                <div className="absolute bottom-0 left-0 z-50 h-1/2 w-full bg-gradient-to-t from-neutral-300/95 to-neutral-50/5 duration-200 group-hover:h-full group-hover:to-neutral-300/50"></div>
                                <img
                                  className="absolute left-0 top-0 h-fit w-full object-center duration-200 ease-in group-hover:scale-110 group-hover:object-scale-down"
                                  src={
                                    process.env.NEXT_PUBLIC_API_URL +
                                    "/assets/" +
                                    property.thumbnail
                                  }
                                />
                              </div>
                              <div className="absolute bottom-5 left-6 z-50 w-full duration-150 group-hover:bottom-3/4">
                                <h4 className="text-2xl text-secondary-300 sm:text-base">
                                  IDL Lake Velly
                                </h4>
                                <div>
                                  <motion.h6 className="flex items-center gap-x-1 text-xs text-secondary-300 group-hover:text-primary sm:text-[10px]">
                                    <svg
                                      width="12"
                                      height="13"
                                      viewBox="0 0 12 13"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <g clip-path="url(#clip0_2096_9035)">
                                        <path
                                          d="M7.25 4.66016C7.25 5.35051 6.69036 5.91016 6 5.91016C5.30964 5.91016 4.75 5.35051 4.75 4.66016C4.75 3.9698 5.30964 3.41016 6 3.41016C6.69036 3.41016 7.25 3.9698 7.25 4.66016Z"
                                          stroke="#A07758"
                                        />
                                        <path
                                          d="M9.11111 8.66016C9.80837 9.65439 10.1419 10.1839 9.94323 10.6101C9.9233 10.6529 9.89997 10.6941 9.87344 10.7335C9.58618 11.1602 8.84375 11.1602 7.35889 11.1602H4.64111C3.15625 11.1602 2.41382 11.1602 2.12656 10.7335C2.10003 10.6941 2.0767 10.6529 2.05677 10.6101C1.8581 10.1839 2.19163 9.65439 2.88889 8.66016"
                                          stroke="#A07758"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                        />
                                        <path
                                          d="M6.6287 8.90694C6.46006 9.06936 6.23466 9.16016 6.00008 9.16016C5.7655 9.16016 5.54009 9.06936 5.37145 8.90694C3.82715 7.41055 1.75759 5.73892 2.76685 3.31202C3.31255 1.99982 4.62247 1.16016 6.00008 1.16016C7.37768 1.16016 8.6876 1.99982 9.2333 3.31202C10.2413 5.73586 8.17681 7.41571 6.6287 8.90694Z"
                                          stroke="#A07758"
                                        />
                                      </g>
                                      <defs>
                                        <clipPath id="clip0_2096_9035">
                                          <rect
                                            width="12"
                                            height="12"
                                            fill="white"
                                            transform="translate(0 0.160156)"
                                          />
                                        </clipPath>
                                      </defs>
                                    </svg>
                                    Uttara, Dhaka
                                  </motion.h6>
                                </div>
                              </div>
                              <div className="absolute -bottom-1/4 left-6 z-50 text-2xl font-bold leading-none text-primary duration-150 group-hover:bottom-5">
                                Coming <br /> Soon ...
                              </div>
                            </motion.div>
                          </CarouselItem>
                        ) : (
                          <CarouselItem
                            key={property.slug}
                            className={`mx-2 h-full w-full basis-1/4 overflow-hidden px-0 md:basis-1/3 sm:basis-1/2`}
                          >
                            <motion.div
                              key={property.slug}
                              onClick={() =>
                                router.push(`/projects/${property.slug}`)
                              }
                              transition={{ duration: 0.4 }}
                              whileHover={"hover"}
                              className={`relative h-full w-full cursor-pointer overflow-hidden`}
                            >
                              <motion.div style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                backgroundColor: "rgba(0,0,0,0.2)"
                              }}  variants={{
                                
                                hover: {
                                  opacity: 1,
                                },
                                
                              }}/>
                           
                              <motion.img
                                style={{
                                  position: "absolute",
                                  top: 0,
                                  left: 0,
                                  width: "100%",
                                  height: "100%",
                                }}
                                initial={{ transform: "scale(1)" }}
                                variants={{
                                  hover: {
                                    transform: "scale(1.1)",
                                  },
                                }}
                                src={
                                  process.env.NEXT_PUBLIC_API_URL +
                                  "/assets/" +
                                  property.thumbnail
                                }
                              />
                            </motion.div>
                          </CarouselItem>
                        ),
                      )}
                    </AnimatePresence>
                  </CarouselContent>
                </Carousel>
              </div>
            </div>
            <div className="hidden sm:block sm:w-full">
              <Link
                href={"/projects"}
                className="group bottom-0 left-0 mt-3 flex items-center justify-center gap-1 border-[1px] border-primary py-1 text-center text-primary"
              >
                <span className="text-xs font-medium duration-300 hover:group-hover:underline">
                  See all projects
                </span>{" "}
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M-1.85218e-07 4.51903L8.65113 4.51903L4.9435 0.811399L5.4096 0.281738L10 4.87213L5.4096 9.46253L4.9435 8.93287L8.65113 5.22524L-2.16087e-07 5.22524L-1.85218e-07 4.51903Z"
                    fill="#A07758"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
};
