/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "temp.codethousand.net",
      "assets.inheritancebd.com",
      "assets-idl.imgix.net",
      "server.inheritancebd.com",
      "192.168.0.200",
      "localhost",
      "192.168.0.161",
      "192.46.214.228"
    ],
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
