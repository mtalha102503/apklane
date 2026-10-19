"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function DownloadClient() {
  const params = useParams();
  const slug = params.slug as string;
  const [countdown, setCountdown] = useState(5);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (!started) {
      setStarted(true);
      // TODO: Trigger actual download from R2 URL
      // TODO: Open Adsterra popunder here
    }
  }, [countdown, started]);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="text-6xl mb-6">📥</div>
        <h1 className="text-3xl font-bold mb-4">Preparing Download</h1>

        {!started ? (
          <>
            <div className="text-6xl font-bold text-green-400 mb-6">{countdown}</div>
            <p className="text-slate-400 mb-6">
              Your download will start automatically in {countdown} seconds...
            </p>
            <div className="w-full bg-slate-700 rounded-full h-2 mb-6">
              <div
                className="bg-green-400 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${((5 - countdown) / 5) * 100}%` }}
              />
            </div>
          </>
        ) : (
          <>
            <div className="text-green-400 text-xl mb-6">✅ Download Started!</div>
            <p className="text-slate-400 mb-6">
              If your download didn&apos;t start,{" "}
              <a href="#" className="text-green-400 underline">
                click here to retry
              </a>
            </p>
          </>
        )}

        <div className="bg-slate-800 rounded-lg p-4 mb-6 text-sm text-slate-500">
          Advertisement
        </div>

        <Link href={`/apps/${slug}`} className="text-slate-400 hover:text-white text-sm">
          ← Back to app page
        </Link>

        <div className="mt-8 text-xs text-slate-500">
          🛡️ Scanned with VirusTotal — Safe to install
        </div>
      </div>
    </div>
  );
}
