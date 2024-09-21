import { createDirectus, staticToken, rest, readItems } from "@directus/sdk";

export default function Preview() {
  return (
    <div>
      <h1>Preview</h1>
    </div>
  );
}

export async function getServerSideProps(params) {
  let client = createDirectus(process.env.DIRECTUS_URL)
    .with(staticToken(process.env.DIRECTUS_TOKEN))
    .with(rest());

  let data = await client.request(
    readItems("properties", {
      filter: { status: "published" },
      sort: "completion_date",
      fields: [
        "*",
        {
          features: ["*"],
          apartment_features: ["*"],
          floor_plans: ["*"],
        },
      ],
    }),
  );

  // try {
  //   let headers = {
  //     Authorization: `Bearer ${process.env.DIRECTUS_TOKEN}`,
  //   };

  //   let locationsRoute = `${process.env.DIRECTUS_URL}/items/properties?sort=name`;

  //   const [locationsData] = await Promise.all([
  //     fetch(locationsRoute, { headers }),
  //   ]);

  //   const locations = await locationsData.json();
  //   console.log(locations.data);

  //   return {
  //     props: {
  //       locationsData: locations.data,
  //     },
  //   };
  // } catch (e) {
  //   console.log("error", e);
  //   return {
  //     props: {
  //       locationsData: "error",
  //     },
  //   };
  // }
  return {
    props: {},
  };
}
