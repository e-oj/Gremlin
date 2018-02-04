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
exports.savePost = async (req, res) => {
  let respond = response.success(res);
  let respondErr = response.failure(res, moduleId);
  let body = cleanReq(req.body);
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
      post.createdAt = Date.now();
    }

    for(let prop of props){
      if(body.hasOwnProperty(prop)) post[prop] = body[prop];
    }

    await post.validate();

    await saveBlogFile(post._id.toString(), body.html);
    post = (await post.save()).toObject();

    respond(http.CREATED, "post created.", {post});
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
  let condition = {deleted: false};

  if(q._id) condition._id = q._id;
  if(q.draft) condition.draft = q.draft === "yes";

  try{
    let posts = await Blog.find(condition)
      .sort("-createdAt")
      .lean({virtuals: true})
      .exec();

    respond(http.OK, `${posts.length} posts found.`, {posts});
  }
  catch(err){
    console.log(err);
    respondErr(http.SERVER_ERROR, err.message, err);
  }
};

/**
 * Route handler for deleting posts via _id. Posts
 * are deleted by setting the deleted property on
 * the post to true.
 *
 * @param req request
 * @param res response
 *
 * @returns {Promise.<*>}
 */
exports.deletePost = async (req, res) => {
  let respond = response.success(res);
  let respondErr = response.failure(res, moduleId);
  let _id = req.body._id;

  if(!_id){
    return respondErr(http.BAD_REQUEST, "Missing _id!");
  }

  try{
    let post = await Blog.findOneAndUpdate({_id}, {deleted: true}).exec();

    if(!post){
      return respondErr(http.NOT_FOUND, "Post not found!");
    }

    respond(http.OK, "post deleted.", {post});
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

/**
 * Cleans up the request body before
 * processing to ensure proper validations.
 *
 * @param body request body
 *
 * @returns clean body
 */
function cleanReq(body){
  let clean = {};

  for(let prop of ["title", "text"]){
    if(body[prop]){
      clean[prop] = body[prop].trim();
    }
  }

  if(body.tags){
    clean.tags = [];

    for(let tag of body.tags){
      tag = tag.trim();

      if(tag){
        clean.tags.push(tag.toLowerCase());
      }
    }

    if(!clean.tags.length){
      clean.tags = null;
    }
  }

  for(let prop of ["draft", "html", "_id"]){
    if(body.hasOwnProperty(prop)){
      clean[prop] = body[prop];
    }
  }

  return clean;
}