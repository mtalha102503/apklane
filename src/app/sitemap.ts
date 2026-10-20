import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

const STATIC_PAGES = [
  "",
  "/categories",
  "/submit",
  "/about",
  "/privacy",
  "/terms",
  "/dmca",
];

const CATEGORIES = [
  "movies-tv", "sports",
  "tools", "games", "productivity", "social",
  "media", "customization", "privacy", "other",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const urls: MetadataRoute.Sitemap = [];

  for (const page of STATIC_PAGES) {
    urls.push({
      url: `${SITE_URL}${page}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: page === "" ? 1 : 0.7,
    });
  }

  for (const cat of CATEGORIES) {
    urls.push({
      url: `${SITE_URL}/categories/${cat}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  // App pages will be added dynamically once Supabase is connected
  return urls;
}
