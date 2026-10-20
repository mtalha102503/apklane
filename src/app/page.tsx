import Link from "next/link";
import { getFeaturedApps, getAllApps } from "@/lib/apps";

const HIGHLIGHTED = [
  {
    name: "Movies & TV",
    slug: "movies-tv",
    emoji: "🎬",
    desc: "Streaming apps, official broadcasters & entertainment",
    gradient: "from-red-600 to-orange-500",
  },
  {
    name: "Sports",
    slug: "sports",
    emoji: "⚽",
    desc: "Live scores, official sports apps & updates",
    gradient: "from-green-600 to-emerald-500",
  },
];

const CATEGORIES = [
  "Tools", "Games", "Productivity", "Social",
  "Media", "Customization", "Privacy", "Other",
];

export default function Home() {
  const featured = getFeaturedApps().slice(0, 8);
  const latest = getAllApps().slice(0, 8);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {/* Navbar */}
      <nav className="border-b border-slate-700 px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            🛣️ <span className="text-green-400">APK</span>Lane
          </Link>
          <div className="flex gap-6 text-sm">
            <Link href="/categories/movies-tv" className="hover:text-red-400 font-medium">🎬 Movies</Link>
            <Link href="/categories/sports" className="hover:text-green-400 font-medium">⚽ Sports</Link>
            <Link href="/categories" className="hover:text-green-400">Categories</Link>
            <Link href="/submit" className="hover:text-green-400">Submit App</Link>
            <Link href="/about" className="hover:text-green-400">About</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <main className="mx-auto max-w-6xl px-6 py-16 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Apps You Won&apos;t Find on the <span className="text-green-400">Play Store</span>
        </h1>
        <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
          Discover independent Android apps, beta releases, and hidden gems —
          direct from developers, scanned for safety.
        </p>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-16">
          <input
            type="text"
            placeholder="Search apps..."
            className="w-full rounded-full bg-slate-700 px-6 py-4 text-lg outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* HIGHLIGHTED: Movies & Sports */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-2 text-left">🔥 Most Wanted</h2>
          <p className="text-slate-400 text-left mb-8">The categories everyone is looking for</p>
          <div className="grid md:grid-cols-2 gap-6">
            {HIGHLIGHTED.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className={`rounded-2xl bg-gradient-to-r ${cat.gradient} p-8 text-left hover:scale-[1.02] transition-transform shadow-lg`}
              >
                <div className="text-5xl mb-4">{cat.emoji}</div>
                <div className="text-3xl font-bold mb-2">{cat.name}</div>
                <div className="text-white/80">{cat.desc}</div>
                <div className="mt-4 inline-block bg-white/20 rounded-full px-4 py-1 text-sm font-medium">
                  Browse Apps →
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* All Categories */}
        <h2 className="text-2xl font-semibold mb-8 text-left">Browse All Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={`/categories/${cat.toLowerCase()}`}
              className="rounded-xl bg-slate-700 p-6 hover:bg-slate-600 transition-colors"
            >
              <div className="text-lg font-medium">{cat}</div>
            </Link>
          ))}
        </div>

        {/* Featured / Latest Apps — auto-listed */}
        {(featured.length > 0 || latest.length > 0) && (
          <div className="mb-16 text-left">
            <h2 className="text-2xl font-semibold mb-8">
              {featured.length > 0 ? "⭐ Featured Apps" : "🆕 Latest Apps"}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(featured.length > 0 ? featured : latest).map((app) => (
                <Link key={app.slug} href={`/apps/${app.slug}`}
                  className="rounded-xl bg-slate-700 p-5 hover:bg-slate-600 transition-colors">
                  <div className="text-4xl mb-3">📱</div>
                  <div className="font-semibold">{app.name}</div>
                  <div className="text-xs text-slate-400 mt-1">v{app.version} • {app.category_name}</div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Coming soon */}
        <div className="rounded-2xl bg-slate-700/50 p-10">
          <h2 className="text-2xl font-semibold mb-4">🚀 Coming Soon</h2>
          <p className="text-slate-300">
            We&apos;re curating the best independent Android apps.
            Developers — <Link href="/submit" className="text-green-400 underline">submit your app</Link>!
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700 px-6 py-8 text-center text-sm text-slate-400">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row justify-between gap-4">
          <div>© 2026 APKLane.com — Discover beyond the Play Store</div>
          <div className="flex gap-6 justify-center">
            <Link href="/about" className="hover:text-white">About</Link>
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <Link href="/dmca" className="hover:text-white">DMCA</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
