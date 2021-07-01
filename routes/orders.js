/*
 * All routes for dishes are defined here
 * Since this file is loaded in server.js into api/dishes,
 *   these routes are mounted onto /dishes
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const ordersQueries = require('../db/queries/orders-queries');

//GET
router.get("/", (req, res) => {
  ordersQueries.getAllOrdersForCustomer(req.session.userId)
    .then((orders) => {
      res.json(orders);
    });
});

router.get("/:id", (req, res) => {
  ordersQueries.getSpecificOrder(req.session.userId, req.params.id)
    .then((order) => {
      res.json(order);
    });
});

router.get("/unfulfilled", (req, res) => {
ordersQueries.getAllUnfulfilledOrdersForCustomer(req.session.userId)
  .then((response) => {
    console.log(response);
    res.json(response);
  });
});

module.exports = router;
