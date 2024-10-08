import React, { useEffect, useState } from "react";
import UniversalCombobox from "@/components/combobox";
import { LocateIcon, MapPin } from "lucide-react";
import Link from "next/link";
import { Newsletter } from "@/components/ui/newsletter";
import Image from "next/image";
import { useRouter } from "next/router";
import { directusClient } from "@/lib/directus";
import { readItems } from "@directus/sdk";
import { motion } from "framer-motion";

export default function Projects({ projects, locations }) {
  const router = useRouter();
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");

  // Read initial values from URL on component mount
  useEffect(() => {
    const { type: urlType, location: urlLocation, status: urlStatus } = router.query;
    if (urlType) setType(urlType);
    if (urlLocation) setLocation(urlLocation);
    if (urlStatus) setStatus(urlStatus);
  }, []);

  // Update URL when filters change
  useEffect(() => {
    const query = { ...router.query };
    if (type) query.type = type;
    else delete query.type;
    if (location) query.location = location;
    else delete query.location;
    if (status) query.status = status;
    else delete query.status;

    router.push({
      pathname: router.pathname,
      query: query
    }, undefined, { shallow: true });
  }, [type, location, status]);

  const filteredProducts = projects.filter((project) => {
    const matchesType = type ? project.property_type === type : true;
    const matchesLocation = location ? project.location.value === location : true;
    const matchesStatus = status ? project.current_status === status : true;
    return matchesType && matchesLocation && matchesStatus;
  });

  const SentenceSplitter = ({ sentence }) => {
    const splitSentence = (sentence) => {
      const words = sentence.split(" ");
      return words.map((word, index) => {
        if (index === 0 && word.length >= 3) {
          return (
            <React.Fragment key={index}>
              {word} <br />
            </React.Fragment>
          );
        }
        return <span key={index}>{word} </span>;
      });
    };

    return <>{splitSentence(sentence)}</>;
  };

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

  return (
    <>
      <section className="bg-foreground bg-[url(/images/mask_bg.png)] bg-[20%] font-roboto">
        <div className="container mx-auto flex flex-wrap items-center py-52 pb-72 md:items-end md:py-32 md:pb-40 sm:py-20 sm:pb-56">
          <div className="w-1/2 sm:w-full sm:text-center">
            <h3 className="text-xl text-background md:text-xs sm:text-xs">
              Our Projects
            </h3>
            <motion.p
              variants={containerVariants}
              initial="hidden"
              whileInView={"visible"}
              viewport={{ once: true }}
              className="font-roboto text-5xl font-normal text-background md:text-3xl sm:text-2xl sm:font-normal"
            >
              {animateText("We build ")}
              <span className="font-saol italic text-primary">
                {animateText("Quality ")}{" "}
              </span>
              <br />
              {animateText("real estate projects")}
            </motion.p>
          </div>
          <div className="w-1/2 sm:w-full">
            <motion.p
              whileInView={"visible"}
              initial="hidden"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.03,
                    delayChildren: 0.3,
                  },
                },
              }}
              transition={{
                staggerChildren: 0.03,
                delayChildren: 0.3,
              }}
              viewport={{ once: true }}
              className="text-2xl text-background md:text-sm sm:mt-2 sm:text-center sm:text-sm"
            >
              {`IDL is working in the market since 2019. The beginning of our activity, we have had a clear goal – to provide people with a fundamentally new housing environment!`
                .split(" ")
                .map((word, index) => (
                  <motion.span
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    className="inline-block"
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
            </motion.p>
          </div>
        </div>
      </section>

      <section>
        <div className="container -mt-56 flex justify-between gap-12 bg-transparent pb-48 md:-mt-32 md:gap-3 md:pb-7 sm:-mt-56 sm:flex-wrap sm:gap-1">
        <div className="w-full">
        <UniversalCombobox
          data={[
            { name: "All", value: "" },
            { name: "Commercial", value: "commercial" },
            { name: "Residential", value: "residential" },
          ]}
          onSelect={(type) => setType(type.value)}
          placeholder="Property Type"
          value={type}
        />
      </div>
      <div className="w-full">
        <UniversalCombobox
          data={[{ name: "All", value: "" }, ...locations]}
          placeholder="Location"
          onSelect={(location) => setLocation(location.value)}
          value={location}
        />
      </div>
      <div className="w-full">
        <UniversalCombobox
          data={[
            { name: "All", value: "" },
            { name: "Completed", value: "completed" },
            { name: "Ongoing", value: "ongoing" },
            { name: "Upcoming", value: "upcoming" },
          ]}
          placeholder="Status"
          onSelect={(status) => setStatus(status.value)}
          value={status}
        />
      </div>
        </div>

        <div className="container relative z-10 -mt-32 mb-16 grid grid-cols-12 gap-10 md:mb-8 md:mt-0 md:gap-3 sm:gap-3">
          {filteredProducts.length === 0 ? (
            <>
              <div className="col-span-12 text-center">
                <h1 className="text-4xl text-background">No Property Found</h1>
              </div>
            </>
          ) : (
            filteredProducts.map((property) =>
              property.current_status == "upcoming" ? (
                <motion.div
                  key={property.slug}
                  transition={{ duration: 0.4 }}
                  whileHover="hover"
                  whileTap="hover"
                  className="group relative col-span-4 aspect-[1/1.4] h-full w-full cursor-pointer overflow-hidden lg:col-span-4 md:col-span-4 sm:col-span-6"
                >
                  <motion.div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      background: "rgba(0,0,0,0)",
                      zIndex: 1,
                    }}
                    variants={{
                      hover: {
                        backdropFilter: "blur(5px)",
                        background: "rgba(29,29,29,0.8)",
                        transition: { duration: 0.4 },
                      },
                    }}
                  />
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
                        transition: { duration: 0.4 },
                      },
                    }}
                    src={
                      process.env.NEXT_PUBLIC_API_URL +
                      "/assets/" +
                      property.thumbnail
                    }
                  />
                  <motion.div
                    initial={{
                      height: "27%",
                      background:
                        "linear-gradient(to bottom, transparent, #1E1E1E)",
                    }}

                    variants={{
                      hover: {
                        height: "100%",
                        background:
                          "linear-gradient(to bottom, transparent, rbga(29, 29, 29, 0.8))",
                        transition: {
                          duration: 0.5,
                        },
                      },
                    }}
                    className="absolute bottom-0 z-50 w-full pb-8 pl-10 group-hover:pt-7 md:pl-6 sm:pl-6"
                  >
                    <motion.h4 className="mb-2 text-4xl leading-[1.20] text-secondary-300 md:mb-1 md:text-xl md:font-medium md:leading-none sm:mb-1 sm:text-base sm:font-medium sm:leading-none">
                      <SentenceSplitter sentence={property.name} />
                    </motion.h4>
                    <motion.h6 className="flex items-center md:mt-2 sm:leading-none">
                      <motion.svg
                        initial={{
                          width: 18,
                          height: 18,
                          opacity: 1,
                        }}
                      
                        viewBox="0 0 12 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-1 inline-block h-5 !w-5 md:h-[10px] md:w-[10px] sm:h-[10px] sm:w-[10px]"
                      >
                        <g clip-path="url(#clip0_2096_9035)">
                          <path
                            d="M7.25 4.66016C7.25 5.35051 6.69036 5.91016 6 5.91016C5.30964 5.91016 4.75 5.35051 4.75 4.66016C4.75 3.9698 5.30964 3.41016 6 3.41016C6.69036 3.41016 7.25 3.9698 7.25 4.66016Z"
                            stroke="#F6F3EC"
                          />
                          <path
                            d="M9.11111 8.66016C9.80837 9.65439 10.1419 10.1839 9.94323 10.6101C9.9233 10.6529 9.89997 10.6941 9.87344 10.7335C9.58618 11.1602 8.84375 11.1602 7.35889 11.1602H4.64111C3.15625 11.1602 2.41382 11.1602 2.12656 10.7335C2.10003 10.6941 2.0767 10.6529 2.05677 10.6101C1.8581 10.1839 2.19163 9.65439 2.88889 8.66016"
                            stroke="#F6F3EC"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M6.6287 8.90694C6.46006 9.06936 6.23466 9.16016 6.00008 9.16016C5.7655 9.16016 5.54009 9.06936 5.37145 8.90694C3.82715 7.41055 1.75759 5.73892 2.76685 3.31202C3.31255 1.99982 4.62247 1.16016 6.00008 1.16016C7.37768 1.16016 8.6876 1.99982 9.2333 3.31202C10.2413 5.73586 8.17681 7.41571 6.6287 8.90694Z"
                            stroke="#F6F3EC"
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
                      </motion.svg>

                      <motion.span
                        initial={{
                          width: "auto",
                          opacity: 1,
                        }}
                     
                        className="overflow-hidden whitespace-nowrap text-lg leading-none text-secondary-300 md:text-[10px] sm:text-[10px]"
                      >
                        {property.address_line_2}
                      </motion.span>
                    </motion.h6>
                  </motion.div>

                  <motion.h6 className="absolute bottom-0 z-50 translate-y-32 pb-8 pl-10 text-4xl font-bold leading-[1.2] text-primary duration-1000 group-hover:translate-y-0 group-hover:duration-300 md:pb-5 sm:text-base md:pl-6 sm:pl-6">
                    Coming <br /> Soon...
                  </motion.h6>
                </motion.div>
              ) : (
                <motion.div
                  key={property.slug}
                  onClick={() => router.push(`/projects/${property.slug}`)}
                  transition={{ duration: 0.4 }}
                  whileHover="hover"
                  className="relative col-span-4 aspect-[1/1.4] w-full cursor-pointer overflow-hidden lg:col-span-4 md:col-span-4 sm:col-span-6"
                >
                  <motion.div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      background: "rgba(0,0,0,0)",
                      zIndex: 1,
                    }}
                    variants={{
                      hover: {
                        backdropFilter: "blur(5px)",
                        background: "rgba(29,29,29,0.6)",
                        transition: { duration: 0.4 },
                      },
                    }}
                  />
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
                        transition: { duration: 0.4 },
                      },
                    }}
                    src={
                      process.env.NEXT_PUBLIC_API_URL +
                      "/assets/" +
                      property.thumbnail
                    }
                  />
                  <div className="absolute bottom-0 z-20 w-full bg-gradient-to-b from-transparent to-[#1E1E1E] pb-8 pl-10 pt-7 md:pb-5 md:pl-6 sm:pb-4 sm:pl-6">
                    <motion.h4 className="mb-2 text-4xl leading-[1.20] text-secondary-300 md:mb-1 md:text-xl md:font-medium md:leading-none sm:mb-1 sm:text-base sm:font-medium sm:leading-none">
                      <SentenceSplitter sentence={property.name} />
                    </motion.h4>
                    <motion.h6 className="flex items-center md:mt-2 sm:leading-none">
                      <motion.svg
                        initial={{
                          width: 18,
                          height: 18,
                          opacity: 1,
                        }}
                        variants={{
                          hover: {
                            width: "0px !important",
                            overflow: "hidden",
                            opacity: 0,
                            transition: { duration: 0.1 },
                          },
                        }}
                        viewBox="0 0 12 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-1 inline-block h-5 !w-5 md:h-[10px] md:w-[10px] sm:h-[10px] sm:w-[10px]"
                      >
                        <g clip-path="url(#clip0_2096_9035)">
                          <path
                            d="M7.25 4.66016C7.25 5.35051 6.69036 5.91016 6 5.91016C5.30964 5.91016 4.75 5.35051 4.75 4.66016C4.75 3.9698 5.30964 3.41016 6 3.41016C6.69036 3.41016 7.25 3.9698 7.25 4.66016Z"
                            stroke="#F6F3EC"
                          />
                          <path
                            d="M9.11111 8.66016C9.80837 9.65439 10.1419 10.1839 9.94323 10.6101C9.9233 10.6529 9.89997 10.6941 9.87344 10.7335C9.58618 11.1602 8.84375 11.1602 7.35889 11.1602H4.64111C3.15625 11.1602 2.41382 11.1602 2.12656 10.7335C2.10003 10.6941 2.0767 10.6529 2.05677 10.6101C1.8581 10.1839 2.19163 9.65439 2.88889 8.66016"
                            stroke="#F6F3EC"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M6.6287 8.90694C6.46006 9.06936 6.23466 9.16016 6.00008 9.16016C5.7655 9.16016 5.54009 9.06936 5.37145 8.90694C3.82715 7.41055 1.75759 5.73892 2.76685 3.31202C3.31255 1.99982 4.62247 1.16016 6.00008 1.16016C7.37768 1.16016 8.6876 1.99982 9.2333 3.31202C10.2413 5.73586 8.17681 7.41571 6.6287 8.90694Z"
                            stroke="#F6F3EC"
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
                      </motion.svg>

                      <motion.span
                        initial={{
                          width: "auto",
                          opacity: 1,
                        }}
                        variants={{
                          hover: {
                            width: "0px",
                            opacity: 0,
                            transition: {
                              delay: 0.1,
                              duration: 0.2,
                              ease: "easeInOut",
                            },
                          },
                        }}
                        className="overflow-hidden whitespace-nowrap text-lg leading-none text-secondary-300 md:text-[10px] sm:text-[10px]"
                      >
                        {property.address_line_2}
                      </motion.span>

                      <motion.span
                        initial={{
                          width: "0px",
                          opacity: 0,
                          x: -60,
                        }}
                        variants={{
                          hover: {
                            width: "auto",
                            opacity: 1,
                            x: -20,

                            transition: {
                              delay: 0.4,
                              duration: 0.2,
                            },
                          },
                        }}
                        className="sm:text[10px] mr-1 overflow-hidden whitespace-nowrap text-lg leading-none text-primary md:text-[10px]"
                      >
                        Show Project
                      </motion.span>

                      <motion.svg
                        initial={{
                          width: 0,
                          overflow: "hidden",
                          opacity: 0,
                          x: -50,
                        }}
                        variants={{
                          hover: {
                            transition: {
                              duration: 0.1,
                              delay: 0.3,
                            },
                            x: -20,
                            width: "auto",
                            opacity: 1,
                          },
                        }}
                        viewBox="0 0 12 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="inline-block h-5 !w-5 md:h-[10px] md:w-[10px] sm:h-[10px] sm:w-[10px]"
                      >
                        <path
                          d="M1.33301 6.16016H10.6663"
                          stroke="#A07758"
                          stroke-width="1.25"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M6 1.49349L10.6667 6.16016L6 10.8268"
                          stroke="#A07758"
                          stroke-width="1.25"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </motion.svg>
                    </motion.h6>
                  </div>
                </motion.div>
              ),
            )
          )}
        </div>
      </section>
      <Newsletter />
    </>
  );
}

export async function getServerSideProps({ params }) {
  let data = await directusClient.request(
    readItems("properties", {
      fields: [
        "slug",
        "thumbnail",
        "name",
        "address_line_2",
        "current_status",
        "property_type",

        { location: ["value"] },
      ],
      filter: { status: "published" },
      sort: "completion_date",
    }),
  );
  let locations = await directusClient.request(
    readItems("locations", {
      sort: "name",
    }),
  );

  return { props: { projects: data, locations } };
}
