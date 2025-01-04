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
import { Newsletter } from "@/components/ui/newsletter";
import { CounterAnimation } from "@/components/animation/counter";

import { readItem, readItems } from "@directus/sdk";
import { directusClient } from "@/lib/directus";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { Reveal } from "@/components/animation/reveal";
import Meta from "@/components/meta";

export default function about({ statics, testimonials, pageContent }) {
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
    <Meta />
      <section className="flex h-[724px] items-center bg-foreground sm:h-full sm:py-20 sm:pt-32">
        <div className="container">
          <div className="text-center">
            <motion.h3
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="font-roboto text-7xl font-normal text-secondary-300 sm:text-2xl sm:font-normal"
            >
              {animateText("We ")}
              <span className="font-saol font-semibold italic text-primary">
                {animateText("Work ")}
              </span>
              {animateText("for your")} <br />
              {animateText("better ")}
              <span className="font-saol font-semibold italic text-primary">
                {animateText("Future")}
              </span>
            </motion.h3>

            <Dialog className="aspect-video">
              <DialogTrigger asChild>
                <button className="group z-50 mt-6 border-2 border-primary px-4 py-3 font-roboto text-base text-primary-300 hover:text-white hover:bg-primary-300 sm:mt-3 sm:px-3 sm:py-2 sm:text-base">
                  <span className="flex items-center gap-2 group-hover:text-white sm:gap-1 stroke-primary-300 group-hover:stroke-white">
                    <svg
                      width={25}
                      height={25}
                      viewBox="0 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.5 3.5L19.5 12.5L5.5 21.5V3.5Z"
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
                  src={pageContent.banner_video}
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
            <motion.h3
              whileInView={"visible"}
              initial="initial"
              variants={{
                initial: {
                  height: 0,
                  overflow: "hidden",
                },
                visible: {
                  height: "auto",
                  transition: {
                    duration: 0.9,
                  },
                },
              }}
              viewport={{ once: true, amount: 0.9 }}
              className="font-roboto text-3xl font-normal tracking-tight text-neutral-300 xl:text-2xl xl:leading-tight md:text-xl sm:text-xl"
              dangerouslySetInnerHTML={{ __html: pageContent.story_heading }}
            ></motion.h3>

            <div className="mt-5 grid gap-y-3">
              {pageContent.story_description.blocks.map(({ data, i }) => (
                <motion.p
                  whileInView={"visible"}
                  initial="initial"
                  variants={{
                    initial: {
                      height: 0,
                      overflow: "hidden",
                    },
                    visible: {
                      height: "auto",
                      transition: {
                        duration: 0.9,
                        delay: i * 0.9,
                      },
                    },
                  }}
                  viewport={{ once: true, amount: "all" }}
                  className="text-xl leading-tight tracking-tight text-foreground xl:text-lg md:text-sm sm:text-sm"
                >
                  {data.text}
                </motion.p>
              ))}
            </div>
            <ul className="mt-12 flex justify-start gap-8 xl:mt-8 md:mt-4 md:gap-0 sm:gap-3">
              {pageContent.lifecycle.map((project, index) => (
                <li className="max-w-[85px]">
                  <div>
                    <h6 className="text-center font-saol text-5xl text-primary xl:text-4xl md:text-4xl sm:text-4xl">
                      <CounterAnimation
                        value={+project.number}
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
              <motion.img
                whileInView={"visible"}
                initial="initial"
                variants={{
                  initial: {
                    height: 0,
                    overflow: "hidden",
                  },
                  visible: {
                    height: "auto",
                    transition: {
                      duration: 0.9,
                    },
                  },
                }}
                viewport={{ once: true, amount: 0.9 }}
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
            <motion.h3
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              className="font-roboto text-6xl font-normal leading-tight text-secondary-50 xl:text-5xl md:text-3xl sm:text-center sm:text-2xl sm:font-normal sm:leading-none"
            >
              {animateText("What ")}
              <span className="font-saol font-semibold italic text-primary">
                {animateText("We Provide ")}
              </span>{" "}
              <br />
              {animateText("To Our Clients")}
            </motion.h3>
          </div>
          <div className="w-6/12 md:w-7/12 sm:w-full">
            <motion.p
              whileInView={"visible"}
              initial="initial"
              variants={{
                initial: {
                  height: 0,
                  overflow: "hidden",
                  opacity: 0,
                },
                visible: {
                  height: "auto",
                  opacity: 1,
                  overflow: "visible",
                  transition: {
                    bounce: 0.25,

                    duration: 0.9,
                  },
                },
              }}
              className="max-w-[745px] pt-8 font-roboto text-2xl font-normal text-white xl:mt-3 xl:text-xl md:text-sm md:font-normal sm:pt-0 sm:text-center sm:text-sm"
            >
              At Inheritance Development LTD, we're not just selling properties,
              we're{" "}
              <span className="text-primary-300">
                building the foundation for your brighter tomorrow
              </span>
              . With dedication and expertise, we work for your better future.
            </motion.p>
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
                {pageContent.services.map(({ name, description }, index) => (
                  <CarouselItem className="w-4/12 flex-none md:mx-1 md:w-4/12 md:pl-0 sm:mx-2 sm:w-6/12 sm:pl-0">
                    <motion.div
                      tabIndex="0"
                      whileHover={"hover"}
                      whileFocus={"hover"}
                      whileTap={"hover"}
                      whileInView={"reveal"}
                      initial="initial"
                      variants={{
                        initial: {
                          opacity: 0.7,
                          y: 50,
                          scale: 0.9,
                        },
                        reveal: {
                          opacity: 1,
                          y: 0,
                          scale: 1,
                          transition: {
                            duration: 0.2,
                            type: "spring",
                            stiffness: 100,
                          },
                        },
                      }}
                      viewport={{ once: true }}
                      className={`group relative flex aspect-[414/400] flex-col justify-end bg-primary-300 bg-[url('/images/mask_bg.png')] bg-cover px-12 pb-12 bg-blend-screen duration-300 hover:cursor-pointer hover:bg-secondary-300 md:aspect-[5/4] md:px-6 md:pb-6 sm:aspect-[1/1.3] sm:px-3 sm:pb-3`}
                    >
                      <div className="">
                        <motion.h4
                          initial="initial"
                          variants={{
                            initial: {
                              opacity: 0,
                              scale: 1.5,
                            },
                            reveal: {
                              opacity: 1,
                              scale: 1,
                            },
                          }}
                          whileInView={"reveal"}
                          className="font-saol text-[46px] text-secondary-300 group-hover:text-primary-300 md:text-4xl"
                        >
                          {index + 1}
                        </motion.h4>
                        <motion.p
                          className="1 mb-2 text-2xl text-secondary-300 duration-300 group-hover:text-3xl group-hover:text-neutral-300 md:text-sm group-hover:md:text-base"
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
          {pageContent.beliefs.map((item, i) => {
            const { icon, name, description } = item.beliefs_id;

            // Helper to split text into letters for animation
            const splitText = (text) =>
              text.split("").map((char, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, y: "100%" }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.05, delay: idx * 0.02 }}
                >
                  {char}
                </motion.span>
              ));

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="px-11 py-5 text-background md:px-4 sm:col-span-3 sm:px-2 sm:py-4"
              >
                <div className="flex items-center gap-3 font-roboto">
                  <motion.img
                    className="invert filter"
                    src={process.env.NEXT_PUBLIC_API_URL + "/assets/" + icon}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: i * 0.2 + 0.2 }}
                  />
                  <h6 className="text-xl font-normal text-secondary-300 md:text-base">
                    {splitText(name)}
                  </h6>
                </div>
                <motion.div>
                  <p className="mt-6 text-start text-3xl text-secondary-300 md:mt-1 md:text-justify md:text-base sm:mt-1 sm:text-base">
                    {splitText(description)}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
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
              {testimonials.map(({ name, description, owner }) => (
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
  let pageContent = await directusClient.request(
    readItem("about_page", 1, {
      fields: [
        "*",
        "beliefs.beliefs_id.name",
        "beliefs.beliefs_id.icon",
        "beliefs.beliefs_id.description",
      ],
    }),
  );
  console.log(pageContent);

  let testimonials = await directusClient.request(readItems("testimonials"));

  return {
    props: {
      testimonials: testimonials,
      pageContent,
    },
  };
}
