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

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const fadeInVariants = {
    hidden: { opacity: 0, y: 200, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };
  return (
    <>
      <section ref={ref} className="bg-foreground">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInVariants}
          transition={{ duration: 1.5, ease: "anticipate" }}
          className="container m-auto flex flex-wrap items-end pb-28 pt-24 lg:items-stretch lg:pt-28 md:pb-12 md:pt-[70px] sm:pb-14 sm:pt-10"
        >
          <div className="w-6/12 lg:-mt-3 md:mt-0 md:w-5/12 sm:w-full">
            <h5 className="font-roboto text-[#808080] md:text-sm sm:text-center sm:text-base">
              About us
            </h5>
            <h3 className="font-roboto text-6xl font-bold text-white lg:text-5xl md:text-3xl sm:text-center sm:text-2xl sm:font-normal">
              We <span className="font-saol italic text-primary">Work</span> for
              your <br />
              better{" "}
              <span className="font-saol italic text-primary">Future</span>
            </h3>
          </div>
          <div className="w-6/12 md:w-7/12 sm:w-full">
            <p className="max-w-[630px] pt-8 font-roboto text-xl text-white lg:pt-0 lg:text-lg md:text-sm sm:pt-4 sm:text-center sm:text-sm">
              At Inheritance Development LTD, we're not just selling properties,
              we're building the foundation for your brighter tomorrow. With
              dedication and expertise, we work for your better future.
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
            </p>
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
                {db.about_us.map((data) => (
                  <CarouselItem className="group w-4/12 flex-none md:mx-1 md:w-6/12 md:pl-0 sm:mx-2 sm:pl-0">
                    <motion.div
                      tabIndex="0"
                      whileHover={"hover"}
                      whileFocus={"hover"}
                      whileTap={"hover"}
                      className={`group relative flex aspect-[414/400] flex-col justify-end bg-primary-300 bg-[url('/images/mask_bg.png')] bg-cover px-12 pb-12 bg-blend-screen duration-300 hover:cursor-pointer hover:bg-secondary-300 md:aspect-[5/4] md:px-6 md:pb-6 sm:aspect-[1/1.3] sm:px-3 sm:pb-3`}
                    >
                      <div className="">
                        <h4 className="font-saol text-[46px] group-hover:text-primary-300 md:text-4xl">
                          {data.no}
                        </h4>
                        <motion.p
                          variants={{
                            hover: {
                              // fontWeight: "500"
                            },
                          }}
                          className="1 mb-2 text-2xl duration-300 group-hover:text-3xl md:text-sm group-hover:md:text-base"
                          dangerouslySetInnerHTML={{ __html: data.title }}
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
                          {data.description}
                        </motion.p>
                      </div>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </motion.div>
      </section>
    </>
  );
};
