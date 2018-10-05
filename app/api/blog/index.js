/**
 * @author EmmanuelOlaojo
 * @since 1/10/18
 */

let express = require("express");
let multer = require("multer");

let auth = require("../../../utils/authToken");
let blog = require("./b");
let extPost = require("./external");

let blogRouter = express.Router();
let upload = multer({dest: 'uploads/'});

blogRouter.route("/")
  .get(blog.getPosts)
  .put(auth.checkToken, blog.savePost)
  .delete(auth.checkToken, blog.deletePost);

blogRouter.put("/restore", blog.restorePost);

blogRouter.route("/ext")
  .get(extPost.get)
  .post(upload.single("image"), extPost.create)
  .delete (extPost.delete);

module.exports = blogRouter;
