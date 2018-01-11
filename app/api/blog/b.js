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

exports.saveBlogPost = async (req, res) => {
  let respond = response.success(res);
  let respondErr = response.failure(res, moduleId);
  let body = req.body;
  let props = ["title", "text", "tags", "draft"];
  let blog;

  try{
    if(body._id){
      blog = await Blog.findById(body._id).exec();

      if(!body.draft && blog.draft) {
        blog.createdAt = Date.now();
      }
      else if(body.draft && blog.draft === false){
        return respondErr(http.BAD_REQUEST, "Post already published");
      }
    }
    else{
      blog = new Blog();
    }

    for(let prop of props){
      if(body.hasOwnProperty(prop)) blog[prop] = body[prop];
    }

    for(let i = 0; i < blog.tags.length; i++){
      blog.tags[i] = blog.tags[i].trim().toLowerCase();
    }

    blog.createdAt = Date.now();

    await saveBlogFile(blog._id.toString(), body.html);
    await blog.save();

    respond(http.CREATED, "post created!", {blog});
  }
  catch(err){
    respondErr(http.SERVER_ERROR, err.message, err);
    console.log(err, blog, body);
  }
};

async function saveBlogFile(id, html){
  let filePath = path.join(__dirname, "data", id);

  try{
    await fs.writeFileAsync(filePath, html);
  }
  catch (err){
    throw err;
  }
}