import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_URL } from "@/lib/constants";

export async function generateStaticParams() {
  // Placeholder — real slugs will come from Supabase once connected
  return [{ slug: "placeholder" }];
}

// Placeholder — will fetch from Supabase once connected
async function getApp(slug: string): Promise<{ name: string; short_description: string } | null> {
  // TODO: Replace with Supabase fetch
  return null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const app = await getApp(slug);
  const url = `${SITE_URL}/apps/${slug}`;

  if (!app) {
    return { title: "App Not Found | APKLane" };
  }

  return {
    title: `${app.name} APK Download | APKLane`,
    description: app.short_description,
    alternates: { canonical: url },
    openGraph: { title: app.name, description: app.short_description, url },
  };
}

export default async function AppPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const app = await getApp(slug);

  if (!app) {
    // Placeholder UI until Supabase is connected
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">🚀 Coming Soon</h1>
          <p className="text-slate-400 mb-6">
            App pages are being built. Check back soon!
          </p>
          <Link href="/" className="text-green-400 underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return <div>{/* App detail UI — to be built with real data */}</div>;
}
