import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Newsletter } from "@/components/ui/newsletter";
import { directusClient } from "@/lib/directus";
import { readItems } from "@directus/sdk";
import { Card, CardContent } from "@/components/ui/card";
import { useCallback } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
export default function PressMedia({
  categories,
  posts,
  featuredPost,
  topPosts,
}) {
  const [api, setApi] = useState();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const onDotClick = useCallback(
    (index) => {
      api?.scrollTo(index);
    },
    [api],
  );

  let socialMedia = [
    {
      name: "Facebook",
      link: "https://www.facebook.com/inheritancebd?mibextid=ZbWKwL",
      icon: (
        <svg
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_127_4241)">
            <path
              d="M24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 17.9895 4.38825 22.954 10.125 23.8542V15.4688H7.07812V12H10.125V9.35625C10.125 6.34875 11.9165 4.6875 14.6576 4.6875C15.9705 4.6875 17.3438 4.92188 17.3438 4.92188V7.875H15.8306C14.3399 7.875 13.875 8.79998 13.875 9.74897V12H17.2031L16.6711 15.4688H13.875V23.8542C19.6118 22.954 24 17.9895 24 12Z"
              fill="#1877F2"
            />
            <path
              d="M16.6711 15.4688L17.2031 12H13.875V9.74897C13.875 8.79998 14.3399 7.875 15.8306 7.875H17.3438V4.92188C17.3438 4.92188 15.9705 4.6875 14.6576 4.6875C11.9165 4.6875 10.125 6.34875 10.125 9.35625V12H7.07812V15.4688H10.125V23.8542C10.7359 23.9501 11.3621 24 12 24C12.6379 24 13.264 23.9501 13.875 23.8542V15.4688H16.6711Z"
              fill="#FEFEFD"
            />
          </g>
          <defs>
            <clipPath id="clip0_127_4241">
              <rect width={24} height={24} fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
    },

    {
      name: "LinkedIn",
      link: "https://www.linkedin.com/company/inheritance-development-ltd-idl/",
      icon: (
        <svg
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_127_4248)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M24 3C24 1.34423 22.6558 0 21 0H3C1.34423 0 0 1.34423 0 3V21C0 22.6558 1.34423 24 3 24H21C22.6558 24 24 22.6558 24 21V3Z"
              fill="#2867B2"
            />
            <path
              d="M6.88182 8.375H2.86182V20.467H6.88182V8.375Z"
              fill="#FEFEFD"
            />
            <path
              d="M4.899 2.54297C3.52364 2.54297 2.625 3.44719 2.625 4.63233C2.625 5.79258 3.49631 6.72173 4.8458 6.72173H4.87177C6.27347 6.72173 7.14595 5.79258 7.14595 4.63233C7.11994 3.44719 6.27356 2.54297 4.899 2.54297Z"
              fill="#FEFEFD"
            />
            <path
              d="M16.7477 8.08984C14.6154 8.08984 13.6603 9.26252 13.1254 10.0862V8.37419H9.10645C9.15974 9.50842 9.10645 20.4661 9.10645 20.4661H13.1254V13.7131C13.1254 13.3517 13.1513 12.9903 13.2579 12.732C13.5479 12.0101 14.2097 11.2623 15.3201 11.2623C16.7737 11.2623 17.3561 12.3716 17.3561 13.9964V20.4661H21.3752V13.5319C21.3752 9.81766 19.3922 8.08984 16.7477 8.08984Z"
              fill="#FEFEFD"
            />
          </g>
          <defs>
            <clipPath id="clip0_127_4248">
              <rect width={24} height={24} fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
    },

    {
      name: "Instagram",
      link: "https://www.instagram.com/inheritancedevelopmentltd/",
      icon: (
        <svg
          width={24}
          height={24}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          id="instagram"
        >
          <linearGradient
            id="a"
            x1="1.464"
            x2="14.536"
            y1="14.536"
            y2="1.464"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset={0} stopColor="#FFC107" />
            <stop offset=".507" stopColor="#F44336" />
            <stop offset=".99" stopColor="#9C27B0" />
          </linearGradient>
          <path
            fill="url(#a)"
            d="M11 0H5a5 5 0 0 0-5 5v6a5 5 0 0 0 5 5h6a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5zm3.5 11c0 1.93-1.57 3.5-3.5 3.5H5c-1.93 0-3.5-1.57-3.5-3.5V5c0-1.93 1.57-3.5 3.5-3.5h6c1.93 0 3.5 1.57 3.5 3.5v6z"
          />
          <linearGradient
            id="b"
            x1="5.172"
            x2="10.828"
            y1="10.828"
            y2="5.172"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset={0} stopColor="#FFC107" />
            <stop offset=".507" stopColor="#F44336" />
            <stop offset=".99" stopColor="#9C27B0" />
          </linearGradient>
          <path
            fill="url(#b)"
            d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 6.5A2.503 2.503 0 0 1 5.5 8c0-1.379 1.122-2.5 2.5-2.5s2.5 1.121 2.5 2.5c0 1.378-1.122 2.5-2.5 2.5z"
          />
          <linearGradient
            id="c"
            x1="11.923"
            x2="12.677"
            y1="4.077"
            y2="3.323"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset={0} stopColor="#FFC107" />
            <stop offset=".507" stopColor="#F44336" />
            <stop offset=".99" stopColor="#9C27B0" />
          </linearGradient>
          <circle cx="12.3" cy="3.7" r=".533" fill="url(#c)" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <section className="mt-20 bg-neutral-300 py-8 text-secondary-300 sm:mt-9">
        <div className="container flex flex-wrap items-center justify-between">
          <div className="w-4/12 sm:w-full">
            <h3 className="text-[46px] sm:text-3xl">
              Press <span className="font-saol italic text-primary">And</span>{" "}
              Media
            </h3>
          </div>
          <div className="w-8/12 sm:w-full">
            <ul className="flex flex-wrap items-center justify-end gap-10 sm:mt-2 sm:justify-start">
              {categories.map((item, index) => (
                <li key={index} className="">
                  <Link href={`/press-media/${item.slug}`}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="bg-neutral-400 pb-[200px] pt-[120px] sm:pt-10">
        <div className="container flex flex-wrap">
          <div className="relative w-9/12 pr-5 sm:w-full sm:pr-0">
            <div className="absolute left-3 top-[410px] z-10 flex justify-center space-x-2 pb-4 sm:top-[205px]">
              {featuredPost.map((_, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="icon"
                  className={`${current == index && "border-primary bg-transparent"} h-2 w-2 rounded border-2`}
                  onClick={() => current !== index && onDotClick(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <Carousel setApi={setApi} className="relative w-full">
              <CarouselContent>
                {featuredPost.map((post, index) => (
                  <CarouselItem key={index}>
                    <div className="flex h-[431px] w-full items-center overflow-hidden sm:h-56">
                      <img
                        className="h-full w-full object-cover object-center"
                        src={
                          process.env.NEXT_PUBLIC_API_URL +
                          "/assets/" +
                          post.cover
                        }
                      />
                    </div>
                    <div className="bg-neutral-300 p-10 sm:p-5">
                      <h5 className="mb-1 text-[15px] leading-none text-secondary-500 sm:text-xs">
                        {post.category?.name + " | "}{" "}
                        {new Date(post.date_created).toDateString()}
                      </h5>
                      <h4 className="mb-2 text-[29px] leading-none text-secondary-300 sm:mb-1 sm:text-2xl">
                        {post.title}
                      </h4>
                      <p className="text-[15px] text-secondary-400 sm:text-xs">
                        {post.description}
                      </p>
                      <Link
                        href={`/press-media/${post.category.slug}/${post.slug}`}
                        className="mt-3 flex items-center gap-2 text-base leading-none text-primary sm:mt-2 sm:text-sm"
                      >
                        <span>Read More</span>{" "}
                        <div className="sm:h-4 sm:w-4">
                          <svg
                            className="h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5 12H19"
                              stroke="#A07758"
                              strokeWidth="1.25"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12 5L19 12L12 19"
                              stroke="#A07758"
                              strokeWidth="1.25"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </Link>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
          <div className="w-3/12 pl-5 sm:w-full sm:pl-0">
            <div className="sm:hidden">
              <h3 className="text-[23px] leading-none text-secondary-300">
                Newsletter
              </h3>
              <form className="mt-2 flex">
                <Input
                  className="h-full border-none border-[#262626] bg-[#262626] px-6 py-3 font-roboto text-white outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 sm:text-sm sm:font-normal"
                  placeholder="Enter your Email address"
                />
                <Button className="block px-3 py-2 font-roboto text-white sm:text-base sm:font-normal">
                  Subscribe
                </Button>
              </form>
            </div>
            <div className="mt-2 sm:hidden">
              <h3 className="text-[23px] text-secondary-300">Follow Us</h3>
              <ul className="grid gap-y-2 mt-2">
                {socialMedia.map((item, index) => (
                  <li
                    key={index}
                    className=""
                  >
                    <Link href={item.link} className="flex items-center gap-6 bg-neutral-300 p-4">
                    <div className="h-5 w-5">{item.icon}</div>
                    <h6 className="text-[19px] text-secondary-300">
                      {item.name}
                    </h6></Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-2 sm:mt-5">
              <h3 className="text-[23px] text-secondary-300">Top Post</h3>
              <ul>
                <li className="mt-2 grid grid-cols-12 gap-3">
                  <div className="col-span-4">
                    <img
                      className="aspect-square h-full object-cover object-center"
                      src={
                        process.env.NEXT_PUBLIC_API_URL +
                        "/assets/" +
                        topPosts[0].cover
                      }
                    />
                  </div>
                  <div className="col-span-7 flex flex-col justify-between py-1">
                    <div>
                      <h5 className="text-2xl leading-none text-secondary-300">
                        {topPosts[0].title}
                      </h5>
                      <h6 className="text-[10px] text-secondary-500">
                        {new Date(topPosts[0].date_created).toDateString()}
                      </h6>
                    </div>
                    <Link
                      href={`/press-media/${topPosts[0].category.slug}/${topPosts[0].slug}`}
                      className="flex items-center gap-2 text-xs text-primary"
                    >
                      See Post
                      <svg
                        className="h-3 w-3"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.3335 6H10.6668"
                          stroke="#A07758"
                          stroke-width="1.25"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M6 1.33337L10.6667 6.00004L6 10.6667"
                          stroke="#A07758"
                          stroke-width="1.25"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="-mt-32 pb-20">
        <div className="container grid grid-cols-3 gap-10 sm:grid-cols-2">
          {posts.map((item, index) => (
            <div className="bg-secondary-400">
              <div>
                <div className="flex aspect-[10/9] items-center">
                  <img
                    className="h-full object-cover object-center"
                    src={
                      process.env.NEXT_PUBLIC_API_URL + "/assets/" + item.cover
                    }
                  />
                </div>
                <div className="bg-secondary-300 px-8 py-6 sm:px-2 sm:py-1">
                  <h6 className="text-[12px] text-secondary-500 sm:text-[10px]">
                    {item.category?.name && item.category.name + " | "}{" "}
                    {item.date_created
                      ? new Date(item.date_created).toDateString()
                      : "No date available"}
                  </h6>
                  <h4 className="mb-3 text-[23px] leading-[27.6px] text-neutral-300 sm:mb-1 sm:text-base sm:leading-none">
                    {item.title}
                  </h4>
                  <Link
                    className="flex items-center gap-2 text-base text-secondary-400 sm:text-xs"
                    href={`/press-media/${item.category.slug}/${item.slug}`}
                  >
                    See More{" "}
                    <div className="h-6 w-6 sm:h-4 sm:w-4">
                      <svg
                        width={"100%"}
                        height={"100%"}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 12H19"
                          stroke="#A07758"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 5L19 12L12 19"
                          stroke="#A07758"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Newsletter />
    </>
  );
}

export async function getServerSideProps({ params }) {
  let categories = await directusClient.request(readItems("categories"));
  let topPosts = await directusClient.request(
    readItems("posts", {
      sort: "-views",
      filter: {
        status: "published",
      },
      fields: ["id", "title", "slug", "cover", "date_created", "category.*"],
      limit: 3,
    }),
  );
  let posts = await directusClient.request(
    readItems("posts", {
      filter: {
        status: "published",
      },
      fields: ["id", "title", "slug", "cover", "date_created", "category.*"],
    }),
  );

  let featuredPost = await directusClient.request(
    readItems("posts", {
      filter: {
        featured: true,
        status: "published",
      },
      fields: [
        "id",
        "title",
        "slug",
        "description",
        "cover",
        "date_created",
        "category.*",
      ],
    }),
  );
  return {
    props: {
      categories: categories,
      posts: posts,
      featuredPost: featuredPost,
      topPosts: topPosts,
    },
  };
}
