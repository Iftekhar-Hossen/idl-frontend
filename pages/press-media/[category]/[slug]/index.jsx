import { directusClient } from "@/lib/directus";
import { readItems, updateItem } from "@directus/sdk";
import { motion } from "framer-motion";
import { Newsletter } from "@/components/ui/newsletter";
import Link from "next/link";
import Head from "next/head";

function getImageSequences(blocks) {
  const imageSequences = [];
  let currentSequence = [];
  let inSequence = false;

  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i].type === "image") {
      if (!inSequence) {
        inSequence = true;
        currentSequence = [i];
      } else {
        currentSequence.push(i);
      }
    } else {
      if (inSequence) {
        imageSequences.push(currentSequence);
        currentSequence = [];
        inSequence = false;
      }
    }
  }

  if (inSequence) {
    imageSequences.push(currentSequence);
  }

  return imageSequences;
}

function renderBlockContent(block, isLastOdd, index, totalImages) {
  switch (block.type) {
    case "header":
      return (
        <h2
          className="col-span-2 text-3xl"
          dangerouslySetInnerHTML={{
            __html: block.data.text,
          }}
        ></h2>
      );
    case "image":
      let columnSpanClass = "col-span-1";

      // If it's a single image or the last image in an odd sequence, set col-span-2
      if (totalImages === 1 || (isLastOdd && index === totalImages)) {
        columnSpanClass = "col-span-2";
      }

      return (
        <div className={`${columnSpanClass} sm:col-span-2`}>
          <img
            className="w-full"
            src={
              process.env.NEXT_PUBLIC_API_URL +
              "/assets/" +
              block.data.file.fileId
            }
            alt={block.data.caption}
          />
        </div>
      );
    case "paragraph":
      return (
        <p
          className="col-span-2 text-base sm:text-sm"
          dangerouslySetInnerHTML={{
            __html: block.data.text,
          }}
        ></p>
      );
    default:
      return null;
  }
}

function RenderAllBlocks(blocks) {
  const imageSequences = getImageSequences(blocks);
  const renderedContent = [];
  let imageIndex = 0;

  blocks.forEach((block, i) => {
    if (block.type === "image") {
      // Find the current image sequence
      const currentSequence = imageSequences.find((seq) => seq.includes(i));
      const totalImagesInSequence = currentSequence.length;
      const isOddSequence = totalImagesInSequence % 2 !== 0;

      // Render the image with proper col-span
      renderedContent.push(
        renderBlockContent(
          block,
          isOddSequence,
          imageIndex,
          totalImagesInSequence,
        ),
      );
      imageIndex++;
    } else {
      // Render non-image blocks
      renderedContent.push(renderBlockContent(block));
    }
  });

  return renderedContent;
}

