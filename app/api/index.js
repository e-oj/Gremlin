/**
 * @author EmmanuelOlaojo
 * @since 12/20/17
 */

let express = require("express");

let UserRouter = require("./user");

let apiRouter = express.Router();

apiRouter.use("/u", UserRouter);

apiRouter.get("/", (req, res) => {
  res.send("welcome to ze api");
});

module.exports = apiRouter;