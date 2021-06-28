DROP TABLE IF EXISTS dishes CASCADE;

CREATE TABLE dishes (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(20) NOT NULL,
  description TEXT,
  photo_url VARCHAR(255),
  prep_duration INT,
  price INT
);
