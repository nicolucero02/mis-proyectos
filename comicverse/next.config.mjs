/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Ensure locally stored MDX files are included in server traces for production deploys.
    outputFileTracingIncludes: {
      "/*": ["./content/posts/**/*"]
    }
  }
};

export default nextConfig;
