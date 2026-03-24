CREATE TABLE IF NOT EXISTS cad_projects (
  name TEXT PRIMARY KEY,
  payload TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS cad_projects_updated_at_idx
ON cad_projects(updated_at DESC);
