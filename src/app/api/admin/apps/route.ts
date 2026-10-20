import { NextRequest, NextResponse } from "next/server";

// Server-side admin insert — uses the SECRET key (env var, never exposed to browser).
// The secret key bypasses RLS, so this route is protected by ADMIN_PASSWORD.

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://jyxbxpanruyfrmipszai.supabase.co";
const SECRET_KEY = process.env.SUPABASE_SECRET_KEY || "";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";

export async function POST(req: NextRequest) {
  if (!SECRET_KEY) {
    return NextResponse.json(
      { error: "Server not configured: SUPABASE_SECRET_KEY env var is missing on Vercel." },
      { status: 500 }
    );
  }

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });

  // Password gate
  if (!ADMIN_PASSWORD || body.admin_password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Wrong admin password" }, { status: 401 });
  }

  const row = {
    slug: body.slug,
    name: body.name,
    developer: body.developer || "Independent Developer",
    description: body.description,
    icon_url: body.icon_url || null,
    apk_url: body.apk_url || "https://placeholder.apklane.com/pending.apk",
    apk_size: body.apk_size_bytes || null,
    apk_version: body.version || "1.0.0",
    category: body.category,
    tags: body.tags || [],
    why_not_on_playstore: body.why_not_on_store || null,
    virustotal_scan_url: body.virustotal_url || null,
    is_safe: !!body.virustotal_url,
    permission_granted: !!body.permission_granted,
    featured: !!body.featured,
    active: true,
  };

  if (!row.slug || !row.name || !row.description || !row.category) {
    return NextResponse.json({ error: "Missing required fields (name, description, category)" }, { status: 400 });
  }

  const res = await fetch(`${SUPABASE_URL}/rest/v1/apps`, {
    method: "POST",
    headers: {
      apikey: SECRET_KEY,
      Authorization: `Bearer ${SECRET_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(row),
  });

  if (!res.ok) {
    const text = await res.text();
    return NextResponse.json({ error: `Supabase insert failed: ${text}` }, { status: 502 });
  }

  const inserted = await res.json();
  return NextResponse.json({ ok: true, app: inserted[0] });
}
