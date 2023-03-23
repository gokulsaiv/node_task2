const { Router } = require("express");
const router = Router();
const UserServices = require("../services/handlers");
const { body, validationResult, check } = require("express-validator");
const service = new UserServices();
const validationsArray=[
    body('user').notEmpty().withMessage('user must not be empty'),
    check("age")
      .isInt({ min: 4, max: 130 })
      .withMessage("age must be between 4 and 130 "),
    validatePassword,
  ]
router.get("/:id", (req, res) => {
  const getUser = service.getUserService(req.params);
  if (getUser.msg) {
    res.status(404).send(getUser);
  } else {
    res.status(200).send(getUser);
  }
});
router.post(
  "/",
 validationsArray,
  (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).send(errors);
    }
    const userResponse = service.addUserService(req.body);
    res.send(userResponse);
  }
);
router.delete("/:id", (req, res) => {
  const isUserDeleted = service.deleteUserService(req.params);
  if (isUserDeleted === false) {
    res.status(404).send({
      msg: "user data not found!",
    });
  } else {
    res.status(200).json(isUserDeleted);
  }
});
router.get("/:loginStr/:limit", (req, res) => {
  const queryList = service.getUserAutoSuggestService(req.params);
  res.send(queryList);
});
router.put(
  "/",
  validationsArray,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(404).send(errors);
    }
    const userUpdated = service.updateUserService(req.body);

    res.send(userUpdated);
  }
);

function validatePassword(req, res, next) {
  // /^[A-Za-z0-9]*$/.test("gokul32")
  const { user, password, age } = req.body;

  if (!/^[A-Za-z0-9]*$/.test(password)) {
    res.status(400).send(`<h3>password not vaild</h3>`);
  }
  next();
}
module.exports = router;
