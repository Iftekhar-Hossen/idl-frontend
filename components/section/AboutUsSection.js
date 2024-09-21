import React from 'react';
import { Carousel,CarouselContent, CarouselItem } from "@/components/ui/carousel";
const AboutUsSection = ({ aboutUs }) => {
  return (
    <section className="bg-foreground">
      <div className="container m-auto grid grid-cols-12 pt-44 pb-28 sm:pb-14 sm:pt-10">
        <div className="col-span-6 sm:col-span-12">
          <h5 className="text-[#808080] font-roboto sm:text-center sm:text-base">
            About us
          </h5>
          <h3 className="text-white text-6xl font-bold font-roboto sm:text-center sm:text-2xl sm:font-normal">
            We <span className="text-primary italic font-saol">Work</span> for
            your <br />
            better{" "}
            <span className="text-primary italic font-saol">Future</span>
          </h3>
        </div>
        <div className="col-span-6 sm:col-span-12">
          <p className="text-white pt-8 font-roboto sm:text-sm sm:text-center sm:pt-4">
            Our attention to detail and well-informed service delivery. We
            approach each new project with enthusiasm and professionalism and
            strive to make every project enjoyable and stress-free for our
            clients...
          </p>
        </div>
        <div className="col-span-12 mt-20 sm:mt-10 bg-[url(/images/mask_bg.png)] bg-cover bg-[#262626]">
          <Carousel opts={{ align: "start", loop: true }}>
            <CarouselContent className="flex flex-wrap sm:w-full sm:flex-nowrap">
              {aboutUs.map((data, idx) => (
                <CarouselItem
                  key={idx}
                  className="w-4/12 flex-none sm:pl-0 sm:w-7/12 sm:border-r-[15px] sm:border-foreground"
                >
                  <div className="pt-36 pb-9 px-20 sm:px-10 text-white hover:text-primary hover:bg-white duration-300">
                    <h4 className="text-5xl mb-4 font-saol sm:text-3xl sm:mb-3">
                      {data.no}
                    </h4>
                    <p
                      className="text-xl font-roboto sm:text-base"
                      dangerouslySetInnerHTML={{ __html: data.title }}
                    ></p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
