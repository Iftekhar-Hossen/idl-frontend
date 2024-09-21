import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ArrowRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel,CarouselContent, CarouselItem } from "@/components/ui/carousel";


const ProjectsSection = ({ projects }) => {
  return (
    <section className="bg-accent bg-[url(/images/mask_bg.png)] bg-cover py-20 sm:py-10">
      <div className="container m-auto flex flex-wrap sm:flex-nowrap pt-44 pb-28 sm:pt-0 sm:pb-0">
        <div className="max-w-7xl m-auto flex flex-wrap">
          <div className="w-2/12 sm:w-full lg:mb-4">
            <h5 className="text-[#808080] text-2xl sm:text-xs sm:text-center">
              Our Projects
            </h5>
          </div>
          <div className="w-7/12 sm:w-full lg:mb-4 ">
            <h3 className="text-7xl font-bold items-center columns-1 sm:text-2xl sm:text-center">
              We build
              <span className="text-primary font-cormorant italic ml-2">
                Quality
              </span>{" "}
              <br className="lg:none" />
              real estate projects
            </h3>
          </div>
          <div className="w-3/12 sm:w-full lg:mb-4">
            <p className="text-2xl leading-8 sm:text-sm sm:text-center">
              IDL is working in Bangladesh to produce the finest quality
              housing & commercial projects.
            </p>
          </div>
        </div>
        <div className="w-full">
          <Tabs defaultValue="ongoing" className="border-0">
            <TabsList className="bg-transparent text-[#B6B6B6]">
              {['ongoing', 'upcoming', 'handover'].map((status) => (
                <TabsTrigger
                  key={status}
                  value={status}
                  className="font-bold text-2xl data-[state=active]:text-primary data-[state=active]:border-b-2 sm:text-base sm:font-normal"
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>
            {['ongoing', 'upcoming', 'handover'].map((status) => (
              <TabsContent key={status} value={status}>
                <Carousel>
                  <CarouselContent className="flex flex-wrap sm:w-full sm:flex-nowrap">
                    {projects.filter((project) => project.status === status).map((project, idx) => (
                      <CarouselItem
                        key={idx}
                        className="w-4/12 flex-none px-2 py-6 sm:w-10/12 sm:pl-0 sm:border-r-[15px] sm:border-background"
                      >
                        <Link className="bg-background p-4 group block" href={`/projects/${project.slug}`}>
                            <div className="relative h-[23rem] w-full sm:h-[15rem]">
                              <Image
                                src={project.image}
                                alt={project.name}
                                layout="fill"
                                objectFit="cover"
                              />
                            </div>
                            <div className="mt-8">
                              <h4 className="text-xl font-bold group-hover:text-primary duration-300 sm:text-base">
                                {project.name}
                              </h4>
                              <p className="mt-2 text-sm text-[#808080] sm:text-xs">
                                <MapPin className="w-4 h-4 inline-block mr-2 sm:w-3 sm:h-3" />
                                {project.location}
                              </p>
                              <div className="text-sm mt-2 group-hover:text-primary duration-300 sm:text-xs">
                                <span>Learn more </span>
                                <ArrowRight className="w-4 h-4 inline-block sm:w-3 sm:h-3" />
                              </div>
                            </div>
                        </Link>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
