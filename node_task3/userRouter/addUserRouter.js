const { Router } = require("express");
const Service = require("../userService/services");
const service = new Service();
const addRouter = Router();
addRouter.post("/", async (req, res) => {
  const userdata=req.body;
  const user = await service.add(userdata);
  const msg = `user successfully created`;

  if (user[0]) {
    res.status(400).json({
      message: msg,
      data: user,
    });
  } else {
    res.status(201).json(user);
  }
});
module.exports = addRouter;
