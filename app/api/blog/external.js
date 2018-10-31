/**
 * @author emmanuelolaojo
 * @since 10/2/18
 */

let moduleId = "/api/blog/external";

let ExtPost = require("../../models/ExtPost").ExtPost;
let files = require("../../../utils/files");
let response = require("../../../utils/response");
let http = require("../../../utils/HttpStats");

/**
 * Create a link to an external post
 *
 * @param req request
 * @param res response
 *
 * @return {Promise<*>}
 */
exports.create = async (req, res) => {
  let respond = response.success(res);
  let respondErr = response.failure(res, moduleId);
  let data = req.body;
  let props = ["title", "url", "description", "date"];
  let post = new ExtPost();
  let img = req.file;

  for(let prop of props){
    if(!data[prop]){
      return respondErr(http.BAD_REQUEST, `Missing ${prop}`);
    }

    post[prop] = data[prop];
  }

  if(!img){
    return respondErr(http.BAD_REQUEST, "Missing Image");
  }

  try{
    let result = await files.uploadImage(img);

    post.imgId = result._id;
    post = await post.save();
  }
  catch (err) {
    return respondErr(http.SERVER_ERROR, err.message, err);
  }

  respond(http.CREATED, "External Post Created", {post});
};

/**
 * Get an external post from the database
 *
 * @param req request
 * @param res response
 *
 * @return {Promise<void>}
 */
exports.get = async (req, res) => {
  let respond = response.success(res);
  let respondErr = response.failure(res, moduleId);

  try{
    let posts = await ExtPost.find();

    respond(http.OK, "All Posts", {posts});
  }
  catch(err){
    respondErr(http.SERVER_ERROR, err.message, err);
  }
};

/**
 * Delete an external post.
 *
 * @param req request
 * @param res response
 *
 * @return {Promise<*>}
 */
exports.delete = async (req, res) => {
  let respond = response.success(res);
  let respondErr = response.failure(res, moduleId);
  let _id = req.body._id;

  if(!_id){
    return respondErr(http.BAD_REQUEST, "Missing _id!");
  }

  try{
    await ExtPost.deleteOne({_id});
  }
  catch(err){
    respondErr(http.SERVER_ERROR, err.message, err);
  }

  respond(http.OK, "Post Deleted");
};

