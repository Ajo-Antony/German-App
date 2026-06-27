-- Run this in your Supabase SQL Editor
-- Go to: https://supabase.com/dashboard → your project → SQL Editor

-- 1. PDF Documents table
CREATE TABLE IF NOT EXISTS pdf_documents (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  word_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PDF Words table (linked to documents)
CREATE TABLE IF NOT EXISTS pdf_words (
  id SERIAL PRIMARY KEY,
  doc_id TEXT REFERENCES pdf_documents(id) ON DELETE CASCADE,
  german TEXT NOT NULL,
  english TEXT,
  example TEXT,
  example_translation TEXT,
  type TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Milestones table
CREATE TABLE IF NOT EXISTS milestones (
  id TEXT PRIMARY KEY,
  phrase_id TEXT,
  german TEXT NOT NULL,
  score TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Enable Row Level Security (allow all for now - public app)
ALTER TABLE pdf_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE pdf_words ENABLE ROW LEVEL SECURITY;
ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;

-- 5. Allow public read/write (since we use service role key on server)
CREATE POLICY "Allow all" ON pdf_documents FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON pdf_words FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON milestones FOR ALL USING (true) WITH CHECK (true);