export default function Page({ post }) {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("viewed-post", post.id);
  }

  let i = 0;
  while (i < post.content.blocks) {
    i++;
  }

  return (
    <>
      <Head>
        {/* SEO Meta Tags */}
        <title>{post.title} | Your Blog Name</title>
        <meta name="description" content={post.description} />
        <meta name="author" content={"Inheritanc BD LTD"} />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href={"https://inheritancebd.com/press-media/" + post.slug}
        />

        {/* Open Graph Tags for Social Sharing */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta
          property="og:image"
          content={process.env.NEXT_PUBLIC_API_URL + "/assets/" + post.cover}
        />
        <meta
          property="og:url"
          content={"https://inheritancebd.com/press-media/" + post.slug}
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:article:published_time"
          content={post.date_created}
        />
        <meta property="og:article:author" content={"Inheritanc BD LTD"} />
        <meta property="og:site_name" content="Inheritanc BD LTD" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description} />
        <meta
          name="twitter:image"
          content={process.env.NEXT_PUBLIC_API_URL + "/assets/" + post.cover}
        />

        {/* Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: post.title,
              image: [
                process.env.NEXT_PUBLIC_API_URL + "/assets/" + post.cover,
              ],
              author: {
                "@type": "Organization",
                name: "Inheritanc BD LTD",
              },
              datePublished: post.date_created,
              description: post.description,
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": "https://inheritancebd.com/press-media/" + post.slug,
              },
            }),
          }}
        />
      </Head>
      <section className="mb-[120px] mt-40 sm:mt-16">
        <div className="container flex flex-wrap">
          <div className="w-1/12 sm:absolute sm:w-1/12">
            <div className="flex items-start gap-y-4 sm:gap-0">
              <Link
                href={"/press-media"}
                className="flex h-6 w-6 items-center sm:h-5 sm:w-5"
              >
                <svg
                  width={"100%"}
                  height={"100%"}
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.1899 12H5.18994"
                    stroke="#969490"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.1899 19L5.18994 12L12.1899 5"
                    stroke="#969490"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
          <div className="w-9/12 sm:w-full">
            <h6 className="mb-0 text-[15px] font-normal text-secondary-500 sm:ml-8">
              <Link href={`/press-media/${post.category.slug}`}>
                {post.category.name}
              </Link>{" "}
              | {new Date(post.date_created).toDateString({})}
            </h6>
            <motion.h1
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
              }}
              className="mb-4 text-[46px] font-bold leading-tight text-primary sm:mb-2 sm:text-3xl"
            >
              {post.title}
            </motion.h1>
            <main className="grid gap-x-5 gap-y-4 2xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 sm:gap-x-1 sm:gap-y-2">
              {post.brochure && (
              <iframe
                className="col-span-2 h-screen w-full"
                src={
                  process.env.NEXT_PUBLIC_API_URL + "/assets/" + post.brochure
                }
                width="100%"
              ></iframe>)}
              {RenderAllBlocks(post.content.blocks)}
            </main>
          </div>
          <div className="relative w-2/12 sm:mt-4 sm:w-full">
            <div className="sticky top-1/2 flex -translate-y-1/2 items-center justify-center sm:relative sm:justify-start">
              <div>
                <h6 className="s mb-2 w-full text-center text-[19px] text-secondary-500 sm:text-left">
                  Share
                </h6>
                <ul className="flex flex-col items-center gap-8 sm:flex-row">
                  <li>
                    <svg
                      className="cursor-pointer"
                      onClick={() => {
                        window.open(
                          `https://www.facebook.com/sharer/sharer.php?u=https://inheritancebd.com/press-media/${post.slug}`,
                          "popup",
                          "width=600,height=600",
                        );
                      }}
                      width={33}
                      height={32}
                      viewBox="0 0 33 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_136_5251)">
                        <path
                          d="M32.5 16.099C32.5 7.26297 25.336 0.0989685 16.5 0.0989685C7.664 0.0989685 0.5 7.26297 0.5 16.099C0.5 24.0856 6.35067 30.7043 14 31.9043V20.7243H9.93733V16.0976H14V12.575C14 8.56563 16.3893 6.34964 20.044 6.34964C21.7933 6.34964 23.6253 6.66297 23.6253 6.66297V10.6003H21.6067C19.6187 10.6003 18.9987 11.8336 18.9987 13.099V16.099H23.436L22.7267 20.7256H18.9987V31.9056C26.6493 30.7043 32.5 24.0843 32.5 16.099Z"
                          fill="#969490"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_136_5251">
                          <rect
                            width={32}
                            height={32}
                            fill="white"
                            transform="translate(0.5)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </li>
                  <li>
                    <svg
                      className="cursor-pointer"
                      onClick={() => {
                        window.open(
                          `https://www.linkedin.com/sharing/share-offsite/?url=https://inheritancebd.com/press-media/${post.slug}`,
                          "popup",
                          "width=600,height=600",
                        );
                      }}
                      width={33}
                      height={32}
                      viewBox="0 0 33 32"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_136_5263)">
                        <g clipPath="url(#clip1_136_5263)">
                          <path
                            d="M27.7627 27.2693H23.024V19.844C23.024 18.0733 22.988 15.7947 20.5547 15.7947C18.084 15.7947 17.7067 17.7213 17.7067 19.7133V27.2693H12.968V12H17.52V14.0813H17.5813C18.2173 12.8813 19.764 11.6147 22.0747 11.6147C26.876 11.6147 27.764 14.7747 27.764 18.888L27.7627 27.2693ZM7.616 9.91067C6.09067 9.91067 4.86533 8.676 4.86533 7.15733C4.86533 5.64 6.092 4.40667 7.616 4.40667C9.136 4.40667 10.368 5.64 10.368 7.15733C10.368 8.676 9.13467 9.91067 7.616 9.91067ZM9.992 27.2693H5.24V12H9.992V27.2693ZM29.8333 0H3.16667C1.86133 0 0.5 1.39333 0.5 2.66667V29.3333C0.5 30.608 1.86133 32 3.16667 32H29.8333C31.1373 32 32.5 30.608 32.5 29.3333V2.66667C32.5 1.39333 31.1373 0 29.8333 0Z"
                            fill="#969490"
                          />
                        </g>
                      </g>
                      <defs>
                        <clipPath id="clip0_136_5263">
                          <rect
                            width={32}
                            height={32}
                            fill="white"
                            transform="translate(0.5)"
                          />
                        </clipPath>
                        <clipPath id="clip1_136_5263">
                          <rect
                            width={32}
                            height={32}
                            fill="white"
                            transform="translate(0.5)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </li>
                  <li>
                    <svg
                      className="cursor-pointer hover:fill-primary"
                      width={33}
                      height={32}
                      viewBox="0 0 33 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_136_5267)">
                        <g clipPath="url(#clip1_136_5267)">
                          <path
                            d="M16.5 0C12.1533 0 11.6107 0.02 9.904 0.096C8.2 0.176 7.04 0.444 6.02 0.84C4.968 1.248 4.07467 1.796 3.18533 2.68533C2.296 3.57467 1.74667 4.46667 1.34 5.52C0.944 6.54 0.674667 7.7 0.596 9.404C0.516 11.1107 0.5 11.6533 0.5 16C0.5 20.3467 0.52 20.8893 0.596 22.596C0.676 24.2987 0.944 25.46 1.34 26.48C1.748 27.5307 2.296 28.4253 3.18533 29.3147C4.07467 30.2027 4.96667 30.7533 6.02 31.16C7.04133 31.5547 8.20133 31.8253 9.904 31.904C11.6107 31.984 12.1533 32 16.5 32C20.8467 32 21.3893 31.98 23.096 31.904C24.7987 31.824 25.96 31.5547 26.98 31.16C28.0307 30.752 28.9253 30.2027 29.8147 29.3147C30.7027 28.4253 31.2533 27.5347 31.66 26.48C32.0547 25.46 32.3253 24.2987 32.404 22.596C32.484 20.8893 32.5 20.3467 32.5 16C32.5 11.6533 32.48 11.1107 32.404 9.404C32.324 7.70133 32.0547 6.53867 31.66 5.52C31.252 4.468 30.7027 3.57467 29.8147 2.68533C28.9253 1.796 28.0347 1.24667 26.98 0.84C25.96 0.444 24.7987 0.174667 23.096 0.096C21.3893 0.016 20.8467 0 16.5 0ZM16.5 2.88C20.7707 2.88 21.28 2.90133 22.9667 2.97467C24.5267 3.048 25.3733 3.30667 25.936 3.528C26.6853 3.81733 27.216 4.164 27.7787 4.72267C28.3373 5.28267 28.684 5.81467 28.9733 6.564C29.192 7.12667 29.4533 7.97333 29.524 9.53333C29.6 11.2213 29.6173 11.728 29.6173 16C29.6173 20.272 29.5973 20.78 29.5187 22.4667C29.4373 24.0267 29.1773 24.8733 28.9573 25.436C28.6587 26.1853 28.3187 26.716 27.7587 27.2787C27.2 27.8373 26.66 28.184 25.9187 28.4733C25.3587 28.692 24.4987 28.9533 22.9387 29.024C21.24 29.1 20.74 29.1173 16.46 29.1173C12.1787 29.1173 11.6787 29.0973 9.98133 29.0187C8.42 28.9373 7.56 28.6773 7 28.4573C6.24133 28.1587 5.72 27.8187 5.16133 27.2587C4.6 26.7 4.24133 26.16 3.96133 25.4187C3.74133 24.8587 3.48267 23.9987 3.40133 22.4387C3.34133 20.7587 3.32 20.24 3.32 15.98C3.32 11.7187 3.34133 11.1987 3.40133 9.49867C3.48267 7.93867 3.74133 7.08 3.96133 6.52C4.24133 5.76 4.6 5.24 5.16133 4.67867C5.72 4.12 6.24133 3.76 7 3.48133C7.56 3.26 8.40133 3 9.96133 2.92C11.6613 2.86 12.1613 2.84 16.44 2.84L16.5 2.88ZM16.5 7.784C11.96 7.784 8.284 11.464 8.284 16C8.284 20.54 11.964 24.216 16.5 24.216C21.04 24.216 24.716 20.536 24.716 16C24.716 11.46 21.036 7.784 16.5 7.784ZM16.5 21.3333C13.5533 21.3333 11.1667 18.9467 11.1667 16C11.1667 13.0533 13.5533 10.6667 16.5 10.6667C19.4467 10.6667 21.8333 13.0533 21.8333 16C21.8333 18.9467 19.4467 21.3333 16.5 21.3333ZM26.9613 7.46C26.9613 8.52 26.1 9.38 25.0413 9.38C23.9813 9.38 23.1213 8.51867 23.1213 7.46C23.1213 6.40133 23.9827 5.54133 25.0413 5.54133C26.0987 5.54 26.9613 6.40133 26.9613 7.46Z"
                            fill="#969490"
                          />
                        </g>
                      </g>
                      <defs>
                        <clipPath id="clip0_136_5267">
                          <rect
                            width={32}
                            height={32}
                            fill="white"
                            transform="translate(0.5)"
                          />
                        </clipPath>
                        <clipPath id="clip1_136_5267">
                          <rect
                            width={32}
                            height={32}
                            fill="white"
                            transform="translate(0.5)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Newsletter />
    </>
  );
}

export async function getServerSideProps({ params }) {
  let posts = await directusClient.request(
    readItems("posts", {
      filter: {
        slug: params.slug,
        status: "published",
      },
      fields: ["*", "category.*", "content.*"],
    }),
  );
  console.log(posts);

  if (!posts.length) {
    return {
      notFound: true,
    };
  }

  directusClient.request(
    updateItem("posts", posts[0].id, {
      views: posts[0].views + 1,
    }),
  );

  return {
    props: {
      post: posts[0],
    },
  };
}
