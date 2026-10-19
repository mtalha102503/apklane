import { Suspense } from "react";
import DownloadClient from "./DownloadClient";

export async function generateStaticParams() {
  return [{ slug: "placeholder" }];
}

export default function DownloadPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    }>
      <DownloadClient />
    </Suspense>
  );
}
