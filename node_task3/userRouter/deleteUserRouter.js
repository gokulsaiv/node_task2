const { Router } = require("express");
const Service = require("../userService/services");
const service = new Service();
const deleteRouter = Router();
deleteRouter.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const message = "user deleted";
  const errMsg = `failed to deleted id:${id}`;
  const isUserDeleted = await service.delete(id);
  if (isUserDeleted) {
    res.status(200).json({
      msg: message,
    });
  } else {
    res.status(404).json({
      msg: errMsg,
      info: isUserDeleted,
    });
  }
});
module.exports = deleteRouter;
