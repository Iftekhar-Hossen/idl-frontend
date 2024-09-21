import React from "react";
import { Input } from "./input";
import { Button } from "./button";
export  function Newsletter(props) {
  return (
    <section className="bg-foreground" {...props}>
      <div className="container sm:px-16 items-center sm:flex-wrap  justify-around flex  py-20 sm:py-6">
        <div className="w-4/12 md:w-5/12 sm:w-full">
          <h3 className="font-roboto text-[57px] md:text-3xl lg:text-4xl leading-tight font-normal capitalize text-secondary-300 sm:text-center sm:text-xl sm:font-normal">
            Subscribe to our{" "}
            <span className="font-saol text-700 text-primary">newsletter</span>
          </h3>
        </div>
        <div className="w-3/12 sm:w-0 md:w-0"></div>
        <div className="w-5/12 sm:w-full md:w-6/12">
          <p className="text-base text-secondary-300 md:text-sm sm:text-center sm:text-sm">
            <span className="sm:hidden md:hidden  text-sm leading-[120%]">
              {" "}
              To receive updates about exclusive experiences, Mondiale events,
              upcoming projects and more, please enter your details below.
            </span>
            <span className="hidden sm:inline-block md:inline-block">
              Get all the latest update easily
            </span>
          </p>
          <div className="mt-3 flex items-stretch">
            <Input
              className="border-none md:h-[48px] border-[#262626] bg-[#262626] px-6 h-[54px] font-roboto text-white outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 sm:text-sm sm:font-normal"
              placeholder="Enter your Email address"
            />
            <Button className="font-roboto h-[54px] md:h-[48px] w-[115px] text-white sm:text-base sm:font-normal">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
