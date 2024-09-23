import { readItems } from "@directus/sdk";
import { directusClient } from "@/lib/directus";
export default function CategoryPage({ posts }) {
  return (
    <>
      <pre>{JSON.stringify(posts, null, 2)}</pre>
    </>
  );
}

export async function getServerSideProps({ params }) {
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
    },
  };
}
