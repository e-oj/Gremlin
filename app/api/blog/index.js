/**
 * @author EmmanuelOlaojo
 * @since 1/10/18
 */

let express = require("express");

let auth = require("../../../utils/authToken");
let blog = require("./b");

let blogRouter = express.Router();

blogRouter.route("/")
  .get(blog.getPosts)
  .put(auth.checkToken, blog.savePost)
  .delete(auth.checkToken, blog.deletePost);

module.exports = blogRouter;
