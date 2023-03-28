const { Router } = require("express");
const Service = require("../userService/services");
const service = new Service();
const getRouter = Router();
getRouter.get("/:id", async (req, res) => {
  const userQueryData = await service.get(req.params);
  const msg = "user data not found";

  if (userQueryData.length === 0) {
    res.status(400).json({
      message: msg,
      info: userQueryData,
    });
  } else {
    res.status(200).json(userQueryData);
  }
});
module.exports = getRouter;
