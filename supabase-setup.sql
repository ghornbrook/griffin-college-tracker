-- Visits table (scores, tiers, visit data)
CREATE TABLE visits (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  school_id TEXT NOT NULL,
  visited BOOLEAN DEFAULT FALSE,
  date_visited TEXT,
  tier TEXT,
  scores JSONB DEFAULT '{}',
  score_notes JSONB DEFAULT '{}',
  low_interest_reason TEXT,
  low_interest_comment TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(school_id)
);

-- Essay notes table
CREATE TABLE essay_notes (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  school_id TEXT NOT NULL,
  question_id TEXT NOT NULL,
  note_text TEXT DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(school_id, question_id)
);

-- Custom schools table
CREATE TABLE custom_schools (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT,
  type TEXT,
  setting TEXT,
  rank INTEGER,
  acceptance_rate TEXT,
  sat_range TEXT,
  act_range TEXT,
  undergrad_enrollment INTEGER,
  total_enrollment INTEGER,
  student_faculty_ratio TEXT,
  grad_rate TEXT,
  greek_life TEXT,
  athletics TEXT,
  tuition TEXT,
  known_for TEXT,
  top_programs TEXT,
  is_custom BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable public access (no auth needed for this family app)
ALTER TABLE visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE essay_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_schools ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all access to visits" ON visits FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to essay_notes" ON essay_notes FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to custom_schools" ON custom_schools FOR ALL USING (true) WITH CHECK (true);
