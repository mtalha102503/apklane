// Apps data layer — reads from local JSON store now, Supabase-ready later.
// When the user creates the Supabase project, swap getAllApps/getApp
// to query Supabase; the rest of the code stays unchanged.

export interface AppData {
  slug: string;
  name: string;
  version: string;
  developer?: string;
  description: string;
  icon_url?: string;
  apk_size_mb?: number;
  size_mb?: number;
  min_android?: string;
  category: string;       // slug
  category_name: string;
  tags: string[];
  why_not_on_store?: string;
  virustotal_url?: string;
  download_count: number;
  featured: boolean;
  created_at: string;
}

import appsJson from "@/data/apps.json";

const apps = appsJson as AppData[];

export function getAllApps(): AppData[] {
  return apps;
}

export function getApp(slug: string): AppData | null {
  return apps.find((a) => a.slug === slug) || null;
}

export function getAppsByCategory(categorySlug: string): AppData[] {
  return apps.filter((a) => a.category === categorySlug);
}

export function getFeaturedApps(): AppData[] {
  return apps.filter((a) => a.featured);
}

export function getAllSlugs(): string[] {
  return apps.map((a) => a.slug);
}

export function searchApps(query: string): AppData[] {
  const q = query.toLowerCase();
  return apps.filter(
    (a) =>
      a.name.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q) ||
      a.tags.some((t) => t.toLowerCase().includes(q))
  );
}
