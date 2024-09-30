// import { Windows } from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import React, { useRef, useEffect } from "react";

import Image from "next/image";
import { directusClient } from "@/lib/directus";
import { useState } from "react";
import { Newsletter } from "@/components/ui/newsletter";
import { readItem } from "@directus/sdk";
import { Overview } from "@/components/section/project/overview";
import { Cover } from "@/components/section/project/cover";
import { MostFeatures } from "@/components/section/project/most-features";
import { Location } from "@/components/section/project/location";
import { FloorPlan } from "@/components/section/project/floor-plan";
import { ApartmentFeatures } from "@/components/section/project/apartment-features";
import Link from "next/link";

import { X, ChevronLeft, ChevronRight } from "lucide-react";

const FullScreenGallery = ({ images, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") navigateImage(-1);
      if (e.key === "ArrowRight") navigateImage(1);
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  const navigateImage = (direction) => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + direction;
      if (newIndex < 0) return images.length - 1;
      if (newIndex >= images.length) return 0;
      return newIndex;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
    >
      <button
        onClick={onClose}
        className="absolute right-4 top-4 text-white hover:text-gray-300"
      >
        <X size={24} />
      </button>
      <button
        onClick={() => navigateImage(-1)}
        className="absolute left-4 text-white hover:text-gray-300"
      >
        <ChevronLeft size={36} />
      </button>
      <button
        onClick={() => navigateImage(1)}
        className="absolute right-4 text-white hover:text-gray-300"
      >
        <ChevronRight size={36} />
      </button>
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Gallery image ${currentIndex + 1}`}
          className="max-h-[90vh] max-w-[90vw] object-contain"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        />
      </AnimatePresence>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 transform text-white">
        {currentIndex + 1} / {images.length}
      </div>
    </motion.div>
  );
};

export default function Index({ project }) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const galleryImages = project.gallery.map(
    (image) =>
      `${process.env.NEXT_PUBLIC_API_URL}/assets/${image.directus_files_id.id}`,
  );

  return (
    <>
      <Overview
        project={project}
        address={{
          address_line_1: project.address_line_1,
          address_line_2: project.address_line_2,
        }}
        appartement_size={project.appartement_size}
        completion_date={project.completion_date}
        bedrooms={project.bedrooms}
        name={project.name}
        current_status={project.current_status}
      />

      <Cover coverImage={project.cover.id} video={project.promo_video} text={project.promo_video_text} />

      <MostFeatures features={project.features} />
      <Location
        map_image={project.map.id}
        location_highlights={project.location_highlights}
      />

      <FloorPlan
        name={project.name}
        floor_plan_text={project.floor_plan_text}
        floor_plans={project.floor_plans}
      />

      <ApartmentFeatures
        apartment_features={project.apartment_features}
        apartment_features_text={project.apartment_features_text}
        name={project.name}
      />

      <section className="relative z-10 pb-24 pt-20 sm:-mt-36">
        <div className="container relative mt-8 grid grid-cols-12 gap-9 sm:gap-4">
          <div className="col-span-12 flex items-center justify-between text-end sm:col-span-12 sm:flex sm:items-center sm:justify-between">
            <div>
              <h4 className="text-left text-4xl font-bold sm:text-2xl sm:font-normal">
                Explore{" "}
                <span className="font-saol italic text-primary">
                  {" "}
                  {project.name}
                </span>
              </h4>
            </div>
            <div>
              <Link
                href={"/press/"}
                className="flex items-center justify-between gap-x-1 text-base text-primary"
              >
                See More{" "}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.958984 8H14.959"
                    stroke="#A07758"
                    stroke-width="1.25"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M7.95898 1L14.959 8L7.95898 15"
                    stroke="#A07758"
                    stroke-width="1.25"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>

          <div className="col-span-12 mt-0 grid grid-cols-12 gap-6 sm:col-span-12 sm:gap-4">
            {project.gallery.map((image, index) => (
              <div key={index} className="col-span-4 sm:col-span-6">
                <RevealImage
                  src={`${process.env.NEXT_PUBLIC_API_URL}/assets/${image.directus_files_id.id}`}
                  alt={`gallery-image-${index + 1}`}
                  width={400}
                  height={400}
                  onClick={() => {
                    setSelectedImageIndex(index);
                    setIsGalleryOpen(true);
                  }}
                  index={index}
                />
              </div>
            ))}
          </div>
          <AnimatePresence>
            {isGalleryOpen && (
              <FullScreenGallery
                images={galleryImages}
                initialIndex={selectedImageIndex}
                onClose={() => setIsGalleryOpen(false)}
              />
            )}
          </AnimatePresence>
        </div>
      </section>

      <Newsletter />
    </>
  );
}

const RevealImage = ({ src, alt, width, height, onClick, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    triggerOnce: true,
    margin: "-100px",
    amount: 0.3,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 1 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.9 }}
      style={{ position: "relative", overflow: "hidden" }}
    >
      <motion.div
        initial={{ top: 0 }}
        animate={isInView ? { top: "100%" } : { top: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut", delay: index * 0.2 }} // Add delay based on index
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "#a07758",
          zIndex: 1,
        }}
      />
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="h-fit w-full"
        onClick={onClick}
      />
    </motion.div>
  );
};

export async function getServerSideProps({ params }) {
  let data = await directusClient.request(
    readItem("properties", params.slug, {
      fields: [
        "*.*",
        "apartment_features.*",
        "floor_plans.highlights.*",
        "gallery.directus_files_id.id",
        "gallery.directus_files_id.width",
        "gallery.directus_files_id.height",
      ],
      sort: "completion_date",
    }),
  );
  console.log(data);

  return { props: { project: data } };
}
