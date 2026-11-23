import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/api/posts": ["./prisma/dev.db"],
    "/api/posts/[id]": ["./prisma/dev.db"],
  },
};

export default nextConfig;