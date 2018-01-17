/* eslint-disable no-undef */
/**
 * @author EmmanuelOlaojo
 * @since 1/9/18
 */

let moduleId = "/api/blog/b";

let fs = Promise.promisifyAll(require("fs"));
let path = require("path");

let Blog = require("../../models/Blog").Blog;
let response = require("../../../utils/response");
let http = require("../../../utils/HttpStats");

/**
 * Route handler for creating/editing posts.
 * A post is a draft if the draft property is
 * set to true. A draft can be saved as a post
 * by setting the value of draft to false. Once
 * a draft is published as a post, It cannot be
 * converted back to a draft. Both drafts and
 * published posts can be edited.
 *
 * @param req request
 * @param res response
 *
 * @returns {Promise.<*>}
 */
exports.saveBlogPost = async (req, res) => {
  let respond = response.success(res);
  let respondErr = response.failure(res, moduleId);
  let body = req.body;
  let props = ["title", "text", "tags", "draft"];
  let post;

  try{
    if(body._id){
      post = await Blog.findById(body._id).exec();

      if(!body.draft && post.draft) {
        post.createdAt = Date.now();
      }
      else if(body.draft && post.draft === false){
        return respondErr(http.BAD_REQUEST, "Post already published");
      }
    }
    else{
      post = new Blog();
    }

    for(let prop of props){
      if(body.hasOwnProperty(prop)) post[prop] = body[prop];
    }

    for(let i = 0; i < post.tags.length; i++){
      post.tags[i] = post.tags[i].trim().toLowerCase();
    }

    post.createdAt = Date.now();

    await saveBlogFile(post._id.toString(), body.html);
    post = (await post.save()).toObject();

    respond(http.CREATED, "post created!", {post});
  }
  catch(err){
    respondErr(http.SERVER_ERROR, err.message, err);
  }
};

/**
 * Route handler for getting posts.
 * If an _id is provided in the request,
 * the specific post with that _id is returned
 *
 * @param req request
 * @param res response
 *
 * @returns {Promise.<void>}
 */
exports.getPosts = async (req, res) => {
  let respond = response.success(res);
  let respondErr = response.failure(res, moduleId);
  let q = req.query;
  let condition = {};

  if(q._id) condition._id = q._id;
  if(q.draft) condition.draft = q.draft === "yes";

  try{
    let posts = await Blog.find(condition)
      .sort("-date")
      .lean({virtuals: true})
      .exec();

    respond(http.OK, `${posts.length} posts found`, {posts});
  }
  catch(err){
    respondErr(http.SERVER_ERROR, err.message, err);
  }
};

/**
 * Helper function to save blog markup
 * in a file
 *
 * @param id the blog's _id
 * @param html the markup
 *
 * @returns {Promise.<void>}
 */
async function saveBlogFile(id, html){
  let filePath = path.join(__dirname, "data", id);

  try{
    await fs.writeFileAsync(filePath, html);
  }
  catch (err){
    throw err;
  }
}