import db from "@/lib/db";
import { Newsletter } from "@/components/ui/newsletter";
import { Hero } from "@/components/section/home/hero";
import { About } from "@/components/section/home/about";
import { Project } from "@/components/section/home/project";
import { Review } from "@/components/section/home/review";
import { PressMedia } from "@/components/section/home/press-media";
import { check } from "prettier";
import { readItem, readItems } from "@directus/sdk";
import { directusClient } from "@/lib/directus";
import { Footer } from "@/components/footer";

export default function Home({
  locationsData,
  latestPosts,
  properties,
  statics,
  testimonials
}) {
  return (
    <>
      <Hero
        locationsData={locationsData}
        properties={properties}
        statics={statics}
        testimonials={testimonials}
      />
      <About  services={statics.services}  />
      <Project properties={properties} />
      <Review  testimonials={testimonials}/>
      <PressMedia latestPosts={latestPosts} />
      <Newsletter />
    </>
  );
}

export async function getServerSideProps({ params }) {
  let statics = await directusClient.request(
    readItem("static", 1, {
      fields: ["heading", "sub_heading", "video", "lifecycle", "services"],
    }),
  );

  let testimonials = await directusClient.request(
    readItems("testimonials"))

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
      statics: statics,
      testimonials: testimonials
    },
  };
}
