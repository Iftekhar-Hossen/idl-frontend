// import { Windows } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import Image from "next/image";
import { directusClient } from "@/lib/directus";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Newsletter } from "@/components/ui/newsletter";
import { readItem } from "@directus/sdk";
import { Overview } from "@/components/section/project/overview";
import { Cover } from "@/components/section/project/cover";
import { MostFeatures } from "@/components/section/project/most-features";
import { Location } from "@/components/section/project/location";
import { FloorPlan } from "@/components/section/project/floor-plan";
import { ApartmentFeatures } from "@/components/section/project/apartment-features";

export default function Index({ project }) {
  console.log(project);

  const [selectedImage, setSelectedImage] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);



  return (
    <>
      <Overview
        name={project.name}
        address={{
          address_line_1: project.address_line_1,
          address_line_2: project.address_line_2,
        }}
        appartement_size={project.appartement_size}
        bedrooms={project.bedrooms}
        completion_date={project.completion_date}
        current_status={project.current_status}
      />

      <Cover coverImage={project.cover.id} />

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

<ApartmentFeatures apartment_features={project.apartment_features} name={project.name} />

      <section className="bg-[#F6F3EC] py-16">
        <div className="container relative mt-8 grid grid-cols-12 gap-12 sm:gap-4">
          <div className="col-span-12 flex items-center justify-between text-end sm:col-span-12 sm:flex sm:items-center sm:justify-between">
            <div>
              <h4 className="text-left text-4xl font-bold sm:text-3xl sm:font-normal">
                Explore{" "}
                <span className="font-saol italic text-primary">
                  {" "}
                  {project.name}
                </span>
              </h4>
            </div>
            <div>
              <Button
                onClick={() => setIndex(0)}
                className="border-2 border-primary bg-transparent font-roboto text-2xl text-primary hover:fill-black hover:text-foreground"
              >
                View All{" "}
              </Button>
            </div>
          </div>

          <div className="col-span-12 mt-8 grid grid-cols-3 gap-x-6 sm:col-span-12">
            {project.gallery.map((image, index) => (
              <div key={index} className="col-span-1">
                <Image
                  src={
                    process.env.NEXT_PUBLIC_API_URL +
                    "/assets/" +
                    image.directus_files_id
                  }
                  alt="gallery1"
                  width={400}
                  height={400}
                  className="h-fit w-full"
                  onClick={() => {
                    setSelectedImage(index), setGalleryOpen(true);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {galleryOpen && (
          <motion.div
            className="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            onClick={close}
          >
            <motion.img
              src={
                process.env.NEXT_PUBLIC_API_URL +
                "/assets/" +
                project.gallery[selectedImage].directus_files_id
              }
              alt="enlarged"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
              style={{ maxHeight: "80%", maxWidth: "80%" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Newsletter />
    </>
  );
}

export async function getServerSideProps({ params }) {
  let data = await directusClient.request(
    readItem("properties", params.slug, {
      fields: ["*.*", "floor_plans.highlights.*"],
      sort: "completion_date",
    }),
  );
  console.log(data);

  return { props: { project: data } };
}
