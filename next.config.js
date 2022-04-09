/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  exportTrailingSlash: true,
  exportPathMap: () => ({
    "/": { page: "/" },
  }),
}

module.exports = nextConfig
