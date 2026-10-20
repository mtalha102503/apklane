"use client";

import { useState } from "react";
import { appTitle, appMetaDescription, appFaq } from "@/lib/seo";
import { AppData } from "@/lib/apps";

const CATEGORIES = [
  { slug: "movies-tv", name: "Movies & TV" },
  { slug: "sports", name: "Sports" },
  { slug: "tools", name: "Tools" },
  { slug: "games", name: "Games" },
  { slug: "productivity", name: "Productivity" },
  { slug: "social", name: "Social" },
  { slug: "media", name: "Media" },
  { slug: "customization", name: "Customization" },
  { slug: "privacy", name: "Privacy" },
  { slug: "other", name: "Other" },
];

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function AdminUpload() {
  const [form, setForm] = useState({
    name: "",
    version: "",
    developer: "",
    description: "",
    category: "tools",
    min_android: "",
    why_not_on_store: "",
    tags: "",
    featured: false,
  });
  const [sizeMb, setSizeMb] = useState<number | undefined>();
  const [fileName, setFileName] = useState("");
  const [generated, setGenerated] = useState<string>("");

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setSizeMb(Math.round((file.size / (1024 * 1024)) * 10) / 10);
    // Guess app name from file name
    if (!form.name) {
      const guess = file.name
        .replace(/\.apk$/i, "")
        .replace(/[-_]+/g, " ")
        .replace(/\s*v?\d+(\.\d+)*\s*/gi, " ")
        .trim();
      setForm({ ...form, name: guess });
    }
  }

  function buildEntry(): AppData {
    const cat = CATEGORIES.find((c) => c.slug === form.category)!;
    return {
      slug: slugify(form.name),
      name: form.name,
      version: form.version || "1.0.0",
      developer: form.developer || undefined,
      description: form.description,
      size_mb: sizeMb,
      min_android: form.min_android || undefined,
      category: form.category,
      category_name: cat.name,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      why_not_on_store: form.why_not_on_store || undefined,
      download_count: 0,
      featured: form.featured,
      created_at: new Date().toISOString(),
    };
  }

  function handleGenerate() {
    const entry = buildEntry();
    setGenerated(JSON.stringify(entry, null, 2));
  }

  const preview = form.name ? buildEntry() : null;
  const inputCls = "w-full rounded-lg bg-slate-700 px-4 py-3 outline-none focus:ring-2 focus:ring-green-400 text-white";
  const labelCls = "block text-sm text-slate-300 mb-1";

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">🛠️ Add New App</h1>
        <p className="text-slate-400 mb-10">
          APK upload karo, basic info bharo — SEO page khud ban jayega.
        </p>

        {/* APK upload */}
        <div className="rounded-2xl bg-slate-800 p-6 mb-8">
          <label className={labelCls}>APK File</label>
          <input type="file" accept=".apk" onChange={handleFile}
            className="w-full text-slate-300 file:mr-4 file:rounded-full file:border-0 file:bg-green-500 file:px-4 file:py-2 file:text-white file:cursor-pointer" />
          {fileName && (
            <p className="mt-3 text-sm text-green-400">
              ✅ {fileName} — Size: {sizeMb} MB (auto-detected)
            </p>
          )}
        </div>

        {/* Form */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div>
            <label className={labelCls}>App Name *</label>
            <input className={inputCls} value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Cinema Plus" />
          </div>
          <div>
            <label className={labelCls}>Version *</label>
            <input className={inputCls} value={form.version}
              onChange={(e) => setForm({ ...form, version: e.target.value })} placeholder="e.g. 2.4.1" />
          </div>
          <div>
            <label className={labelCls}>Developer</label>
            <input className={inputCls} value={form.developer}
              onChange={(e) => setForm({ ...form, developer: e.target.value })} placeholder="Developer name" />
          </div>
          <div>
            <label className={labelCls}>Category *</label>
            <select className={inputCls} value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}>
              {CATEGORIES.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>Min Android Version</label>
            <input className={inputCls} value={form.min_android}
              onChange={(e) => setForm({ ...form, min_android: e.target.value })} placeholder="e.g. 7.0" />
          </div>
          <div>
            <label className={labelCls}>Tags (comma separated)</label>
            <input className={inputCls} value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="streaming, free, no ads" />
          </div>
          <div className="md:col-span-2">
            <label className={labelCls}>Description (2-3 lines) *</label>
            <textarea className={inputCls} rows={3} value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="App kya karta hai, kis ke liye hai..." />
          </div>
          <div className="md:col-span-2">
            <label className={labelCls}>Why not on Play Store? (SEO ke liye zabardast)</label>
            <input className={inputCls} value={form.why_not_on_store}
              onChange={(e) => setForm({ ...form, why_not_on_store: e.target.value })}
              placeholder="e.g. Developer ne direct distribution choose ki hai" />
          </div>
          <label className="flex items-center gap-2 text-slate-300">
            <input type="checkbox" checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
            Homepage par Featured karo
          </label>
        </div>

        {/* Live SEO preview */}
        {preview && (
          <div className="rounded-2xl bg-slate-800 p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">🔍 Auto-SEO Preview (ye khud banega)</h2>
            <div className="space-y-3 text-sm">
              <div><span className="text-slate-400">Title: </span><span className="text-green-400">{appTitle(preview)}</span></div>
              <div><span className="text-slate-400">Meta: </span>{appMetaDescription(preview)}</div>
              <div><span className="text-slate-400">URL: </span>apklane.com/apps/{preview.slug}</div>
              <div>
                <span className="text-slate-400">Auto-FAQ ({appFaq(preview).length} sawal): </span>
                {appFaq(preview).map((f) => f.q).join(" • ")}
              </div>
              <div className="text-slate-400">✅ SoftwareApplication schema + FAQ schema + Breadcrumb — sab auto</div>
            </div>
          </div>
        )}

        <button onClick={handleGenerate}
          className="rounded-full bg-green-500 px-8 py-3 font-semibold hover:bg-green-400 transition-colors">
          App Entry Generate Karo
        </button>

        {generated && (
          <div className="mt-8">
            <p className="text-slate-300 mb-2 text-sm">
              Ye entry copy karke <code className="text-green-400">src/data/apps.json</code> me paste karo
              (Supabase setup ke baad ye step bhi automatic ho jayega):
            </p>
            <pre className="rounded-xl bg-slate-950 p-4 text-xs overflow-x-auto text-green-300">{generated}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
