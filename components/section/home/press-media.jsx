import { ArrowRight } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Link from "next/link";

export const PressMedia = ({ latestPosts }) => {
  return (
    <>
      <section className="bg-primary-50 bg-[url(/images/mask_bg.png)] bg-cover py-20 sm:py-10">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between sm:justify-center">
            <h3 className="text-5xl font-normal text-background text-neutral-300 sm:text-center sm:text-2xl">
              Latest{" "}
              <span className="font-saol font-semibold italic text-primary-200">
                Press <br className="md:hidden sm:hidden" /> And Media{" "}
              </span>
            </h3>
            <div className="md:hidden sm:hidden">
              <Link href={"/news"} className="flex text-base text-primary">
                <span>Check our news and media</span>{" "}
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12.3462H19"
                    stroke="#A07758"
                    stroke-width="1.25"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 5.34619L19 12.3462L12 19.3462"
                    stroke="#A07758"
                    stroke-width="1.25"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>

          <div className="mt-9 flex">
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full"
            >
              <CarouselContent className="w-full">
                {latestPosts
                  .map((post, index) => (
                    <CarouselItem
                      key={index}
                      className="group basis-1/3 transition-all ease-in md:basis-1/3 sm:basis-5/6"
                    >
                      <div className="dur bg-secondary-75  px-10 py-12 hover:bg-neutral-300 duration-700 ease-in-out  md:p-6 sm:p-6">
                        <h6 className="mb-1 text-base text-neutral-100 md:text-xs sm:text-xs">
                          {new Date(post.date_created).toDateString()}
                        </h6>
                        <h3 className="mb:mb-1 mb-3 text-3xl font-medium duration-300 group-hover:duration-300 group-hover:text-secondary-300 md:text-xl sm:mb-1 sm:text-xl">
                          {post.title}
                        </h3>
                        <Link
                          href={`/press-media/${post.category.slug}/${post.slug}`}
                          className="flex items-center gap-1 text-primary md:text-xs sm:text-xs"
                        >
                          {" "}
                          Read More{" "}
                          <svg
                            width="16"
                            height="17"
                            viewBox="0 0 16 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3.33301 8.34619H12.6663"
                              stroke="#A07758"
                              stroke-width="1.25"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M8 3.67957L12.6667 8.34623L8 13.0129"
                              stroke="#A07758"
                              stroke-width="1.25"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </Link>
                      </div>
                    </CarouselItem>
                  ))}
              </CarouselContent>
            </Carousel>
          </div>
          <div className="hidden sm:block sm:w-full">
            <Link
              href={"/projects"}
              className="group bottom-0 left-0 mt-3 flex items-center justify-center gap-1 border-[1px] border-primary py-1 text-center text-primary"
            >
              <span className="text-xs font-medium duration-300 hover:group-hover:underline">
                See all news and press
              </span>{" "}
              <ArrowRight strokeWidth={1} height={24} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
