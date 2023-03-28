const { Router } = require("express");
const Service = require("../userService/services");
const service = new Service();
const autoSuggestRouter = Router();

autoSuggestRouter.get("/:subStr/:limit", async (req, res) => {
  const subStr = req.params.subStr;
  const limit = req.params.limit;
  const resMsg = `user not found with the subStr:${subStr}`;
  const users = await service.getAutoSuggest(subStr, limit);
  if (users.length) {
    res.status(200).json(users);
  } else {
    res.status(404).json({
      message: resMsg,
    });
  }
});

module.exports = autoSuggestRouter;
