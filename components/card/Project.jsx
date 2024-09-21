// CardComponent.jsx
import React from "react";
import Link from "next/link";
import { LocateIcon, MapPin } from "lucide-react";
import Image from "next/image";

import { motion } from "framer-motion";
export const ProjectCard = ({ project, variant }) => {
  return (
    <Link
      className="group relative block h-full"
      href={"/projects/" + project.slug}
    >
      <motion.div className="mx-auto h-full w-full overflow-hidden">
        <motion.div
          className="relative h-full w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.05 }}
        >
          <img
            src={project.acf.thumbnail.url}
            alt={project.title}
            className="h-full w-fit object-top"
          />
        </motion.div>
        <div className="absolute left-0 top-0 z-10 h-full w-full bg-gradient-to-b from-[#1e1e1e00] from-[31%] to-[#1E1E1E] to-[100%] duration-500 group-hover:from-0% group-hover:bg-[length:800px_700px]">
          <div className="absolute bottom-7 left-8 z-50 font-roboto text-background duration-300 ease-in-out sm:left-4">
            <h4 className="mb-2 text-4xl font-normal text-secondary-300 sm:mb-1 sm:text-base">
              {project.title.rendered}
            </h4>
            <h3 className="flex items-center gap-1 text-[19px] text-secondary-200 sm:text-xs sm:text-background">
              <MapPin size={16} strokeWidth={2.75} />
              {project.acf.project_location.address_line_3}
            </h3>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

const overlayVariants = {
  rest: { backgroundColor: "rgba(30, 30, 30, 0.25)" },
  hover: { backgroundColor: "rgba(30, 30, 30, 0.70)" },
};

const textVariants = {
  rest: { y: 0 },
  hover: { y: -40 },
};

const addressVariants = {
  rest: { opacity: 1 },
  hover: { opacity: 0 },
};

const seeProjectVariants = {
  rest: { opacity: 0 },
  hover: { opacity: 1 },
};
