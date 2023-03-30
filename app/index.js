const express = require("express");
const bodyParser = require("body-parser");
const router = require("../routes/routes");
const UserServices = require("../services/handlers");
const services = new UserServices();
const userRouter = require("../userRouter/userRouters");

const app = express();

app.use(express.json());
app.use("/user", router);
app.use("/userDB", userRouter);

app.listen(4000, function () {
  console.log("listening");
});
