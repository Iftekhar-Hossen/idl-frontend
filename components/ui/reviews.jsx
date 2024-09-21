import React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import db from "@/lib/db";
export default function Reviews(props) {
  return (
    <Carousel
      {...props}
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent>
        {db.reviews.map((data) => (
          <CarouselItem>
            <div className=" text-center px-10 sm:px-5">
              <p className="text-2xl  font-roboto sm:text-xl sm:font-normal font-normal">
                {data.description}
              </p>
              <div className="flex items-center justify-center mt-6 sm:flex-col">
                <h3 className="text-xl font-saol sm:text-base sm:font-normal font-normal pr-5 sm:p-0">
                  {data.name}
                </h3>
                <h3 className="text-xl sm:text-sm sm:font-light sm:text-foreground  font-normal pl-5 sm:p-0 relative sm:after:hidden after:absolute after:top-0 after:left-0 after:h-full  after:w-1 after:bg-background">
                  {data.designation}
                </h3>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className=" bg-transparent border-0  text-2xl scale-150 sm:hidden" />
      <CarouselNext className=" bg-transparent border-0  text-2xl scale-150 sm:hidden" />
    </Carousel>
  );
}
