import type { MetadataRoute } from "next";

// Pre-launch: keep every crawler out. Swap for a real robots file at launch.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", disallow: "/" },
  };
}
