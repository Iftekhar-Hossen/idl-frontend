import { Avatar, AvatarImage } from "@/components/ui/avatar";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function team({ team }) {
  const carouselRef = useRef(null);
  const cardRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const [member, setMember] = useState(null);

  useEffect(() => {
    let i = 0;
    while (i < team.length) {
      if (team[i].is_regular == false) {
        setMember(team[i].id);
        break;
      }
      i++;
    }
    
  }, []);

  useEffect(() => {
    team.map((data, i) => {
      if (data.id == member) {
        setActiveIndex(i);
      }
    });
  }, [member]);

  const scrollLeft = () => {
    if (carouselRef.current && cardRef.current) {
      const cardWidth = cardRef.current.offsetWidth;
      carouselRef.current.scrollBy({ left: -cardWidth, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current && cardRef.current) {
      const cardWidth = cardRef.current.offsetWidth;
      carouselRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
    }
  };

  return (
    <>
      <section className="bg-primary-300 py-20 pt-40">
        <div className="container">
          <h4 className="text-center text-[19px] text-secondary-300 lg:text-base md:text-base sm:text-sm">
            The Team & Message
          </h4>
          <p className="m-auto w-[603px] text-center font-roboto text-[44px] font-normal text-secondary-300 lg:text-4xl md:max-w-[400px] md:text-3xl sm:w-full sm:text-3xl">
            Meet <span className="font-saol italic">The Team</span> That's
            Building the <span className="font-saol italic">Future</span> of
            Real Estate
          </p>
        </div>
      </section>
      <section className="bg-secondary-300 py-[120px] sm:py-12">
        <motion.div
          layout // This prop enables smooth height changes
          transition={{ duration: 0.3, bounce: 0 }} // Duration of the animation
          className="container flex flex-wrap items-center justify-between md:justify-around"
        >
          <div className="relative pr-12 lg:pr-8 md:pr-0 2xl:w-4/12 xl:w-4/12 lg:w-4/12 md:w-5/12 sm:w-full sm:pr-0">
            <motion.div
              key={team[activeIndex]?.image} // Key prop ensures animation runs on change
              className="relative bg-red-500 md:h-full md:w-full"
              initial={{ filter: "blur(10px)", opacity: 0 }} // Initial state with blur and hidden
              animate={{ filter: "blur(0px)", opacity: 1 }} // Final state with no blur and visible
              transition={{ duration: 0.5 }} // Duration of the animation
            >
              <img
                className="aspect-square h-full w-fit object-cover "
                src={
                  process.env.NEXT_PUBLIC_API_URL +
                  "/assets/" +
                  team[activeIndex]?.image
                }
              />
            </motion.div>
          </div>
          <div className="w-7/12 pl-12 lg:pl-8 md:pl-6 sm:pt-3 sm:pl-0 2xl:w-8/12 xl:w-8/12 lg:w-8/12 md:w-7/12 sm:w-full">
            <motion.div
              key={team[activeIndex]?.designation} // Key to trigger re-animation when designation changes
              initial={{ opacity: 0, y: 20 }} // Initial hidden state and slide down
              animate={{ opacity: 1, y: 0 }} // Final visible state and slide up
              transition={{ duration: 0.6 }} // Animation duration
            >
              <div className="relative">
                <h6 className="text-primary-300 md:text-sm sm:mt-1 sm:text-xs">
                  Message From {team[activeIndex]?.designation}
                </h6>
                <h6 className="relative overflow-hidden pr-4 font-saol text-[46px] leading-none text-neutral-300 after:absolute after:bottom-1 after:h-[1px] after:w-full after:bg-primary-75 md:text-3xl sm:text-2xl sm:after:bottom-2">
                  <span className="pr-3">{team[activeIndex]?.name}</span>
                </h6>
              </div>
            </motion.div>

            <motion.div
              key={team[activeIndex]?.paragraph_1} // Key to trigger re-animation when paragraph changes
              initial={{ opacity: 0, y: 20 }} // Initial hidden state and slide down
              animate={{ opacity: 1, y: 0 }} // Final visible state and slide up
              transition={{ duration: 0.6, delay: 0.2 }} // Delay for a staggered effect
              className="mt-6 md:mt-2"
            >
              <p className="text-[23px] text-neutral-300 md:text-sm sm:text-justify">
                {team[activeIndex]?.paragraph_1}
              </p>
              <div className="mt-5 flex justify-end gap-10 md:hidden">
                <p className="max-w-[295px] text-[15px]  text-neutral-300">
                  {team[activeIndex]?.paragraph_2}
                </p>
                <p className="max-w-[295px] text-[15px] text-neutral-300">
                  {team[activeIndex]?.paragraph_3}
                </p>
              </div>
            </motion.div>

            <motion.div
              key={team[activeIndex]?.paragraph_2} // Key for re-animation when paragraph_2 changes
              initial={{ opacity: 0, y: 20 }} // Initial hidden state and slide down
              animate={{ opacity: 1, y: 0 }} // Final visible state and slide up
              transition={{ duration: 0.6, delay: 0.4 }} // Staggered delay
              className="hidden w-full gap-x-4 md:flex sm:mt-2"
            >
              <p className="text-justify text-neutral-300 md:text-sm">
                {team[activeIndex]?.paragraph_2}
              </p>
              <p className="text-wrap text-justify text-neutral-300 md:text-sm">
                {team[activeIndex]?.paragraph_3}
              </p>
            </motion.div>
          </div>

          <div className="relative mt-10 w-full px-8 sm:mt-4 sm:px-0">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 transform sm:hidden">
              <button className="h-6 w-6" onClick={scrollLeft}>
                <svg
                  width={24}
                  height={25}
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 18.2175L9 12.2175L15 6.21753"
                    stroke="#1D1D1D"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 transform sm:hidden">
              <button className="h-6 w-6" onClick={scrollRight}>
                <svg
                  width={24}
                  height={25}
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 18.2175L15 12.2175L9 6.21753"
                    stroke="#1D1D1D"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div
              ref={carouselRef}
              className="no-scrollbar flex w-full overflow-x-auto scroll-smooth"
            >
              {team
                .filter((item) => item.is_regular == false)
                .map((data, i) => (
                  <div
                    key={data.id}
                    ref={i === 0 ? cardRef : null}
                    className={`flex-none cursor-pointer duration-200 ${
                      member == data.id ? "bg-primary" : "bg-neutral-300"
                    }`}
                    onClick={() => setMember(data.id)}
                  >
                    <div className="flex items-center px-4 py-4 sm:px-3 sm:py-2">
                      <div className="mr-4">
                        <Avatar className="rounded-none">
                          <AvatarImage
                            src={
                              process.env.NEXT_PUBLIC_API_URL +
                              "/assets/" +
                              data.image
                            }
                          />
                        </Avatar>
                      </div>
                      <div>
                        <h5
                          className={`mb-0 text-lg leading-none ${member == data.id ? "text-secondary-300" : "text-neutral-200"} sm:text-base`}
                        >
                          {data.name}
                        </h5>
                        <h6
                          className={`text-[12px] ${member == data.id ? "text-secondary-300" : "text-neutral-200"} sm:text-xs`}
                        >
                          Message From {data.designation}
                        </h6>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </motion.div>
      </section>

      <section className="bg-neutral-300 py-28 md:py-16 sm:py-11">
        <div className="container">
          <div className="mb-20 sm:mb-5 md:mb-10">
            <h3 className="text-[57px] md:text-4xl sm:text-3xl text-secondary-300">
              Our{" "}
              <span className="font-saol italic text-primary-300">Team</span>
            </h3>
            <p className="max-w-[560px] md:text-xl sm:text-base text-2xl text-secondary-400">
              Our team is a diverse mix of construction consultancy experts and
              essential support staff.
            </p>
          </div>
        </div>
        <div className="container">
          <div className="-mx-2 -my-2 flex flex-wrap">
            {team
              .filter((item) => item.is_regular == true)
              .map((member, index) => (
                <div className="w-3/12 md:w-4/12 sm:w-6/12 px-2 py-2">
                  <div className="">
                    <div className="aspect-square overflow-hidden">
                      <img
                        className="object-cover object-center"
                        src={
                          process.env.NEXT_PUBLIC_API_URL +
                          "/assets/" +
                          member.image
                        }
                      />
                    </div>
                    <div className="bg-secondary-300 py-3 sm:pl-3 sm:py-2 pl-5 pr-0">
                      <h5 className="mb-1 text-xl sm:text-lg sm:mb-0 font-bold leading-none text-neutral-300">
                        {member.name}
                      </h5>
                      <h6 className="text-[15px] sm:text-sm font-normal leading-none text-neutral-300">
                        {member.designation}
                      </h6>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps({ params }) {
  try {
    let headers = {
      Authorization: `Bearer ${process.env.DIRECTUS_TOKEN}`,
    };

    let teamRoute = `${process.env.DIRECTUS_URL}/items/team?sort=name`;

    const [teamData] = await Promise.all([fetch(teamRoute, { headers })]);

    const team = await teamData.json();
    console.log(team.data);

    return {
      props: {
        team: team.data,
      },
    };
  } catch (e) {
    return {
      props: {
        team: "error",
      },
    };
  }
}
