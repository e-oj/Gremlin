/**
 * @author EmmanuelOlaojo
 * @since 12/20/17
 */

let express = require("express");

let userRouter = require("./user");
let homeRouter = require("./home");
let blogRouter = require("./blog");

let apiRouter = express.Router();

apiRouter.use("/u", userRouter);
apiRouter.use("/h", homeRouter);
apiRouter.use("/b", blogRouter);

apiRouter.get("/", (req, res) => {
  res.send("welcome to ze api");
});

module.exports = apiRouter;