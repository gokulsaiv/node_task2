const express = require("express");
const bodyParser = require("body-parser");
const { body, validationResult, check } = require("express-validator");
const {
  autoSuggest,
  addDataHandler,
  getDateHandler,
  updateDataHandler,
  deleteDataHandler,
  autoSuggestHandler,
} = require("../controllers/handlers");

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
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).send(errors);
    }
    const acknowleagement = addDataHandler(req.body);
    res.send(acknowleagement);
  }
);
app.post("/get", (req, res) => {
  const acknowleagement = getDateHandler(req.body);
  res.send(acknowleagement);
});
app.post("/delete", (req, res) => {
  const acknowleagement = deleteDataHandler(req.body);
  res.send(acknowleagement);
});
app.post(
  "/update",
  [
    check("updateAge")
      .isInt({ min: 4, max: 130 })
      .withMessage("age must be between 4 and 130 "),
    validatePassword,
  ],
  (req, res) => {
    const errors = validationResult(req);
    const acknowleagement = updateDataHandler(req.body);
    if (!errors.isEmpty()) {
      res.status(400).send(errors);
    }
    res.send(acknowleagement);
  }
);
app.post("/autoSuggest", (req, res) => {
  const acknowleagement = autoSuggestHandler(req.body);
  res.send(acknowleagement);
});

function validatePassword(req, res, next) {
  // /^[A-Za-z0-9]*$/.test("gokul32")
  const { user, password, age } = req.body;

  if (!/^[A-Za-z0-9]*$/.test(password)) {
    res.status(400).send(`<h3>password not vaild</h3>`);
  }
  next();
}

app.listen(4000, function () {
  console.log("listening");
});
