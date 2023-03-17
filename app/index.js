const express = require("express");
const bodyParser = require("body-parser");
const { body, validationResult, check } = require("express-validator");
let id = 1;
let data = [];
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("../public"));

app.post(
  "/submit",
  [
    check("age")
      .isInt({ min: 4, max: 130 })
      .withMessage("age must be between 4 and 130 "),
    validatePassword,
    addData,
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).send(errors);
    }

    const { user } = req.body;

    res.send(`${user}`);
  }
);
app.post("/get", getData, (req, res) => {
  res.send({
    status: "not found",
  });
});
app.post("/delete", deleteData, (req, res) => {});
app.post(
  "/update",
  [
    check("updateAge")
      .isInt({ min: 4, max: 130 })
      .withMessage("age must be between 4 and 130 "),
    validatePassword,
    updateData,
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).send(errors);
    }

    res.send("done updating!");
  }
);
app.post("/autoSuggest", limitQuery, (req, res) => {});

function getData(req, res, next) {
  let query;
  for (const personData of data) {
    if (personData.id === req.body.id) {
      res.send(personData);
    }
  }
  next();
}
function addData(req, res, next) {
  //id,username,passwaord,age,isDeleted
  data.push({
    id: `${id++}`,
    userName: `${req.body.user}`,
    password: `${req.body.password}`,
    age: `${req.body.age}`,
    isDeleted: false,
  });
  console.log(data);
  next();
}
function deleteData(req, res, next) {
  console.log(req.body);
  const flag = req.body.flag;
  const index = Number(req.body.idDelete);
  console.log(req.body);
  if (flag === "true") {
    data[index - 1].isDeleted = !data[index - 1].isDeleted;
  } else {
    data.splice(index - 1, 1);
  }
  //console.log(data);
  console.log(data[index - 1].isDeleted);
  next();
}
function updateData(req, res, next) {
  console.log(req.body);
  const id = Number(req.body.updateId);
  //const {oldUser,oldPassword,oldAge}=data[id-1];
  const oldData = data[id - 1];
  console.log(data[id - 1]);
  const { updateUser, updatePassword, updateAge } = req.body;

  if (id - 1 < data.length) {
    data[id - 1] = {
      id: `${id}`,
      userName: `${updateUser ? updateUser : oldData.userName}`,
      password: `${updatePassword ? updatePassword : oldData.password}`,
      age: `${updateAge ? updateAge : oldData.age}`,
      isDeleted: false,
    };
    next();
  } else {
    res.send({
      status: "index of of bound!",
    });
  }
}

function validatePassword(req, res, next) {
  // /^[A-Za-z0-9]*$/.test("gokul32")
  const { user, password, age } = req.body;

  if (!/^[A-Za-z0-9]*$/.test(password)) {
    res.status(400).send(`<h3>password not vaild</h3>`);
  }
  next();
}
function limitQuery(req, res, next) {
  const limit = Number(req.body.limit);
  const subStr = req.body.autoString;
  const querySet = [];

  for (const element of data) {
    if (element.userName.includes(subStr)) {
      querySet.push(element);
    }
  }
  res.send(querySet.slice(0, limit));
}

app.listen(4000, function () {
  console.log("listening");
});
