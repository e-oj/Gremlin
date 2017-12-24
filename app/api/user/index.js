/**
 * @author EmmanuelOlaojo
 * @since 12/23/17
 */

let express = require("express");

let user = require("./u");

let userRouter = express.Router();

userRouter.post("/", user.createUser);
userRouter.post("/login", user.login);

module.exports = userRouter;