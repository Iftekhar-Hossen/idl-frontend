import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
export function FloorPlan({ floor_plans, name, floor_plan_text }) {

    let [selectedFloor, setSelectedFloor] = useState(floor_plans[0]);

    let FloorDetails = () => {
      return (
        <motion.div
          layout
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-full"
        >
          {selectedFloor?.highlights?.length > 0 ? (
            <motion.div initial={{ height: 0 }} animate={{ height: "auto" }}>
              <motion.ui className="flex gap-4 pb-4">
                <AnimatePresence>
                  {selectedFloor?.highlights?.map((highlight, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -5 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="flex items-center gap-1 text-base text-primary sm:text-xs"
                    >
                      <img
                        className="filter-primary"
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
          ) : (
            <motion.div
              initial={{
                height: 24,
              }}
              animate={{
                height: 0,
              }}
            ></motion.div>
          )}
  
          <table className="w-full border-collapse divide-y divide-gray-200 border-[1px] border-t border-foreground">
            <thead>
              <tr className="border-t-[1px] border-foreground">
                <th className="pl-5 text-start font-roboto text-base font-semibold text-primary sm:text-sm sm:font-semibold">
                  Title
                </th>
                <th className="pr-5 text-end font-roboto text-base font-semibold text-primary sm:text-sm sm:font-semibold">
                  SQFT
                </th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {selectedFloor?.items?.map((room, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    className="border-t-[1px] border-foreground font-roboto sm:text-xs sm:font-normal"
                  >
                    <th className="pl-5 text-left font-roboto text-base font-normal leading-6 sm:text-xs sm:font-normal">
                      {room.name}
                    </th>
                    <th className="pr-5 text-end font-roboto text-base font-normal leading-6 sm:text-xs sm:font-normal">
                      {room.size}
                    </th>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </motion.div>
      );
    };



  return (
    <>
      <section className="bg-background py-[90px] font-roboto">
        <motion.div
          transition={{ duration: 0.5 }}
          className="container sm:mt-4"
        >
          <motion.div
            transition={{ duration: 0.5 }}
            className="w-4/12 md:w-full"
          >
            <div className="sm:text-left">
              <h5 className="m-0 font-roboto text-[19px] font-medium leading-[120%] sm:text-xs">
                Explore {name}
              </h5>
              <h4 className="m-0 mb-4 font-roboto text-[57px] font-normal leading-[120%] sm:text-3xl sm:font-normal">
                Floor{" "}
                <span className="font-saol font-bold italic text-primary-300">
                  Plan
                </span>
              </h4>
              {floor_plan_text && (
                <p className="mb-8 font-roboto text-[15px] leading-[120%] sm:text-xs">
                  {floor_plan_text}
                </p>
              )}
            </div>

            <ul className="flex gap-x-5 border-b">
              {floor_plans.map((floor, index) => (
                <motion.li key={floor.id} className="m-0">
                  <motion.button
                    onClick={() => setSelectedFloor(floor)}
                    className={`m-0 text-lg font-normal ${
                      selectedFloor.id === floor.id
                        ? "text-neutral-300"
                        : "text-secondary-500"
                    }`}
                  >
                    {floor.name}
                  </motion.button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <div className="mt-0 grid w-full grid-cols-12 gap-x-6">
            <div className="col-span-4">
              <FloorDetails />
            </div>
            <motion.div
              layout // This prop enables smooth height changes
              transition={{ duration: 0.5, bounce: 0, type: "tween" }}
              className="col-span-8 mt-0 flex"
            >
              <div className="w-full sm:col-span-12 sm:mt-5">
                <motion.div
                  key={selectedFloor.id}
                  initial={{ opacity: 0, filter: "blur(5px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.5 }}
                  className="relative w-full"
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
