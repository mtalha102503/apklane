import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy | APKLane",
  alternates: { canonical: `${SITE_URL}/privacy` },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <nav className="border-b border-slate-700 px-6 py-4">
        <div className="mx-auto max-w-6xl">
          <Link href="/" className="text-2xl font-bold">🛣️ <span className="text-green-400">APK</span>Lane</Link>
        </div>
      </nav>
      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="space-y-6 text-slate-300">
          <p>Last updated: October 2026</p>
          <p>APKLane respects your privacy. We collect minimal data necessary to operate the service.</p>
          <h2 className="text-xl font-semibold text-white">Data We Collect</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Download counts (anonymized)</li>
            <li>Basic analytics (page views)</li>
            <li>Contact info you provide via forms</li>
          </ul>
          <h2 className="text-xl font-semibold text-white">Data We Don&apos;t Collect</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>We don&apos;t track you across websites</li>
            <li>We don&apos;t sell your data</li>
            <li>We don&apos;t require accounts to download</li>
          </ul>
          <p>Contact: contact@apklane.com</p>
        </div>
      </main>
    </div>
  );
}
