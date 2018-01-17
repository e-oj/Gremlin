/**
 * @author EmmanuelOlaojo
 * @since 1/10/18
 */

let express = require("express");

let auth = require("../../../utils/authToken");
let blog = require("./b");

let blogRouter = express.Router();

blogRouter.route("/")
  .put(auth.checkToken, blog.saveBlogPost)
  .get(blog.getPosts);

module.exports = blogRouter;
