DROP TABLE IF EXISTS orders CASCADE;

CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  created_at TIMESTAMP NOT NULL,
  finished_at TIMESTAMP NOT NULL,
  instructions TEXT,
  dish_id INT NOT NULL,
  customer_id INT NOT NULL
);
