import { motion } from "framer-motion";
import Image from "next/image";
// Animation for heading with built-in easing
const headingVariant = {
  hidden: { opacity: 0, y: -50, scale: 0.8, rotate: -5 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

// Animation for list items with built-in easing
const listItemVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.8 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.2, // Delay between list items
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

// Animation for the map image
const imageVariant = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

// Animation for the list itself
const listVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export function Location({ map_image, location_highlights }) {
  return (
    <>
      <section className="bg-foreground py-48 font-roboto sm:py-12 sm:pb-0">
        <div className="container flex items-center gap-9 sm:flex-col-reverse sm:flex-wrap sm:gap-4">
          <div className="w-3/4 sm:w-full">
            {/* Animated Map Image */}
            <motion.div
              variants={imageVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Image
                src={process.env.NEXT_PUBLIC_API_URL + "/assets/" + map_image}
                alt="project1"
                width={1200}
                height={800}
                className="h-fit w-full"
              />
            </motion.div>
          </div>
          <div className="w-1/4 sm:w-full sm:px-16">
            <div>
              <h4 className="mb-8 text-4xl font-semibold text-background sm:text-2xl sm:font-medium">
                Location <br />
                <span className="font-saol italic text-primary">Highlight</span>
              </h4>
              {location_highlights.map((location, locationIndex) => {
                const totalDuration = location.highlights.length * 0.2; // Total duration for the list items to animate

                return (
                  <div key={locationIndex} className="mb-6">
                    {/* Fancy Heading animation */}
                    <motion.h4
                      className="flex items-center gap-2 border-b-2 border-primary pb-1 text-2xl capitalize text-background sm:text-xl sm:font-normal"
                      variants={headingVariant}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      transition={{
                        delay: locationIndex * (totalDuration + 0.8), // Adjusted delay based on previous group
                      }}
                    >
                      <Image
                        src={
                          process.env.NEXT_PUBLIC_API_URL +
                          "/assets/" +
                          location.icon
                        }
                        width={24}
                        height={24}
                        className="filter-primary h-6 w-6"
                      />
                      {location.label}
                    </motion.h4>

                    {/* Fancy List items animation */}
                    <motion.ul
                      className="ml-6 list-image-[url(/images/list_style.png)]"
                      variants={listVariant}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      transition={{
                        delay:
                          locationIndex * (totalDuration + 0.8) + // Delay starts after the previous group (heading + items)
                          0.8, // Added time after heading animation
                      }}
                    >
                      {location.highlights.map((item, itemIndex) => (
                        <motion.li
                          key={itemIndex}
                          className="text-base text-background sm:text-sm sm:first:mt-1"
                          custom={itemIndex}
                          variants={listItemVariant}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          transition={{
                            delay:
                              locationIndex * (totalDuration + 0.8) + // Delay starts after the previous group (heading + items)
                              0.8 + // Added time after heading animation
                              itemIndex * 0.2, // Delay between each list item
                          }}
                        >
                          {item.name}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
