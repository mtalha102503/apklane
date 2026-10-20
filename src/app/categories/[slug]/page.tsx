import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/constants";
import { getAppsByCategory } from "@/lib/apps";

const CATEGORIES: Record<string, { name: string; description: string }> = {
  "movies-tv": { name: "Movies & TV", description: "Official streaming apps, broadcaster apps, and entertainment apps not on the Play Store." },
  sports: { name: "Sports", description: "Live scores, official sports apps, and sports updates." },
  tools: { name: "Tools", description: "Utility apps, file managers, and productivity tools not on the Play Store." },
  games: { name: "Games", description: "Independent games you won't find on Google Play." },
  productivity: { name: "Productivity", description: "Task managers, notes, and work apps." },
  social: { name: "Social", description: "Messaging and social networking apps." },
  media: { name: "Media", description: "Video, music, and photo apps." },
  customization: { name: "Customization", description: "Launchers, icon packs, and themes." },
  privacy: { name: "Privacy & Security", description: "VPN, encrypted messaging, and security tools." },
  other: { name: "Other", description: "Everything else." },
};

export async function generateStaticParams() {
  return Object.keys(CATEGORIES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cat = CATEGORIES[slug];
  if (!cat) return { title: "Category Not Found | APKLane" };

  return {
    title: `Best ${cat.name} Apps Not on Play Store | APKLane`,
    description: cat.description,
    alternates: { canonical: `${SITE_URL}/categories/${slug}` },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cat = CATEGORIES[slug];

  if (!cat) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
          <Link href="/" className="text-green-400 underline">← Back to Home</Link>
        </div>
      </div>
    );
  }

  const apps = getAppsByCategory(slug);

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <nav className="border-b border-slate-700 px-6 py-4">
        <div className="mx-auto max-w-6xl">
          <Link href="/" className="text-2xl font-bold">
            🛣️ <span className="text-green-400">APK</span>Lane
          </Link>
        </div>
      </nav>
      <main className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-4xl font-bold mb-4">Best {cat.name} Apps Not on Play Store</h1>
        <p className="text-slate-400 mb-10">{cat.description}</p>
        {apps.length === 0 ? (
          <div className="rounded-2xl bg-slate-800 p-10 text-center">
            <p className="text-slate-400">
              Apps in this category are being curated. Check back soon!
            </p>
            <Link href="/" className="text-green-400 underline mt-4 inline-block">
              ← Back to Home
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {apps.map((app) => (
              <Link key={app.slug} href={`/apps/${app.slug}`}
                className="rounded-xl bg-slate-800 p-5 hover:bg-slate-700 transition-colors">
                <div className="text-4xl mb-3">📱</div>
                <div className="font-semibold">{app.name}</div>
                <div className="text-xs text-slate-400 mt-1">v{app.version} • {app.size_mb ? `${app.size_mb} MB` : "Free"}</div>
                <div className="text-xs text-slate-400">{app.download_count.toLocaleString()} downloads</div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
