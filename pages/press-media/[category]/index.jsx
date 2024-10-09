import Link from "next/link";
import { readItems } from "@directus/sdk";
import { directusClient } from "@/lib/directus";
import { Icons } from "@/components/icon";
export default function CategoryPage({ posts, categories }) {
  return (
    <>
      <section className="mt-20 py-8 text-secondary-300 sm:mt-9">
        <div className="container flex flex-wrap items-center justify-between">
          <div className="w-4/12 sm:w-full">
            <h3 className="text-[46px] text-neutral-300 sm:text-3xl">
              Press <span className="font-saol italic text-primary">And</span>{" "}
              Media
            </h3>
          </div>
          <div className="w-8/12 sm:w-full">
            <ul className="flex flex-wrap items-center justify-end gap-10 sm:mt-2 sm:justify-start">
              <li className="">
                <Link className="text-neutral-300" href={`/press-media`}>
                  All
                </Link>
              </li>
              {categories.map((item, index) => (
                <li key={index} className="">
                  <Link
                    className="text-neutral-300"
                    href={`/press-media/${item.slug}`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="container mb-8 mt-4 grid grid-cols-3 gap-10 sm:grid-cols-2">
        {posts.map((item, index) => (
          <div className="bg-secondary-400">
            <div>
              <div className="flex aspect-[10/9] items-center">
                <img
                  className="w-full object-cover object-center"
                  src={
                    process.env.NEXT_PUBLIC_API_URL + "/assets/" + item.cover
                  }
                />
              </div>
              <div className="bg-secondary-300 px-8 py-6 sm:px-2 sm:py-1">
                {item.brochure ? (
                  <div className="grid grid-cols-12 content-center">
                    <div className="col-span-10">
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
                        className="flex items-end gap-2 text-base text-secondary-400 sm:text-xs"
                        href={`/press-media/${item.category}/${item.slug}`}
                      >
                        {item.brochure ? "See Brochure" : "See More"}

                        <Icons.rightArrow className="h-5 w-6 stroke-primary-100 sm:h-4 sm:w-4" />
                      </Link>
                    </div>
                    <div className="col-span-2 grid content-center place-content-end">
                      <a
                        className="inline-block"
                        href={
                          process.env.NEXT_PUBLIC_API_URL +
                          "/assets/" +
                          item.brochure +
                          "?download"
                        }
                      >
                        <Icons.download className="h-7 w-7" />
                      </a>
                    </div>
                  </div>
                ) : (
             
                 <>
                 
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
                      className="flex items-end gap-2 text-base text-secondary-400 sm:text-xs"
                      href={`/press-media/${item.category}/${item.slug}`}
                    >
                      {item.brochure ? "See Brochure" : "See More"}

                      <Icons.rightArrow className="h-5 w-6 stroke-primary-100 sm:h-4 sm:w-4" />
                    </Link></>
                 
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  let categories = await directusClient.request(readItems("categories"));

  let posts = await directusClient.request(
    readItems("posts", {
      filter: {
        category: params.category,
        status: "published",
      },
    }),
  );

  if (!posts.length) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      posts: posts,
      categories,
    },
  };
}
