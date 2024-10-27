import { Newsletter } from "@/components/ui/newsletter";
import { Hero } from "@/components/section/home/hero";
import { About } from "@/components/section/home/about";
import { Project } from "@/components/section/home/project";
import { Review } from "@/components/section/home/review";
import { PressMedia } from "@/components/section/home/press-media";
import { readItem, readItems } from "@directus/sdk";
import { directusClient } from "@/lib/directus";
import Meta from "@/components/meta";
import { Banner } from "@/components/animation/banner";

export default function Home({
  locationsData,
  latestPosts,
  properties,
  testimonials,
  pageContent,
  banners,
  beliefs
}) {
  return (
    <>
      <Meta
        title={pageContent.meta_title}
        description={pageContent.meta_description}
        image={
          process.env.NEXT_PUBLIC_API_URL + "/assets/" + pageContent.meta_image
        }
      />
      <Banner slides={banners} />
      {/* <Hero
        locationsData={locationsData}
        properties={properties}
        testimonials={testimonials}
        pageContent={pageContent}
      /> */}
      <About pageContent={pageContent} />

      <section className="bg-primary py-28 sm:py-10">
        <div className="container grid grid-cols-3 sm:px-3 [&>*:nth-child(2)]:border-x-2 sm:[&>*:nth-child(2)]:border-x-0 sm:[&>*:nth-child(2)]:border-y-2">
          {beliefs.beliefs.map((item, i) => {
            const { icon, name, description } = item.beliefs_id;
            return (
              <div className="px-11 py-5 text-background md:px-4 sm:col-span-3 sm:px-2 sm:py-4">
                <div className="flex items-center gap-3 font-roboto">
                  <img
                  className="filter invert"
                    src={process.env.NEXT_PUBLIC_API_URL + "/assets/" + icon}
                  />
                  {/* <h6>{vision.icon}</h6> */}
                  <h6 className="text-xl font-normal text-secondary-300 md:text-base">
                    {name}
                  </h6>
                </div>
                <div>
                  <p className="mt-6 text-start text-3xl text-secondary-300 md:mt-1 md:text-justify md:text-base sm:mt-1 sm:text-base">
                    {description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Project properties={properties} pageContent={pageContent} />
      <Review testimonials={testimonials} />
      <PressMedia latestPosts={latestPosts} />
      <Newsletter />
    </>
  );
}

export async function getServerSideProps({ params }) {
  let pageContent = await directusClient.request(readItem("homepage", 1));


  let beliefs = await directusClient.request(
    readItem("about_page", 1, {
      fields: [
        "*",
        "beliefs.beliefs_id.name",
        "beliefs.beliefs_id.icon",
        "beliefs.beliefs_id.description",
      ],
    }),
  );

  let banners = await directusClient.request(readItems("banners"));

  let testimonials = await directusClient.request(readItems("testimonials"));

  let latestPosts = await directusClient.request(
    readItems("posts", {
      fields: ["id", "title", "slug", "cover", "date_created", "category.*"],
      limit: 6,
    }),
  );

  let properties = await directusClient.request(
    readItems("properties", {
      fields: [
        "slug",
        "name",
        "address_line_2",
        "current_status",
        "thumbnail",
        "location",
      ],
    }),
  );

  let locations = await directusClient.request(
    readItems("locations", {
      sort: "name",
    }),
  );

  return {
    props: {
      locationsData: locations,
      latestPosts: latestPosts,
      properties: properties,
      testimonials: testimonials,
      pageContent: pageContent,
      banners: banners,
      beliefs: beliefs,
    },
  };
}
