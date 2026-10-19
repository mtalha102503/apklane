import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service | APKLane",
  alternates: { canonical: `${SITE_URL}/terms` },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <nav className="border-b border-slate-700 px-6 py-4">
        <div className="mx-auto max-w-6xl">
          <Link href="/" className="text-2xl font-bold">🛣️ <span className="text-green-400">APK</span>Lane</Link>
        </div>
      </nav>
      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <div className="space-y-6 text-slate-300">
          <p>Last updated: October 2026</p>
          <p>By using APKLane, you agree to these terms.</p>
          <h2 className="text-xl font-semibold text-white">APK Downloads</h2>
          <p>All APKs are hosted with developer permission. We scan every file with VirusTotal, but install at your own risk. Always verify the source.</p>
          <h2 className="text-xl font-semibold text-white">For Developers</h2>
          <p>By submitting your app, you grant APKLane a non-exclusive license to distribute it. You retain all ownership rights and may request removal at any time.</p>
          <h2 className="text-xl font-semibold text-white">Prohibited</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Uploading apps you don&apos;t own</li>
            <li>Distributing malware or harmful software</li>
            <li>Scraping or automated downloading</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
