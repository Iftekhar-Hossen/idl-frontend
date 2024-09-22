import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
export function FloorPlan({ floor_plans, name, floor_plan_text }) {
  let [selectedFloor, setSelectedFloor] = useState(floor_plans[0]);

  return (
    <>
      <section className="bg-background py-[90px] sm:pt-11 sm:pb-8 font-roboto">
        <motion.div
          transition={{ duration: 0.5 }}
          className="container relative sm:mt-4"
        >
          <motion.div
            transition={{ duration: 0.5 }}
            className="w-4/12 md:pr-0 pr-6 md:w-full"
          >
            <div className="md:text-center sm:text-left">
              <h5 className="m-0 font-roboto text-[19px] font-medium leading-[120%] md:text-xs sm:text-xs">
                Explore {name}
              </h5>
              <h4 className="m-0 mb-4 md:mb-1 font-roboto text-[57px] font-normal leading-[120%] md:text-3xl sm:text-3xl sm:font-normal">
                Floor{" "}
                <span className="font-saol font-bold italic text-primary-300">
                  Plan
                </span>
              </h4>
              {floor_plan_text && (
                <p className="mb-8 sm:text-left font-roboto text-[15px] leading-[120%] md:m-auto md:max-w-[470px] md:text-center md:text-xs sm:text-xs">
                  {floor_plan_text}
                </p>
              )}
            </div>

            <ul className="relative sm:justify-start sm:gap-x-0 md:mt-4 flex gap-x-5 after:absolute after:bottom-0 after:h-[1px] after:w-full after:bg-secondary-400 md:justify-center">
              {floor_plans.map((floor, index) => (
                <motion.li key={floor.id} className="m-0">
                  <motion.button
                    onClick={() => setSelectedFloor(floor)}
                    className={`relative m-0 p-0 sm:text-[10px] sm:px-2 sm:pb-1 pb-2 font-roboto text-lg font-normal leading-none md:text-xs ${
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

          <div className="mt-0 grid w-full md:mt-4 grid-cols-12 md:gap-x-4 gap-x-6">
            <div className="col-span-4 sm:col-span-12 mt-4 md:mt-0 md:col-span-4">
              <motion.div className="w-full">
                {selectedFloor?.highlights?.length > 0 && (
                  <motion.div>
                    <motion.ui className="flex gap-4 md:gap-2 pb-4 sm:mb-2 md:pb-0">
                      <AnimatePresence>
                        {selectedFloor?.highlights?.map((highlight, index) => (
                          <motion.li
                            key={index}
                            className="flex items-center md:text-[10px] gap-1 -mt-2 text-base text-primary sm:text-xs"
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
                    </motion.ui>
                  </motion.div>
                )}

                <table className="w-full  border-collapse divide-y divide-gray-200 border-[1px] border-t border-foreground">
                  <thead>
                    <tr className="border-t-[1px] border-foreground">
                      <th className="pl-5 md:text-sm text-start font-roboto text-base font-semibold text-primary sm:text-sm sm:font-semibold">
                        Title
                      </th>
                      <th className="pr-5 md:text-sm text-end font-roboto text-base font-semibold text-primary sm:text-sm sm:font-semibold">
                        SQFT
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence>
                      {selectedFloor?.items?.map((room, index) => (
                        <motion.tr
                          key={index}
                          transition={{}}
                          className="border-t-[1px] border-foreground font-roboto sm:text-xs sm:font-normal"
                        >
                          <th className="pl-5 md:text-xs text-left font-roboto text-base font-normal leading-6 sm:text-xs sm:font-normal">
                            {room.name}
                          </th>
                          <th className="pr-5 md:text-xs text-end font-roboto text-base font-normal leading-6 sm:text-xs sm:font-normal">
                            {room.size}
                          </th>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </motion.div>
            </div>
            <motion.div
              layout // This prop enables smooth height changes
              transition={{ duration: 0.5, bounce: 0, type: "tween" }}
              className="relative sm:col-span-12 col-span-8 mt-0 md:col-span-8 sm:h-auto sm:min-h-32 md:min-h-[286.73px]"
            >
              <div className="w-full sm:col-span-12 sm:mt-5">
                <motion.div
                  key={selectedFloor.id}
                  initial={{ opacity: 0, filter: "blur(5px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.5 }}
                  className="absolute sm:relative bottom-0 md:top-0 left-0 w-full"
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
      </section>
    </>
  );
}
