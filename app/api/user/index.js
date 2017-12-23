/**
 * @author EmmanuelOlaojo
 * @since 12/23/17
 */

let express = require("express");

let user = require("./u");
// let auth = require("../utils/authToken");

let userRouter = express.Router();

userRouter.route("/")
  .post(user.createUser);

userRouter.post("/login", user.login);

module.exports = userRouter;