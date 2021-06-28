/*
 * All routes for dishes are defined here
 * Since this file is loaded in server.js into api/dishes,
 *   these routes are mounted onto /dishes
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const findUser = require('../db/queries/customers-queries');

//GET
router.get("/", (req, res) => {

  res.render("login")

});

router.post("/", (req, res) => {
  findUser.findCustomerByEmail(req.body.email)
    .then((response) => {
      if (response) {
        return res.redirect("/")
      }else{
        return res.send("not logged in")
      }
    });
})

// router.get("/admin", (req, res) => {
//   res.render("login");
// });


module.exports = router;
