// Apps data layer — reads from Supabase (REST API) with local JSON fallback.
// Config via env vars (set on Vercel):
//   NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY
// Public-safe: the anon/publishable key only reads active apps (RLS enforced).

export interface AppData {
  slug: string;
  name: string;
  version: string;
  developer?: string;
  description: string;
  icon_url?: string;
  apk_url?: string;
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

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://jyxbxpanruyfrmipszai.supabase.co";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_m1UA_7zlCp6UKtUCo9g9QQ_4jNYHJNy";

const CATEGORY_NAMES: Record<string, string> = {
  "movies-tv": "Movies & TV",
  sports: "Sports",
  tools: "Tools",
  games: "Games",
  productivity: "Productivity",
  social: "Social",
  media: "Media",
  customization: "Customization",
  privacy: "Privacy & Security",
  other: "Other",
};

interface SbAppRow {
  slug: string;
  name: string;
  developer?: string;
  description: string;
  icon_url?: string;
  apk_url?: string;
  apk_size?: number;
  apk_version?: string;
  category?: string;
  tags?: string[];
  why_not_on_playstore?: string;
  virustotal_scan_url?: string;
  download_count?: number;
  featured?: boolean;
  created_at: string;
}

function mapRow(r: SbAppRow): AppData {
  const cat = r.category || "other";
  return {
    slug: r.slug,
    name: r.name,
    version: r.apk_version || "1.0.0",
    developer: r.developer || undefined,
    description: r.description,
    icon_url: r.icon_url || undefined,
    apk_url: r.apk_url || undefined,
    size_mb: r.apk_size ? Math.round((r.apk_size / (1024 * 1024)) * 10) / 10 : undefined,
    category: cat,
    category_name: CATEGORY_NAMES[cat] || cat,
    tags: r.tags || [],
    why_not_on_store: r.why_not_on_playstore || undefined,
    virustotal_url: r.virustotal_scan_url || undefined,
    download_count: r.download_count || 0,
    featured: !!r.featured,
    created_at: r.created_at,
  };
}

async function fetchFromSupabase(): Promise<AppData[] | null> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/apps?select=*&active=eq.true&order=created_at.desc`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
        // Hard timeout: if Supabase is unreachable, fall back to local data fast
        // (build must never hang on a network stall)
        signal: AbortSignal.timeout(8000),
        next: { revalidate: 300 },
      }
    );
    if (!res.ok) return null;
    const rows = (await res.json()) as SbAppRow[];
    return rows.map(mapRow);
  } catch {
    return null;
  }
}

// Cache per build/request cycle
let cached: AppData[] | null = null;

async function loadApps(): Promise<AppData[]> {
  if (cached) return cached;
  const remote = await fetchFromSupabase();
  cached = remote && remote.length >= 0 ? remote : (appsJson as AppData[]);
  // If Supabase is reachable (even empty), prefer it; fallback only on failure
  if (remote === null) cached = appsJson as AppData[];
  return cached;
}

export async function getAllApps(): Promise<AppData[]> {
  return loadApps();
}

export async function getApp(slug: string): Promise<AppData | null> {
  const apps = await loadApps();
  return apps.find((a) => a.slug === slug) || null;
}

export async function getAppsByCategory(categorySlug: string): Promise<AppData[]> {
  const apps = await loadApps();
  return apps.filter((a) => a.category === categorySlug);
}

export async function getFeaturedApps(): Promise<AppData[]> {
  const apps = await loadApps();
  return apps.filter((a) => a.featured);
}

export async function getAllSlugs(): Promise<string[]> {
  const apps = await loadApps();
  return apps.map((a) => a.slug);
}

export async function searchApps(query: string): Promise<AppData[]> {
  const apps = await loadApps();
  const q = query.toLowerCase();
  return apps.filter(
    (a) =>
      a.name.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q) ||
      a.tags.some((t) => t.toLowerCase().includes(q))
  );
}
