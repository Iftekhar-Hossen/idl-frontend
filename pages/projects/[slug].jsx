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
import Link from "next/link";
import { ScheduleMeeting } from "@/components/section/project/schedule-meeting";

export default function Index({ project }) {
  console.log(project);

  const [selectedImage, setSelectedImage] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);

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

      <ApartmentFeatures
        apartment_features={project.apartment_features}
        apartment_features_text={project.apartment_features_text}
        name={project.name}
      />

      <section className="relative z-10  pb-24 pt-20 sm:-mt-36">
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
                <Image
                  src={
                    process.env.NEXT_PUBLIC_API_URL +
                    "/assets/" +
                    image.directus_files_id.id
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


      <ScheduleMeeting />


      <Newsletter />
    </>
  );
}

export async function getServerSideProps({ params }) {
  let data = await directusClient.request(
    readItem("properties", params.slug, {
      fields: [
        "*.*",
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
