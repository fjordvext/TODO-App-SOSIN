CREATE TABLE IF NOT EXISTS todo (
  id SERIAL PRIMARY KEY,
  task VARCHAR,
  status VARCHAR,
  category VARCHAR,
  importance INTEGER,
  comp BOOLEAN
  );
