import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "DMCA Policy | APKLane",
  alternates: { canonical: `${SITE_URL}/dmca` },
};

export default function DMCAPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <nav className="border-b border-slate-700 px-6 py-4">
        <div className="mx-auto max-w-6xl">
          <Link href="/" className="text-2xl font-bold">🛣️ <span className="text-green-400">APK</span>Lane</Link>
        </div>
      </nav>
      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-4xl font-bold mb-8">DMCA Policy</h1>
        <div className="space-y-6 text-slate-300">
          <p>APKLane respects intellectual property rights. We only host APKs with developer permission.</p>
          <h2 className="text-xl font-semibold text-white">Takedown Requests</h2>
          <p>If you believe your copyrighted work has been listed without permission, contact us at:</p>
          <p className="text-white">contact@apklane.com</p>
          <p>Include:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Your name and contact information</li>
            <li>Description of the copyrighted work</li>
            <li>URL of the infringing page on APKLane</li>
            <li>A statement of good faith belief</li>
          </ul>
          <p>We respond to valid takedown requests within 48 hours.</p>
        </div>
      </main>
    </div>
  );
}
