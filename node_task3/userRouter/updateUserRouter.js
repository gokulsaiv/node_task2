const { Router } = require("express");
const Service = require("../userService/services");
const service = new Service();
const updateRouter = Router();
updateRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  const userData = req.body;
  const ResMsg = `user updated with the id:${id}`;
  const errMsg = `user not found with the id:${id}`;
  const user = await service.update(id, userData);
  if (user) {
    res.status(201).json({
      message: ResMsg,
      data: userData,
    });
  } else {
    res.status(400).json({
      message: errMsg,
    });
  }
});
module.exports = updateRouter;
