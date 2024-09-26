import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Delay between each child animation
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 }, // Start from below with 0 opacity
  visible: { opacity: 1, y: 0 }, // Animate upwards and show fully
};
export function MostFeatures({ features }) {
  return (
    <>
      <section className="bg-[#F6F3EC] pb-20 pt-40 font-roboto md:pt-16 sm:bg-background sm:pt-20">
        <div className="container">
          <div className="text-center">
            <h5 className="text-base md:text-xs sm:text-xs sm:font-medium">
              See the most <br className="hidden sm:block" /> important features
            </h5>
            <h4 className="font-roboto text-4xl font-semibold text-neutral-300 md:text-3xl sm:text-3xl sm:font-bold">
              At A{" "}
              <span className="font-saol italic text-primary-300">Glance</span>
            </h4>
          </div>

          <motion.div
            className="mt-24 content-center md:mt-8 sm:mt-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }} // Trigger the animation once when 10% of the container is in view
          >
            <div className="grid snap-x snap-mandatory grid-cols-10 gap-y-10 sm:flex sm:flex-nowrap sm:overflow-y-scroll">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  className="col-span-2 text-center sm:snap-center"
                  variants={itemVariants}
                >
                  <div className="m-auto flex h-24 w-24 items-center justify-center border border-primary md:h-16 md:w-16">
                    <Image
                      src={
                        process.env.NEXT_PUBLIC_API_URL +
                        "/assets/" +
                        feature.icon
                      }
                      alt="feature1"
                      width={96}
                      height={96}
                      className="filter-primary m-auto"
                    />
                  </div>
                  <motion.h5
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    transition={{
                      delay: 0.5 * i,
                    }}
                    className="m-auto mt-3 w-24 text-base font-normal md:mt-2 md:text-base sm:text-sm"
                  >
                    {feature.name}
                  </motion.h5>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
