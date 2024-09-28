import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import db from "@/lib/db";
import { Newsletter } from "@/components/ui/newsletter";
import { CounterAnimation } from "@/components/animation/counter";

import { readItem, readItems } from "@directus/sdk";
import { directusClient } from "@/lib/directus";

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

import { Reveal } from "@/components/animation/reveal";

export default function about({ statics, testimonials }) {
  const revealVariants = {
    hidden: { clipPath: "inset(0 100% 0 0)", x: "100%" },
    visible: {
      clipPath: "inset(0 0 0 0)",
      x: "0%",
      transition: { duration: 1.2 },
    },
  };

  let visions = [
    {
      icon: (
        <svg
          width={25}
          height={24}
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.6712 2.49976C14.6862 2.1753 13.6336 1.99976 12.54 1.99976C7.01719 1.99976 2.54004 6.47691 2.54004 11.9998C2.54004 17.5226 7.01719 21.9998 12.54 21.9998C18.0629 21.9998 22.54 17.5226 22.54 11.9998C22.54 10.9546 22.3797 9.9468 22.0822 8.99976"
            stroke="#F6F3EC"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M17.54 11.9998C17.54 14.7612 15.3015 16.9998 12.54 16.9998C9.77862 16.9998 7.54004 14.7612 7.54004 11.9998C7.54004 9.23833 9.77862 6.99976 12.54 6.99976"
            stroke="#F6F3EC"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20.04 4.49975L12.54 11.9998M20.04 4.49975V1.99975M20.04 4.49975H22.54"
            stroke="#F6F3EC"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ),
      name: "MISSION",
      description:
        "Our mission is to help our valued customers with trust, honesty, and, above all, integrity.",
    },
    {
      icon: (
        <svg
          width={25}
          height={24}
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.0127 8.18653C3.11676 6.08681 3.42806 4.77767 4.35934 3.8464C5.29061 2.91512 6.59975 2.60382 8.69947 2.49976M22.0127 8.18653C21.9086 6.08681 21.5973 4.77767 20.6661 3.8464C19.7348 2.91512 18.4256 2.60382 16.3259 2.49976M16.3259 21.4998C18.4256 21.3957 19.7348 21.0844 20.6661 20.1531C21.5973 19.2218 21.9086 17.9127 22.0127 15.813M8.69946 21.4998C6.59974 21.3957 5.29061 21.0844 4.35934 20.1531C3.42806 19.2218 3.11676 17.9127 3.0127 15.813"
            stroke="#F6F3EC"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20.1479 11.3176C20.3911 11.6221 20.5127 11.7744 20.5127 11.9998C20.5127 12.2251 20.3911 12.3774 20.1479 12.6819C19.055 14.0502 16.2641 16.9998 12.5127 16.9998C8.76132 16.9998 5.97037 14.0502 4.87753 12.6819C4.63431 12.3774 4.5127 12.2251 4.5127 11.9998C4.5127 11.7744 4.63431 11.6221 4.87753 11.3176C5.97037 9.94936 8.76132 6.99976 12.5127 6.99976C16.2641 6.99976 19.055 9.94936 20.1479 11.3176Z"
            stroke="#F6F3EC"
            strokeWidth="1.5"
          />
          <path
            d="M14.5127 11.9998C14.5127 10.8952 13.6173 9.99976 12.5127 9.99976C11.4081 9.99976 10.5127 10.8952 10.5127 11.9998C10.5127 13.1043 11.4081 13.9998 12.5127 13.9998C13.6173 13.9998 14.5127 13.1043 14.5127 11.9998Z"
            stroke="#F6F3EC"
            strokeWidth="1.5"
          />
        </svg>
      ),
      name: "VISION",
      description:
        "Our goal is to build strong, modern infrastructure for our Clients using passion and advanced engineering.",
    },
    {
      icon: (
        <svg
          width={25}
          height={24}
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.98633 3.00098H21.9863"
            stroke="#F6F3EC"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4.98633 3.00098V14C4.98633 16.3288 5.41691 17.0893 7.41385 18.2875L10.4283 20.0962C11.431 20.6978 11.9324 20.9986 12.4863 20.9986C13.0403 20.9986 13.5416 20.6978 14.5443 20.0962L17.5588 18.2875C19.5557 17.0893 19.9863 16.3288 19.9863 14V3.00098"
            stroke="#F6F3EC"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.0908 8.00522L13.7067 9.24726C13.7907 9.42016 14.0147 9.586 14.2037 9.61776L15.32 9.80477C16.034 9.92474 16.2019 10.447 15.6875 10.9621L14.8196 11.8372C14.6726 11.9854 14.5921 12.2712 14.6376 12.4759L14.8861 13.5591C15.0821 14.4166 14.6306 14.7482 13.8782 14.3001L12.8318 13.6756C12.6428 13.5627 12.3314 13.5627 12.1389 13.6756L11.0925 14.3001C10.3436 14.7482 9.88864 14.413 10.0846 13.5591L10.3331 12.4759C10.3786 12.2712 10.2981 11.9854 10.1511 11.8372L9.28321 10.9621C8.77226 10.447 8.93675 9.92474 9.65067 9.80477L10.767 9.61776C10.9525 9.586 11.1765 9.42016 11.2605 9.24726L11.8764 8.00522C12.2124 7.33127 12.7583 7.33127 13.0908 8.00522Z"
            stroke="#F6F3EC"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      name: "VALUE",
      description:
        "Real estate development that values sustainability, innovation, teamwork, and client satisfaction.",
    },
  ];

  let projects = [
    {
      name: "Handover Projects",
      count: 5,
    },
    {
      name: "Ongoing Projects",
      count: 5,
    },
    {
      name: "Upcoming Projects",
      count: 9,
    },
  ];

  return (
    <>
      <section className="flex h-[724px] items-center bg-foreground sm:h-full sm:py-20 sm:pt-32">
        <div className="container">
          <div className="text-center">
            <Reveal>
              <motion.h3 className="font-roboto text-7xl font-normal text-secondary-300 sm:text-2xl sm:font-normal">
                We{" "}
                <span className="font-saol font-semibold italic text-primary">
                  Work
                </span>{" "}
                for your <br />
                better{" "}
                <span className="font-saol font-semibold italic text-primary">
                  Future
                </span>
              </motion.h3>
            </Reveal>

            <Dialog className="aspect-video">
              <DialogTrigger asChild>
                <button className="z-50 mt-6 border-2 border-primary px-4 py-3 font-roboto text-base text-primary sm:mt-3 sm:px-3 sm:py-2 sm:text-base">
                  <span className="flex items-center gap-2 sm:gap-1">
                    <svg
                      width={25}
                      height={25}
                      viewBox="0 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.5 3.5L19.5 12.5L5.5 21.5V3.5Z"
                        stroke="#A07758"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Watch Video
                  </span>
                </button>
              </DialogTrigger>
              <DialogContent className="h-96 w-full max-w-xl border-2 border-primary bg-primary-200 px-1 py-1">
                <iframe
                  src={statics.about_banner_video}
                  className="h-full w-full"
                ></iframe>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      <section className="bg-background py-28 pb-24 md:py-14 sm:pb-0 sm:pt-0">
        <div className="container flex justify-between gap-x-4 sm:flex-wrap sm:p-0">
          <div className="w-5/12 md:w-6/12 sm:w-full sm:p-6">
            <h5 className="font-roboto text-xl text-secondary-400 xl:text-base md:text-xs md:text-neutral-300 sm:text-base">
              <span className="mr-1 hidden w-7 border-b-2 border-primary md:inline-block sm:inline-block"></span>{" "}
              Our Story
            </h5>
            <h3
              className="font-roboto text-3xl font-normal tracking-tight text-neutral-300 xl:text-2xl xl:leading-tight md:text-xl sm:text-xl"
              dangerouslySetInnerHTML={{ __html: statics.story_heading }}
            ></h3>

            <div className="mt-5 grid gap-y-3">
              {statics.story_description.blocks.map(({ data }) => (
                <p className="text-xl leading-tight tracking-tight text-foreground xl:text-lg md:text-sm sm:text-sm">
                  {data.text}
                </p>
              ))}
            </div>
            <ul className="mt-12 flex justify-start gap-8 xl:mt-8 md:mt-4 md:gap-0 sm:gap-3">
              {projects.map((project, index) => (
                <li className="max-w-[85px]">
                  <div>
                    <h6 className="text-center font-saol text-5xl text-primary xl:text-4xl md:text-4xl sm:text-4xl">
                      <CounterAnimation
                        value={project.count}
                        direction="up"
                        index={index}
                      />
                    </h6>
                    <h6 className="text-center font-saol text-xl xl:text-lg md:text-sm sm:text-sm">
                      {project.name}
                    </h6>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative w-5/12 md:w-6/12 sm:w-full">
            <div className="relative w-full md:pl-5 sm:p-0">
              <img
                src="/images/about.png"
                layout="fill"
                className="h-fit w-[580px] md:w-full sm:h-full sm:w-full"
                alt="hi"
                objectFit="contain"
              />
            </div>
            <div className="relative z-10 -ml-[47px] -mt-[120px] w-[510px] xl:-ml-[30px] xl:-mt-[150px] xl:w-[480px] md:-mt-16 md:ml-0 md:w-full md:pr-6 sm:absolute sm:-bottom-8 sm:mr-0 sm:mt-0 sm:pl-6 sm:pr-0">
              <div className="bg-primary px-[56px] py-10 xl:py-8 md:px-6 md:py-4">
                <Reveal>
                  <p className="border-l-4 pl-6 text-xl text-secondary-300 xl:pl-4 xl:text-lg md:border-l-2 md:pl-3 md:text-xs">
                    “Real estate development is not just about building
                    buildings. It is about creating communities where people can
                    live, work, and thrive. It is about building a better future
                    for everyone.”
                  </p>
                </Reveal>
                <div className="mt-4 flex items-center gap-[20px] md:gap-3">
                  <Avatar className="md:h-8 md:w-8">
                    <AvatarImage src="/images/ceo.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-saol text-2xl font-semibold text-secondary-300 md:text-sm sm:text-base">
                      Md. Hasan{" "}
                    </h4>
                    <h6 className="text-[8px] text-secondary-300 md:text-xs">
                      Chairman of Inheritance Development Ltd.
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-foreground">
        <div className="container m-auto flex flex-wrap items-end pb-28 pt-24 md:pb-14 md:pt-9 sm:pb-14 sm:pt-20">
          <div className="w-6/12 md:w-5/12 sm:w-full">
            <h5 className="font-roboto text-[#808080] md:text-sm sm:text-center sm:text-xs">
              Our Services
            </h5>
            <h3 className="font-roboto text-6xl font-normal leading-tight text-secondary-50 xl:text-5xl md:text-3xl sm:text-center sm:text-2xl sm:font-normal sm:leading-none">
              What{" "}
              <span className="font-saol font-semibold italic text-primary">
                We Provide
              </span>{" "}
              <br />
              To Our Clients
            </h3>
          </div>
          <div className="w-6/12 md:w-7/12 sm:w-full">
            <p className="max-w-[745px] pt-8 font-roboto text-2xl font-normal text-white xl:mt-3 xl:text-xl md:text-sm md:font-normal sm:pt-0 sm:text-center sm:text-sm">
              At Inheritance Development LTD, we're not just selling properties,
              we're{" "}
              <span className="text-primary-300">
                building the foundation for your brighter tomorrow
              </span>
              . With dedication and expertise, we work for your better future.
            </p>
          </div>
          <div className="mt-20 w-full xl:mt-16 md:mt-2 sm:mt-10">
            <Carousel
              className="relative mt-4 pt-5 sm:mt-0 sm:pt-0"
              opts={{
                align: "start",
                loop: true,
              }}
            >
              <CarouselNext className="absolute -top-6 right-0 border-secondary-500 bg-transparent text-secondary-500 md:hidden sm:hidden" />
              <CarouselPrevious className="absolute -top-6 left-[calc(100%-80px)] border-secondary-500 bg-transparent text-secondary-500 md:hidden sm:hidden" />
              <CarouselContent className="relative flex md:ml-0 sm:ml-0 sm:w-full sm:flex-nowrap">
                {statics.services.map(({name, description}, index) => (
                  <CarouselItem className="w-4/12 flex-none md:mx-1 md:w-4/12 md:pl-0 sm:mx-2 sm:w-6/12 sm:pl-0">
                    <motion.div
                      tabIndex="0"
                      whileHover={"hover"}
                      whileFocus={"hover"}
                      whileTap={"hover"}
                      className="group relative flex aspect-[414/400] flex-col justify-end bg-primary-300 bg-[url('/images/mask_bg.png')] bg-cover px-12 pb-12 bg-blend-screen duration-300 hover:cursor-pointer hover:bg-secondary-300 md:aspect-[5/4] md:px-6 md:pb-6 md:pt-5 sm:aspect-square sm:px-3 sm:pb-3"
                    >
                      <div className="">
                        <h4 className="font-saol text-[46px] group-hover:text-primary-300 md:text-4xl">
                          {index + 1}
                        </h4>
                        <motion.p
                          variants={{
                            hover: {
                              // fontWeight: "500"
                            },
                          }}
                          className="1 mb-2 text-2xl duration-300 group-hover:text-3xl md:text-sm group-hover:md:text-base"
                          dangerouslySetInnerHTML={{ __html: name }}
                        />
                        <motion.p
                          initial={{
                            height: "0px",
                            overflow: "hidden",
                          }}
                          variants={{
                            hover: {
                              height: "auto",
                            },
                          }}
                          className="overflow-hidden text-base leading-5 text-neutral-100 md:text-sm sm:text-xs"
                        >
                          {description}
                        </motion.p>
                      </div>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </section>

      <section className="bg-primary py-28 sm:py-10">
        <div className="container grid grid-cols-3 sm:px-3 [&>*:nth-child(2)]:border-x-2 sm:[&>*:nth-child(2)]:border-x-0 sm:[&>*:nth-child(2)]:border-y-2">
          {visions.map((vision, i) => (
            <div className="px-11 py-5 text-background md:px-4 sm:col-span-3 sm:px-2 sm:py-4">
              <div className="flex items-center gap-3 font-roboto">
                <h6>{vision.icon}</h6>
                <h6 className="text-xl font-normal text-secondary-300 md:text-base">
                  {vision.name}
                </h6>
              </div>
              <div>
                <p className="mt-6 text-start text-3xl text-secondary-300 md:mt-1 md:text-justify md:text-base sm:mt-1 sm:text-base">
                  {vision.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-0 bg-secondary-300 bg-no-repeat py-11 pb-[80px] pt-[80px] sm:py-8">
        <div className="container relative z-20">
          <div className="absolute w-full sm:relative">
            <h3 className="mb-8 text-center text-2xl font-normal text-background text-primary-300 sm:mb-4 sm:text-sm">
              Our Clients Lovely Words.
            </h3>
          </div>
          <Carousel
            className="relative pt-16 sm:pt-0"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              {testimonials.map(({name, description, owner}) => (
                <CarouselItem>
                  <div className="m-auto flex h-full max-w-[1080px] flex-col justify-center px-10 text-center sm:px-5">
                    <p className="font-roboto text-3xl font-normal text-neutral-300 md:text-lg sm:text-xl sm:font-normal">
                      {description}
                    </p>
                    <div className="mt-6 flex items-center justify-center sm:mt-3 sm:flex-col">
                      <h3 className="pr-5 font-saol text-xl font-normal text-primary-300 sm:p-0 sm:text-base sm:font-normal">
                        {name}
                      </h3>
                      <h3 className="relative pl-5 text-xl font-normal text-primary-300 after:absolute after:left-0 after:top-0 after:h-full after:w-[2px] after:bg-primary sm:p-0 sm:text-sm sm:font-light sm:text-foreground sm:after:hidden">
                        {owner}
                      </h3>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 scale-125 border-none bg-transparent text-neutral-300 sm:hidden" />
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 scale-125 border-none bg-transparent text-neutral-300 sm:hidden" />
          </Carousel>
        </div>
      </section>

      <Newsletter />
    </>
  );
}

export async function getServerSideProps({ params }) {
  let statics = await directusClient.request(
    readItem("static", 1, {
      fields: [
        "banner_heading",
        "story_heading",
        "about_banner_video",
        "story_description",
        "services",
        "lifecycle",
      ],
    }),
  );

  let testimonials = await directusClient.request(readItems("testimonials"));

  return {
    props: {
      statics: statics,
      testimonials: testimonials,
    },
  };
}
