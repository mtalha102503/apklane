import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Submit Your App | APKLane",
  description: "Submit your Android app to APKLane and reach users looking for apps beyond the Play Store.",
  alternates: { canonical: `${SITE_URL}/submit` },
};

export default function SubmitPage() {
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
        <h1 className="text-4xl font-bold mb-6">Submit Your App</h1>
        <p className="text-slate-400 mb-10">
          Built an Android app that&apos;s not on the Play Store? We&apos;d love to feature it!
        </p>

        <div className="rounded-2xl bg-slate-800 p-8 mb-8">
          <h2 className="text-xl font-semibold mb-4">How it works</h2>
          <ol className="list-decimal list-inside space-y-3 text-slate-300">
            <li>Fill out the form below with your app details</li>
            <li>We review your submission (usually within 48 hours)</li>
            <li>We scan your APK with VirusTotal for safety</li>
            <li>Your app goes live with full credit to you!</li>
          </ol>
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">App Name *</label>
            <input type="text" required className="w-full rounded-lg bg-slate-800 px-4 py-3 outline-none focus:ring-2 focus:ring-green-400" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Developer Name *</label>
            <input type="text" required className="w-full rounded-lg bg-slate-800 px-4 py-3 outline-none focus:ring-2 focus:ring-green-400" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Developer Email *</label>
            <input type="email" required className="w-full rounded-lg bg-slate-800 px-4 py-3 outline-none focus:ring-2 focus:ring-green-400" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Official Website / GitHub</label>
            <input type="url" className="w-full rounded-lg bg-slate-800 px-4 py-3 outline-none focus:ring-2 focus:ring-green-400" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">APK Download URL *</label>
            <input type="url" required className="w-full rounded-lg bg-slate-800 px-4 py-3 outline-none focus:ring-2 focus:ring-green-400" placeholder="https://..." />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Description *</label>
            <textarea required rows={5} className="w-full rounded-lg bg-slate-800 px-4 py-3 outline-none focus:ring-2 focus:ring-green-400" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Why isn&apos;t it on the Play Store?</label>
            <textarea rows={3} className="w-full rounded-lg bg-slate-800 px-4 py-3 outline-none focus:ring-2 focus:ring-green-400" placeholder="e.g., Beta release, regional app, policy restrictions..." />
          </div>
          <button type="submit" className="w-full rounded-full bg-green-500 py-4 font-semibold text-slate-900 hover:bg-green-400 transition-colors">
            Submit App
          </button>
          <p className="text-xs text-slate-500 text-center">
            By submitting, you confirm you own the rights to this app and grant APKLane permission to distribute it.
          </p>
        </form>
      </main>
    </div>
  );
}
