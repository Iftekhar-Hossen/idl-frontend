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
  const [selectedValue, setSelectedValue] = useState(null); // Optional initial value

  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");

  console.log(type, location, status);

  const filteredProducts = projects.filter((project) => {
    console.log(project);
    const matchesType = type ? project.property_type === type : true;
    const matchesLocation = location
      ? project.location.value === location
      : true;
    const matchesStatus = status ? project.current_status === status : true;
    return matchesType && matchesLocation && matchesStatus;
  });

  return (
    <>
      <section className="bg-foreground bg-[url(/images/mask_bg.png)] bg-[20%] font-roboto">
        <div className="container mx-auto flex flex-wrap items-center py-52 pb-72 md:items-end md:py-32 md:pb-40 sm:py-20 sm:pb-56">
          <div className="w-1/2 sm:w-full sm:text-center">
            <h3 className="text-xl text-background md:text-xs sm:text-xs">
              Our Projects
            </h3>
            <p className="font-roboto text-5xl font-normal text-background md:text-3xl sm:text-2xl sm:font-normal">
              We build{" "}
              <span className="font-saol italic text-primary">Quality </span>{" "}
              <br />
              real estate projects
            </p>
          </div>
          <div className="w-1/2 sm:w-full">
            <p className="text-2xl text-background md:text-sm sm:mt-2 sm:text-center sm:text-sm">
              IDL is working in the market since 2019. The beginning of our
              activity, we have had a clear goal – to provide people with a
              fundamentally new housing environment!
            </p>
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
            />
          </div>
          <div className="w-full">
            <UniversalCombobox
              data={[{ name: "All", value: "" }, ...locations]}
              placeholder="Location"
              onSelect={(location) => setLocation(location.value)}
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
                  onClick={() => router.push(`/projects/${property.slug}`)}
                  initial={{ scale: 0.98, filter: "blur(10px)" }}
                  animate={{ scale: 1, filter: "blur(0px)" }}
                  exit={{ scale: 0.98, filter: "blur(10px)" }}
                  transition={{ duration: 0.4 }}
                  whileHover={"hover"}
                  className={`group relative col-span-4 aspect-[1/1.3] h-full cursor-pointer overflow-hidden`}
                >
                  <div>
                    <div className="absolute bottom-0 left-0 z-50 h-1/2 w-full bg-gradient-to-t from-neutral-300/95 to-neutral-50/5 duration-200 ease-in group-hover:h-full group-hover:to-neutral-300/50"></div>
                    <img
                      className="absolute left-0 top-0 h-fit w-full object-center duration-100 group-hover:object-scale-down"
                      src={
                        process.env.NEXT_PUBLIC_API_URL +
                        "/assets/" +
                        property.thumbnail
                      }
                    />
                  </div>
                  <div className="absolute bottom-5 left-6 z-50 w-full sm:left-5">
                    <h4 className="text-4xl text-secondary-300 md:text-xl sm:text-base">
                      {property.name}
                    </h4>
                    <div>
                      <motion.h6
                        className="flex items-center gap-1 text-lg text-primary-300 md:text-xs sm:text-[10px]"
                        initial={{ opacity: 0, height: 0 }}
                        variants={{
                          hover: {
                            opacity: 1,
                            height: "auto",
                          },
                        }}
                      >
                        Show Project{" "}
                        <div className="h-5 w-5 md:h-3 md:w-3">
                          <svg
                            width="100%"
                            height="100%"
                            viewBox="0 0 16 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3.33301 8.16016H12.6663"
                              stroke="#A07758"
                              stroke-width="1.25"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M8 3.49349L12.6667 8.16016L8 12.8268"
                              stroke="#A07758"
                              stroke-width="1.25"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </div>
                      </motion.h6>
                      <motion.h6
                        variants={{
                          // hide this when hover
                          hover: {
                            opacity: 0,
                            height: 0,
                          },
                        }}
                        className="flex items-center gap-1 text-lg text-secondary-300 sm:text-[10px]"
                      >
                        <div className="h-5 w-5 md:h-3 md:w-3">
                          <svg
                            width="100%"
                            height="100%"
                            viewBox="0 0 12 13"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clip-path="url(#clip0_2138_3983)">
                              <path
                                d="M7.25 4.52393C7.25 5.21428 6.69036 5.77393 6 5.77393C5.30964 5.77393 4.75 5.21428 4.75 4.52393C4.75 3.83357 5.30964 3.27393 6 3.27393C6.69036 3.27393 7.25 3.83357 7.25 4.52393Z"
                                stroke="#F6F3EC"
                              />
                              <path
                                d="M9.11111 8.52393C9.80837 9.51816 10.1419 10.0477 9.94323 10.4739C9.9233 10.5166 9.89997 10.5579 9.87344 10.5973C9.58618 11.0239 8.84375 11.0239 7.35889 11.0239H4.64111C3.15625 11.0239 2.41382 11.0239 2.12656 10.5973C2.10003 10.5579 2.0767 10.5166 2.05677 10.4739C1.8581 10.0477 2.19163 9.51816 2.88889 8.52393"
                                stroke="#F6F3EC"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M6.6287 8.77071C6.46006 8.93313 6.23466 9.02393 6.00008 9.02393C5.7655 9.02393 5.54009 8.93313 5.37145 8.77071C3.82715 7.27432 1.75759 5.60269 2.76685 3.17579C3.31255 1.86359 4.62247 1.02393 6.00008 1.02393C7.37768 1.02393 8.6876 1.86359 9.2333 3.17579C10.2413 5.59963 8.17681 7.27947 6.6287 8.77071Z"
                                stroke="#F6F3EC"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_2138_3983">
                                <rect
                                  width="12"
                                  height="12"
                                  fill="white"
                                  transform="translate(0 0.0239258)"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                        </div>{" "}
                        {property.address_line_2}
                      </motion.h6>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={property.slug}
                  onClick={() => router.push(`/projects/${property.slug}`)}
                  initial={{ scale: 0.98, filter: "blur(10px)" }}
                  animate={{ scale: 1, filter: "blur(0px)" }}
                  exit={{ scale: 0.98, filter: "blur(10px)" }}
                  transition={{ duration: 0.4 }}
                  whileHover={"hover"}
                  className={`group relative col-span-4 aspect-[1/1.3] h-full cursor-pointer overflow-hidden`}
                >
                  <div>
                    <div className="absolute bottom-0 left-0 z-50 h-1/2 w-full bg-gradient-to-t from-neutral-300/95 to-neutral-50/5 duration-200 ease-in group-hover:h-full group-hover:to-neutral-300/50"></div>
                    <img
                      className="absolute left-0 top-0 h-fit w-full object-center duration-100 group-hover:object-scale-down"
                      src={
                        process.env.NEXT_PUBLIC_API_URL +
                        "/assets/" +
                        property.thumbnail
                      }
                    />
                  </div>
                  <div className="absolute bottom-5 left-6 z-50 w-full sm:bottom-3 sm:left-3">
                    <h4 className="text-4xl text-secondary-300 md:text-xl sm:text-base">
                      {property.name}
                    </h4>
                    <div>
                      <motion.h6
                        className="flex items-center gap-1 text-lg text-primary-300 md:text-xs sm:text-[10px]"
                        initial={{ opacity: 0, height: 0 }}
                        variants={{
                          hover: {
                            opacity: 1,
                            height: "auto",
                          },
                        }}
                      >
                        Show Project{" "}
                        <div className="h-5 w-5">
                          <svg
                            width="100%"
                            height="100%"
                            viewBox="0 0 16 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3.33301 8.16016H12.6663"
                              stroke="#A07758"
                              stroke-width="1.25"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M8 3.49349L12.6667 8.16016L8 12.8268"
                              stroke="#A07758"
                              stroke-width="1.25"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </div>
                      </motion.h6>
                      <motion.h6
                        variants={{
                          // hide this when hover
                          hover: {
                            opacity: 0,
                            height: 0,
                          },
                        }}
                        className="flex items-center gap-1 text-lg text-secondary-300 md:text-xs sm:text-[10px]"
                      >
                        <div className="h-5 w-5 md:h-3 md:w-3">
                          <svg
                            width="100%"
                            height="100%"
                            viewBox="0 0 12 13"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clip-path="url(#clip0_2138_3983)">
                              <path
                                d="M7.25 4.52393C7.25 5.21428 6.69036 5.77393 6 5.77393C5.30964 5.77393 4.75 5.21428 4.75 4.52393C4.75 3.83357 5.30964 3.27393 6 3.27393C6.69036 3.27393 7.25 3.83357 7.25 4.52393Z"
                                stroke="#F6F3EC"
                              />
                              <path
                                d="M9.11111 8.52393C9.80837 9.51816 10.1419 10.0477 9.94323 10.4739C9.9233 10.5166 9.89997 10.5579 9.87344 10.5973C9.58618 11.0239 8.84375 11.0239 7.35889 11.0239H4.64111C3.15625 11.0239 2.41382 11.0239 2.12656 10.5973C2.10003 10.5579 2.0767 10.5166 2.05677 10.4739C1.8581 10.0477 2.19163 9.51816 2.88889 8.52393"
                                stroke="#F6F3EC"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M6.6287 8.77071C6.46006 8.93313 6.23466 9.02393 6.00008 9.02393C5.7655 9.02393 5.54009 8.93313 5.37145 8.77071C3.82715 7.27432 1.75759 5.60269 2.76685 3.17579C3.31255 1.86359 4.62247 1.02393 6.00008 1.02393C7.37768 1.02393 8.6876 1.86359 9.2333 3.17579C10.2413 5.59963 8.17681 7.27947 6.6287 8.77071Z"
                                stroke="#F6F3EC"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_2138_3983">
                                <rect
                                  width="12"
                                  height="12"
                                  fill="white"
                                  transform="translate(0 0.0239258)"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                        </div>{" "}
                        {property.address_line_2}
                      </motion.h6>
                    </div>
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
