-- APKLane Supabase Schema
-- Run in Supabase SQL Editor

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Apps table
CREATE TABLE IF NOT EXISTS apps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  developer TEXT NOT NULL,
  developer_url TEXT,
  developer_email TEXT,
  description TEXT NOT NULL,
  short_description TEXT,
  icon_url TEXT,
  screenshots JSONB DEFAULT '[]',
  apk_url TEXT NOT NULL,
  apk_size BIGINT,
  apk_version TEXT,
  category TEXT,
  tags TEXT[] DEFAULT '{}',
  why_not_on_playstore TEXT,
  virustotal_scan_url TEXT,
  is_safe BOOLEAN DEFAULT false,
  download_count INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  permission_granted BOOLEAN DEFAULT false,
  permission_date TIMESTAMPTZ,
  featured BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Downloads log (for analytics)
CREATE TABLE IF NOT EXISTS downloads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  app_id UUID REFERENCES apps(id) ON DELETE CASCADE,
  downloaded_at TIMESTAMPTZ DEFAULT NOW(),
  user_agent TEXT,
  ip_hash TEXT
);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE apps ENABLE ROW LEVEL SECURITY;
ALTER TABLE downloads ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public read categories" ON categories FOR SELECT TO anon USING (true);
CREATE POLICY "Public read apps" ON apps FOR SELECT TO anon USING (active = true);
CREATE POLICY "Public insert downloads" ON downloads FOR INSERT TO anon WITH CHECK (true);

-- Insert default categories
INSERT INTO categories (slug, name, description) VALUES
  ('movies-tv', 'Movies & TV', 'Official streaming apps, broadcaster apps, and entertainment'),
  ('sports', 'Sports', 'Live scores, official sports apps, and sports updates'),
  ('tools', 'Tools', 'Utility apps, file managers, and productivity tools'),
  ('games', 'Games', 'Games not available on the Play Store'),
  ('productivity', 'Productivity', 'Task managers, notes, and work apps'),
  ('social', 'Social', 'Messaging and social networking apps'),
  ('media', 'Media', 'Video, music, and photo apps'),
  ('customization', 'Customization', 'Launchers, icon packs, and themes'),
  ('privacy', 'Privacy & Security', 'VPN, encrypted messaging, and security tools'),
  ('other', 'Other', 'Everything else')
ON CONFLICT (slug) DO NOTHING;
