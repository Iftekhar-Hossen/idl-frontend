import Link from "next/link";
import { readItems } from "@directus/sdk";
import { directusClient } from "@/lib/directus";
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
    </>
  );
}

export async function getServerSideProps({ params }) {
  let categories = await directusClient.request(readItems("categories"));

  let posts = await directusClient.request(
    readItems("posts", {
      filter: {
        category: params.category,
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
