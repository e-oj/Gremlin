/**
 * @author EmmanuelOlaojo
 * @since 12/27/17
 */

let express = require("express");

let auth = require("../../../utils/authToken");
let home = require("./h");

let homeRouter = express.Router();

homeRouter.put("/", auth.checkToken, home.setHome);
homeRouter.get("/", home.getHome);

module.exports = homeRouter;
