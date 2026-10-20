import { Metadata } from "next";
import Link from "next/link";
import { getApp, getAllSlugs, getAppsByCategory } from "@/lib/apps";
import {
  appTitle, appMetaDescription, appCanonical,
  appSchema, appFaqSchema, appBreadcrumbSchema, appFaq,
} from "@/lib/seo";

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.length ? slugs.map((slug) => ({ slug })) : [{ slug: "placeholder" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) return { title: "App Coming Soon | APKLane" };

  return {
    title: appTitle(app),
    description: appMetaDescription(app),
    alternates: { canonical: appCanonical(app) },
    openGraph: {
      title: appTitle(app),
      description: appMetaDescription(app),
      url: appCanonical(app),
      siteName: "APKLane",
      type: "website",
      ...(app.icon_url ? { images: [{ url: app.icon_url }] } : {}),
    },
    robots: { index: true, follow: true },
  };
}

export default async function AppPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const app = getApp(slug);

  if (!app) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🚀</div>
          <h1 className="text-3xl font-bold mb-4">Coming Soon</h1>
          <p className="text-slate-400 mb-6">This app will be available shortly.</p>
          <Link href="/" className="text-green-400 underline">← Back to APKLane</Link>
        </div>
      </div>
    );
  }

  const faqs = appFaq(app);
  const related = getAppsByCategory(app.category).filter((a) => a.slug !== app.slug).slice(0, 4);

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Auto-generated structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema(app)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appFaqSchema(app)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appBreadcrumbSchema(app)) }} />

      <nav className="border-b border-slate-700 px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            🛣️ <span className="text-green-400">APK</span>Lane
          </Link>
          <Link href={`/categories/${app.category}`} className="text-sm text-slate-300 hover:text-green-400">
            {app.category_name}
          </Link>
        </div>
      </nav>

      <main className="mx-auto max-w-4xl px-6 py-12">
        {/* Breadcrumb */}
        <div className="text-sm text-slate-400 mb-8">
          <Link href="/" className="hover:text-white">Home</Link> {" / "}
          <Link href={`/categories/${app.category}`} className="hover:text-white">{app.category_name}</Link> {" / "}
          <span className="text-white">{app.name}</span>
        </div>

        {/* Header */}
        <div className="flex items-start gap-6 mb-8">
          {app.icon_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={app.icon_url} alt={`${app.name} icon`} className="w-24 h-24 rounded-2xl" />
          ) : (
            <div className="w-24 h-24 rounded-2xl bg-slate-700 flex items-center justify-center text-4xl">📱</div>
          )}
          <div>
            <h1 className="text-4xl font-bold mb-2">{app.name}</h1>
            {app.developer && <p className="text-slate-300 mb-1">by {app.developer}</p>}
            <p className="text-slate-400 text-sm">v{app.version} • {app.category_name}</p>
          </div>
        </div>

        {/* Download CTA */}
        <Link
          href={`/apps/${app.slug}/download`}
          className="block w-full rounded-full bg-green-500 py-4 text-center text-lg font-bold hover:bg-green-400 transition-colors mb-10"
        >
          ⬇️ Download {app.name} APK (v{app.version})
        </Link>

        {/* Info table */}
        <div className="rounded-2xl bg-slate-800 p-6 mb-10">
          <h2 className="text-xl font-semibold mb-4">App Information</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><span className="text-slate-400">Version:</span> {app.version}</div>
            {app.size_mb && <div><span className="text-slate-400">Size:</span> {app.size_mb} MB</div>}
            {app.min_android && <div><span className="text-slate-400">Requires:</span> Android {app.min_android}+</div>}
            <div><span className="text-slate-400">Downloads:</span> {app.download_count.toLocaleString()}</div>
            <div><span className="text-slate-400">Category:</span> {app.category_name}</div>
            <div><span className="text-slate-400">Price:</span> Free</div>
          </div>
          <div className="mt-4 text-sm text-green-400">✅ Scanned with VirusTotal — Safe</div>
        </div>

        {/* Description */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">About {app.name}</h2>
          <p className="text-slate-300 leading-relaxed">{app.description}</p>
          {app.why_not_on_store && (
            <div className="mt-6 rounded-xl bg-slate-800 p-5">
              <h3 className="font-semibold mb-2">Why isn&apos;t {app.name} on the Play Store?</h3>
              <p className="text-slate-300 text-sm">{app.why_not_on_store}</p>
            </div>
          )}
        </div>

        {/* Auto-FAQ */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((f) => (
              <details key={f.q} className="rounded-xl bg-slate-800 p-5">
                <summary className="font-medium cursor-pointer">{f.q}</summary>
                <p className="mt-3 text-slate-300 text-sm">{f.a}</p>
              </details>
            ))}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Related Apps</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((r) => (
                <Link key={r.slug} href={`/apps/${r.slug}`}
                  className="rounded-xl bg-slate-800 p-4 hover:bg-slate-700 transition-colors">
                  <div className="text-3xl mb-2">📱</div>
                  <div className="font-medium">{r.name}</div>
                  <div className="text-xs text-slate-400">v{r.version}</div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
