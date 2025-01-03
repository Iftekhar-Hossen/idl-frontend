import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Parallax, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/parallax";
import "swiper/css/autoplay";

export const Banner = ({ slides }) => {
  const [reverse, setReverse] = useState(false);
  const [reverseLast, setReverseLast] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [parallaxValue, setParallaxValue] = useState(400);

  // Function to set parallax value based on screen size
  const updateParallax = () => {
    const width = window.innerWidth;
    if (width < 768) {
      setParallaxValue(200); // Small screens
    } else if (width < 1200) {
      setParallaxValue(300); // Medium screens
    } else {
      setParallaxValue(400); // Large screens
    }
  };

  // Set parallax on initial load and on resize
  useEffect(() => {
    updateParallax();
    window.addEventListener("resize", updateParallax);
    return () => window.removeEventListener("resize", updateParallax);
  }, []);
  useEffect(() => {
    // Add a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      setMounted(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="creative-showcase--slider">
      <Swiper
        modules={[Navigation, Pagination, Parallax, Autoplay]}
        speed={reverse ? 700 : 2500}
        onSlideChange={(swiper) => {
          if (swiper.isEnd) {
            setTimeout(() => {
              setReverse(true);
            }, 1900);
            setTimeout(() => {
              setReverseLast(true);
            }, 2700);
          }
          if (reverse) {
            if (swiper.isBeginning) {
              setReverse(false);
              setReverseLast(false);
            }
          }
        }}
        
        allowTouchMove={false}
        
        autoplay={{
          delay: reverse ? 500 : 2500,
          disableOnInteraction: true,
          reverseDirection: reverse,
          stopOnLastSlide: true,
          pauseOnMouseEnter: false
        }}
        parallax
        loop
        pagination={{
          clickable: true,
          el: ".custom-pagination",
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="slide-bg"
              style={{
                backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URL}/assets/${slide.image})`,
              }}
              data-swiper-parallax={parallaxValue}
            >
              <div className="slide-container">
                <div className="slide-row">
                  <div className="slider-content block w-full overflow-hidden">
                    <h1
                      className={`slide-heading w-full xl:text-[114px] lg:text-[110px] md:text-[100px] sm:text-5xl ${reverseLast ? "hidden" : "block"} ${
                        mounted ? "slide-mounted" : ""
                      }`}
                    >
                      {slide.line_1} <br />
                      {slide.line_2}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="custom-pagination absolute bottom-10 left-10 flex space-x-2"></div>
      </Swiper>
    </section>
  );
};
