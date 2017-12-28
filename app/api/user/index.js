/**
 * @author EmmanuelOlaojo
 * @since 12/23/17
 */

let express = require("express");

let user = require("./u");

let userRouter = express.Router();

userRouter.post("/login", user.login);
userRouter.post("/", user.createUser);

module.exports = userRouter;