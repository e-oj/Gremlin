/**
 * @author EmmanuelOlaojo
 * @since 12/20/17
 */

let express = require("express");

let apiRouter = express.Router();

apiRouter.get("/", (req, res) => {
  res.send("welcome to ze api");
});

module.exports = apiRouter;