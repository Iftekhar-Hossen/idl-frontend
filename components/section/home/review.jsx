import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { useRef } from "react";
import db from "@/lib/db";
import { AnimatePresence, motion, useInView } from "framer-motion";
export const Review = ({testimonials}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const fadeInVariants = {
    hidden: { filter: "blur(5px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };
  return (
    <>
      <motion.section ref={ref}

        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fadeInVariants}
        transition={{ duration: 0.9, ease: "circIn" }}

      className="relative z-0 bg-cover bg-no-repeat py-11 pb-[80px] pt-[80px] after:absolute after:left-0 after:top-0 after:z-10 after:h-full after:w-full after:bg-[#a07758f7] sm:py-8">
        <div className="container relative z-20">
          <div className="absolute w-full md:relative sm:relative">
            <h3 className="mb-8 text-center text-2xl font-normal text-background text-secondary-300 md:mb-0 md:text-sm sm:mb-1 sm:text-sm">
              Our Clients Lovely Words.
            </h3>
          </div>
          <Carousel
            className="relative pt-16 sm:pt-2 md:pt-4"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              <AnimatePresence>
                {testimonials.map(({name, description, owner}) => (
                  <CarouselItem>
                    <div className="m-auto flex h-full max-w-[1080px] flex-col justify-center px-10 text-center sm:px-5">
                      <p className="font-roboto text-3xl font-normal text-secondary md:text-xl sm:text-xl sm:font-normal">
                        {description}
                      </p>
                      <div className="mt-6 md:mt-4 flex items-center justify-center sm:mt-4 sm:flex-col">
                        <h3 className="pr-5 font-saol md:text-base text-xl font-normal text-secondary-300 sm:p-0 sm:text-base sm:font-normal">
                          {name}
                        </h3>
                        <h3 className="relative pl-5 text-xl md:text-base font-normal text-secondary-300 after:absolute after:left-0 after:top-0 after:h-full after:w-1 after:bg-background sm:p-0 sm:text-sm sm:font-light sm:text-foreground sm:after:hidden">
                          {owner}
                        </h3>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </AnimatePresence>
            </CarouselContent>
            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 scale-125 border-none bg-transparent text-slate-300 sm:hidden" />
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 scale-125 border-none bg-transparent text-slate-300 sm:hidden" />
          </Carousel>
        </div>
      </motion.section>
    </>
  );
};
