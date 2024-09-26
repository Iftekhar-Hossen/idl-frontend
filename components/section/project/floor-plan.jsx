import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export function FloorPlan({ floor_plans, name, floor_plan_text }) {
  const [selectedFloor, setSelectedFloor] = useState(floor_plans[0]);
  const [prevItemsCount, setPrevItemsCount] = useState(
    selectedFloor.items.length,
  );

  const rowVariant = {
    hidden: { opacity: 0, y: 20, borderColor: "transparent" },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      borderColor: "rgba(0, 0, 0, 0.1)",
      borderTopWidth: "1px",
      transition: {
        opacity: {
          delay: index * 0.1, // Delay for opacity and y movement
          duration: 0.4,
        },
        borderColor: {
          delay: index * 0.1, // Delay for border color change
          duration: 0.1,
        },
        borderTopWidth: {
          delay: index * 0.1 + 0.2, // Delay for border animation after opacity
          duration: 0.1,
        },
      },
    }),
  };

  // Detect floor change to control the row animations
  const handleFloorChange = (floor) => {
    setPrevItemsCount(selectedFloor.items.length); // Store current row count
    setSelectedFloor(floor); // Update the selected floor
  };

  return (
    <>
      <motion.section
        className="bg-background py-[90px] font-roboto sm:pb-8 sm:pt-11"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }} // Entrance animation for section
      >
        <motion.div
          transition={{ duration: 0.5 }}
          className="container relative sm:mt-4"
        >
          <motion.div
            transition={{ duration: 0.5 }}
            className="w-4/12 pr-6 md:w-full md:pr-0"
          >
            <div className="md:text-center sm:text-left">
              <h5 className="m-0 font-roboto text-[19px] font-medium leading-[120%] md:text-xs sm:text-xs">
                Explore {name}
              </h5>
              <h4 className="m-0 mb-4 font-roboto text-[57px] font-normal leading-[120%] md:mb-1 md:text-3xl sm:text-3xl sm:font-normal">
                Floor{" "}
                <span className="font-saol font-bold italic text-primary-300">
                  Plan
                </span>
              </h4>
              {floor_plan_text && (
                <p className="mb-8 font-roboto text-[15px] leading-[120%] md:m-auto md:max-w-[470px] md:text-center md:text-xs sm:text-left sm:text-xs">
                  {floor_plan_text}
                </p>
              )}
            </div>

            <ul className="relative flex gap-x-5 after:absolute after:bottom-0 after:h-[1px] after:w-full after:bg-secondary-400 md:mt-4 md:justify-center sm:justify-start sm:gap-x-0">
              {floor_plans.map((floor) => (
                <motion.li key={floor.id} className="m-0">
                  <motion.button
                    onClick={() => handleFloorChange(floor)}
                    className={`relative m-0 p-0 pb-2 font-roboto text-lg font-normal leading-none md:text-xs sm:px-2 sm:pb-1 sm:text-[10px] ${
                      selectedFloor.id === floor.id
                        ? "text-neutral-300"
                        : "text-secondary-500"
                    } after:absolute after:bottom-0 after:left-0 after:z-50 after:h-[2px] after:w-full after:bg-primary after:opacity-0 after:transition-opacity ${
                      selectedFloor.id === floor.id
                        ? "after:opacity-100"
                        : "after:opacity-0"
                    }`}
                  >
                    {floor.name}
                  </motion.button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <div className="mt-0 grid w-full grid-cols-12 gap-x-6 md:mt-4 md:gap-x-4">
            <div className="col-span-4 mt-4 md:col-span-4 md:mt-0 sm:col-span-12">
              <motion.div  className="w-full">
                {selectedFloor?.highlights?.length > 0 && (
                  <motion.div>
                    <motion.ul className="flex gap-4 pb-4 md:gap-2 md:pb-0 sm:mb-2">
                      <AnimatePresence>
                        {selectedFloor?.highlights?.map((highlight, index) => (
                          <motion.li
                            key={index}
                            className="-mt-2 flex items-center gap-1 text-base text-primary md:text-[10px] sm:text-xs"
                          >
                            <img
                              className="filter-primary md:h-[10px] md:w-[10px]"
                              src={
                                process.env.NEXT_PUBLIC_API_URL +
                                "/assets/" +
                                highlight.icon
                              }
                              alt="icon"
                            />
                            <span>{highlight.name}</span>
                          </motion.li>
                        ))}
                      </AnimatePresence>
                    </motion.ul>
                  </motion.div>
                )}

                <table className="w-full border-collapse divide-y divide-gray-200 border-[1px] border-t border-foreground">
                  <thead>
                    <tr className="border-t-[1px] border-foreground">
                      <th className="pl-5 text-start font-roboto text-base font-semibold text-primary md:text-sm sm:text-sm sm:font-semibold">
                        Title
                      </th>
                      <th className="pr-5 text-end font-roboto text-base font-semibold text-primary md:text-sm sm:text-sm sm:font-semibold">
                        Size
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedFloor?.items?.map((room, index) => (
                      <motion.tr
                        key={`${room.name}-${index * Math.random()}`} // Use room name combined with index to create a unique key
                        custom={index}
                        initial="hidden" // Only animate new rows
                        animate="visible"
                        exit="hidden"
                        variants={rowVariant} // Apply row animation
                        className="border-foreground font-roboto sm:text-xs sm:font-normal"
                      >
                        <th className="pl-5 text-left font-roboto text-base font-normal leading-6 md:text-xs sm:text-xs sm:font-normal">
                          {room.name}
                        </th>
                        <th className="pr-5 text-end font-roboto text-base font-normal leading-6 md:text-xs sm:text-xs sm:font-normal">
                          {room.size}
                        </th>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            </div>

            <motion.div
              layout // Smooth height changes for blueprint
              transition={{ duration: 0.5, bounce: 0, type: "tween" }}
              className="relative col-span-8 mt-0 md:col-span-8 md:min-h-[286.73px] sm:col-span-12 sm:h-auto sm:min-h-32"
            >
              <div className="w-full sm:col-span-12 sm:mt-5">
                <motion.div
                  key={selectedFloor.id}
                  initial={{ opacity: 0, filter: "blur(5px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.5 }}
                  className="absolute bottom-0 left-0 w-full md:top-0 sm:relative"
                >
                  <Image
                    src={
                      process.env.NEXT_PUBLIC_API_URL +
                      "/assets/" +
                      selectedFloor.blueprint
                    }
                    alt="floor"
                    width={1200}
                    height={800}
                    className="max-h-[500px] w-full"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>
    </>
  );
}
