import { Suspense } from "react";
import { getApp, getAllSlugs } from "@/lib/apps";
import DownloadClient from "./DownloadClient";

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.length ? slugs.map((slug) => ({ slug })) : [{ slug: "placeholder" }];
}

export default async function DownloadPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const app = await getApp(slug);

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    }>
      <DownloadClient
        slug={slug}
        appName={app?.name || "App"}
        apkUrl={app?.apk_url || ""}
        version={app?.version || ""}
      />
    </Suspense>
  );
}
