// components/Meta.js

import Head from "next/head";

const Meta = ({
  title = "Inheritanc Bd Ltd",
  description = "Inheritanc Bd Ltd is a real estate company that provides a wide range of services to its clients. We are a team of professionals who are dedicated to providing the best services to our clients.",
  url = "https://inheritancebd.com/",
  image
}) => {
  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

     {image && <meta property="og:image" content={image} />}

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      {image && <meta property="twitter:image" content={image} />}
    </Head>
  );
};

export default Meta;
