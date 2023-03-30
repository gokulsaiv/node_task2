const { Router } = require("express");
const Service = require("../Services_Db/userService");
const service = new Service();
const userRouter = Router();
const { body, validationResult, check } = require("express-validator");
const msgs = require("./resMsgs");

const validationsArray = [
  body("login").notEmpty().withMessage("user must not be empty"),
  check("age")
    .isInt({ min: 4, max: 130 })
    .withMessage("age must be between 4 and 130 "),
  validatePassword,
];
userRouter.get("/:id", async (req, res) => {
  const userQueryData = await service.get(req.params);

  if (userQueryData.length === 0) {
    res.status(404).json({
      message: msgs.getMsg,
    });
  } else {
    res.status(200).json(userQueryData);
  }
});
userRouter.post("/", validationsArray, async (req, res) => {
  const userdata = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      errors: errors,
    });
  } else {
    const user = await service.add(userdata);

    if (user[0]) {
      res.status(400).json({
        message: msgs.postMsg,
        data: user,
      });
    } else {
      res.status(201).json(user);
    }
  }
});
userRouter.put("/:id", validationsArray, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      errors: errors,
    });
  } else {
    const id = req.params.id;
    const userData = req.body;

    const user = await service.update(id, userData);
    if (user) {
      res.status(201).json({
        message: msgs.putResMsg,
        data: userData,
      });
    } else {
      res.status(400).json({
        message: msgs.putErrMsg,
      });
    }
  }
});
userRouter.get("/autoSuggestedUsers/", async (req, res) => {
  const subStr = req.query.subStr;
  const limit = req.query.limit;

  const users = await service.getAutoSuggest(subStr, limit);
  if (users.length) {
    res.status(200).json(users);
  } else {
    res.status(404).json({
      message: msgs.AutoSuggestResMsg,
    });
  }
});
userRouter.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);

  const isUserDeleted = await service.delete(id);
  if (isUserDeleted) {
    res.status(200).json({
      msg: msgs.delMessage,
    });
  } else {
    res.status(404).json({
      msg: msgs.delErrMsg,
    });
  }
});
function validatePassword(req, res, next) {
  // /^[A-Za-z0-9]*$/.test("gokul32")
  const { user, password, age } = req.body;

  if (!/^[A-Za-z0-9]*$/.test(password)) {
    res.status(400).send(`<h3>password not vaild</h3>`);
  }
  next();
}

module.exports = userRouter;
