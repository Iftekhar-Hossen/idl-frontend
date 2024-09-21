import React from 'react';
import IconWatch from "@/components/icon/Watch";
import ViewProperties from '../ViewProperties';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
const HeroSection = () => {
  return (
    <section className="h-screen bg-[#F6F3EC] overflow-hidden flex align-between justify-center flex-wrap sm:h-auto">
      <div className="text-center relative z-50 h-auto pt-32 sm:pt-24">
        <h3 className="text-base font-roboto font-medium uppercase sm:text-xs lg:text-[10px">
          THE PERFECT PLAN FOR BUILD
        </h3>
        <h4 className="text-6xl font-light leading-tight font-roboto sm:text-[28px] lg:text-[40px]">
          <span className="font-saol italic text-primary">Smart </span> living
          starts with <br /> smart
          <span className="font-saol italic text-primary"> buildings</span>
        </h4>
        <button className="border-2 z-50 px-5 py-3 sm:px-3 sm:py-2 font-roboto text-primary text-2xl border-primary mt-6 sm:text-base sm:mt-3">
          <span className="flex items-center gap-2 sm:gap-1">
            <IconWatch className="sm:h-4" /> Watch Video
          </span>
        </button>
      </div>
      <div className="relative bg-[url('/images/home_bg.png')] w-screen bg-no-repeat bg-top h-full lg:h-full text-center sm:mt-6 sm:h-52 sm:bg-center sm:bg-cover">
        <div></div>
      </div>
      <div className="absolute w-full top-0 left-0 sm:relative sm:block">
        <div className="container flex justify-between items-center h-screen sm:h-full sm:p-0 sm:bg-foreground sm:flex">
          <Statistics />
          <div className="w-56 flex flex-col items-end text-end sm:w-5/12 sm:bg-primary sm:-mt-12 sm:flex sm:flex-col sm:items-end sm:p-3">
            <p className="text-start text-foreground text-xl font-normal sm:text-background sm:text-sm font-roboto lg:text-[16px]">
              Real estate is property consisting of land and the buildings on
              it, along with its natural resources.
            </p>
            <ViewProperties className="w-20 h-20 sm:w-10 sm:h-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

const Statistics = () => {
  return (
    <div className="flex flex-wrap w-80 gap-8 sm:gap-4 sm:w-7/12 sm:flex-nowrap sm:flex sm:justify-between sm:py-4 sm:px-3">
      <div className="w-full sm:hidden">
        <p className="text-foreground text-base font-roboto font-normal lg:text-[12px]">
          IDL commitment throughout the process smooth and transparent.
          Unlike the experiences of other expats, Their commitment and
          clear communication ensured a complete understanding of the
          house I purchased. I highly recommend IDL for their
          exceptional service.
        </p>
        <div className="flex items-center gap-2 mt-4">
          <Avatar className="w-10 h-10">
            <AvatarImage src="/images/avatar.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-saol text-2xl text-primary lg:text-[16px]">
              Mr. Wahiduzzaman
            </h4>
            <h5 className="font-roboto text-xs font-light lg:text-[10px]">
              Landowner of IDL Amethyst
            </h5>
          </div>
        </div>
      </div>
      {[
        { number: 5, label: "Handover Projects" },
        { number: 5, label: "Ongoing Projects" },
        { number: 9, label: "Upcoming Projects" },
      ].map((stat, idx) => (
        <div key={idx}>
          <h4 className="text-5xl sm:text-3xl font-saol font-normal text-primary text-center">
            {stat.number}
          </h4>
          <p className="text-foreground text-sm font-saol font-normal sm:text-background text-center">
            {stat.label.split(" ").map((line, idx) => (
              <span key={idx}>
                {line}
                <br className="sm:hidden" />
              </span>
            ))}
          </p>
        </div>
      ))}
    </div>
  );
};

export default HeroSection;
