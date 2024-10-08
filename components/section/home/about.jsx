import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import db from "@/lib/db";
import Link from "next/link";

export const About = ({ pageContent }) => {
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
      <section className="bg-foreground">
        <motion.div className="container m-auto flex flex-wrap items-end pb-28 pt-24 lg:items-stretch lg:pt-28 md:pb-12 md:pt-[70px] sm:pb-14 sm:pt-10">
          <div className="w-6/12 lg:-mt-3 md:mt-0 md:w-5/12 sm:w-full">
            <h5 className="font-roboto text-[#808080] md:text-sm sm:text-center sm:text-base">
              About us
            </h5>
            <motion.h3
              variants={containerVariants}
              initial="hidden"
              whileInView={"visible"}
              viewport={{ once: true }}
              className="font-roboto text-6xl font-bold text-white lg:text-5xl md:text-3xl sm:text-center sm:text-2xl sm:font-normal"
            >
              {animateText("We ")}

              {animateText("Work ", "font-saol italic text-primary")}
              {animateText("for your ")}
              <br />
              {animateText("your better ")}

              {animateText("Future", "font-saol italic text-primary")}
            </motion.h3>
          </div>
          <div className="w-6/12 md:w-7/12 sm:w-full">
            <motion.p
              className="max-w-[630px] pt-8 font-roboto text-xl text-white lg:pt-0 lg:text-lg md:text-sm sm:pt-4 sm:text-center sm:text-sm"
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
            >
              {pageContent.about_us_description
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
              <br />
              <Link
                href="/about"
                className="mt-1 flex items-center text-base text-primary sm:mt-4 sm:inline-flex sm:border sm:border-primary-300 sm:px-4 sm:py-2"
              >
                See more{" "}
                <svg
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 12.8639L10 8.86389L6 4.86389"
                    stroke="#A07758"
                    stroke-width="1.25"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </Link>
            </motion.p>
          </div>
          <div className="mt-20 w-full md:mt-1 sm:mt-7">
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
                {pageContent.about_us_cards.map(
                  ({ name, description }, index) => (
                    <CarouselItem className="group w-4/12 flex-none md:mx-1 md:w-6/12 md:pl-0 sm:mx-2 sm:pl-0">
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
                  ),
                )}
              </CarouselContent>
            </Carousel>
          </div>
        </motion.div>
      </section>
    </>
  );
};
