import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About APKLane | Apps Beyond the Play Store",
  description: "APKLane is a curated directory for independent Android apps not available on the Google Play Store.",
  alternates: { canonical: `${SITE_URL}/about` },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <nav className="border-b border-slate-700 px-6 py-4">
        <div className="mx-auto max-w-6xl">
          <Link href="/" className="text-2xl font-bold">
            🛣️ <span className="text-green-400">APK</span>Lane
          </Link>
        </div>
      </nav>
      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-4xl font-bold mb-8">About APKLane</h1>
        <div className="space-y-6 text-slate-300 leading-relaxed">
          <p>
            <strong className="text-white">APKLane</strong> is a curated directory for
            Android apps you won&apos;t find on the Google Play Store.
          </p>
          <p>
            Thousands of great apps never make it to the Play Store — independent
            developers, beta releases, regional apps, and experimental projects.
            We help you discover them safely.
          </p>
          <h2 className="text-2xl font-semibold text-white pt-4">Our Principles</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><strong className="text-white">Developer permission first</strong> — we only host APKs with the developer&apos;s consent</li>
            <li><strong className="text-white">Safety</strong> — every APK is scanned with VirusTotal before listing</li>
            <li><strong className="text-white">Transparency</strong> — we always credit developers and link to their official sites</li>
            <li><strong className="text-white">No piracy</strong> — we never host cracked, modded, or unauthorized copies</li>
          </ul>
          <h2 className="text-2xl font-semibold text-white pt-4">For Developers</h2>
          <p>
            Built an app that&apos;s not on the Play Store?{" "}
            <Link href="/submit" className="text-green-400 underline">Submit it here</Link>{" "}
            and reach new users.
          </p>
        </div>
      </main>
    </div>
  );
}
