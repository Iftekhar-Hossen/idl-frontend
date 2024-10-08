import { Newsletter } from "@/components/ui/newsletter";
import { Hero } from "@/components/section/home/hero";
import { About } from "@/components/section/home/about";
import { Project } from "@/components/section/home/project";
import { Review } from "@/components/section/home/review";
import { PressMedia } from "@/components/section/home/press-media";
import { readItem, readItems } from "@directus/sdk";
import { directusClient } from "@/lib/directus";
import Meta from "@/components/meta";

export default function Home({
  locationsData,
  latestPosts,
  properties,
  testimonials,
  pageContent,
}) {
  return (
    <>
      <Meta
        title={pageContent.meta_title}
        description={pageContent.meta_description}
        image={process.env.NEXT_PUBLIC_API_URL+ "/assets/" + pageContent.meta_image}
      />
      <Hero
        locationsData={locationsData}
        properties={properties}
        testimonials={testimonials}
        pageContent={pageContent}
      />
      <About  pageContent={pageContent}/>
      <Project properties={properties} pageContent={pageContent}/>
      <Review testimonials={testimonials} />
      <PressMedia latestPosts={latestPosts} />
      <Newsletter />
    </>
  );
}

export async function getServerSideProps({ params }) {
  let pageContent = await directusClient.request(readItem("homepage", 1));

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
    },
  };
}
