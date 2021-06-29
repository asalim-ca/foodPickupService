// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require('morgan');
const cookieSession = require("cookie-session");


// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

app.use(cookieSession({
  name: 'loginType',
  keys: ['key1']
}));

//Required Routes
const customersRoutes = require("./routes/customers");
const dishesRoutes = require("./routes/dishes");
const ordersRoutes = require("./routes/orders");
const loginRoutes = require("./routes/login");
const adminRoutes = require("./routes/admin");
const findUser = require('./db/queries/customers-queries');
const adminQueries = require('./db/queries/admin-queries');


//stretch
// const orderRatingsRoutes = require("./routes/order_ratings");

//Routes
app.use("/api/customers", customersRoutes);
app.use("/api/dishes", dishesRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/login", loginRoutes);
app.use("/admin", adminRoutes);

//stretch
// app.use("/api/order_ratings", orderRatingsRoutes);

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  if (req.session.loginType === "admin") {
    adminQueries.findAdminbyId(req.session.userId)
    .then((response) => {
      const template = {user: response, loginType: "admin"}
      res.render("index", template);
    })
  }else{
    findUser.getOneCustomer(req.session.userId)
    .then((response) => {
      const template = {user: response, loginType: "customer"}
    res.render("index", template);
    })
  }


});

app.listen(PORT, () => {
  console.log(`Online app listening on port ${PORT}`);
});
