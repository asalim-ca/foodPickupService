/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM orders;`)
      .then(data => {
        res.json(data.rows);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  router.get("/:order_id", (req, res) => {
    db.query(`
    SELECT *
    FROM orders
    WHERE orders.id = $1;
    `, [req.params.order_id])
      .then(data => {
        res.json(data.rows);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/customer/:customer_id", (req, res) => {
    db.query(`
    SELECT orders.*
    FROM orders
    JOIN customers ON customers.id = customer_id
    WHERE customer_id = $1;
    `, [req.params.customer_id])
      .then(data => {
        res.json(data.rows);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  

  router.get("/:order_id/dish_orders", (req, res) => {
    db.query(`
    SELECT *
    FROM dish_orders
    WHERE order_id = $1;
    `, [req.params.order_id])
      .then(data => {
        res.json(data.rows);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  router.post("/:customer_id", (req, res) => {
    db.query(`
    INSERT INTO orders (customer_id) VALUES ($1) RETURNING *;
    `, [req.params.customer_id])
      .then(data => {
        res.json(data.rows);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/:order_id/dish_order/:dish_id", (req, res) => {
    db.query(`
    INSERT INTO dish_orders (order_id, dish_id) VALUES ($1, $2) RETURNING *;
    `, [req.params.order_id, req.params.dish_id])
      .then(data => {
        res.json(data.rows);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  router.post("/complete/:id", (req, res) => {
    db.query(`
    UPDATE orders
    SET completed_at = NOW()
    WHERE orders.id = $1;
    `, [req.params.id])
      .then(data => {
        res.json(data.rows);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  router.post("/confirm_order/:id", (req, res) => {
    db.query(`
    UPDATE orders
    SET ordered_at = NOW()
    WHERE orders.id = $1;
    `, [req.params.id])
      .then(data => {
        res.json(data.rows);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
