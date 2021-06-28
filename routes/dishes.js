/*
 * All routes for dishes are defined here
 * Since this file is loaded in server.js into api/dishes,
 *   these routes are mounted onto /dishes
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const dishQueries = require('../db/queries/dish-queries');

//GET
router.get("/", (req, res) => {
  dishQueries.getAllDishes()
    .then((dishes) => {
      res.json(dishes);
    });
});

router.get("/:id", (req, res) => {
  dishQueries.getOneDish(req.params.id)
    .then((dishes) => {
      res.json(dishes);
    });
});

module.exports = router;
