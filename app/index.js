const express = require("express");
const bodyParser = require("body-parser");
const router = require("../routes/routes");
const UserServices = require("../services/handlers");
const services = new UserServices();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use("/user", router);

app.listen(4000, function () {
  console.log("listening");
});
