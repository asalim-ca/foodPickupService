-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS customers CASCADE;
CREATE TABLE customers (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(20) NOT NULL,
  description TEXT,
  photo_url VARCHAR(255),
  prep_duration INT,
  price INT,
);
