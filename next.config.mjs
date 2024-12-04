/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/day-one",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
