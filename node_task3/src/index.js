const express = require("express");
const autoSuggestRouter = require("../userRouter/autoSuggestRouter");
const getUserRouter = require("../userRouter/getUserRouter");
const addUserRouter = require("../userRouter/addUserRouter");
const deleteUserRouter = require("../userRouter/deleteUserRouter");
const updateUserRouter = require("../userRouter/updateUserRouter");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/user", [
  autoSuggestRouter,
  getUserRouter,
  addUserRouter,
  deleteUserRouter,
  updateUserRouter,
]);

app.listen(3000);
