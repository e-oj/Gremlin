/* eslint-disable no-undef */
/**
 * @author EmmanuelOlaojo
 * @since 1/10/18
 */

let chai = require("chai");
let expect = chai.expect;
let fs = require("fs");
let path = require("path");

let http = require("../../utils/HttpStats");
let config = require("../../config");
let blogs =  require("./mock.blog");
let users = require("../auth/mock.users");
let Blog = require("../models").Blog;

const SERVER_URL = `http://localhost:${config.PORT}`;
const DATA = "./app/api/blog/data";

module.exports = describe("Blog tests", () => {
  let request = chai.request(SERVER_URL);
  let token;

  context("Create/Edit Blog Post", () => {
    it("should fail without authentication", async () => {
      try{
        await request.put("/api/b").send(blogs.blog1);
      }
      catch(err){
        let msg = err.response.body.message;

        expect(err).to.have.status(http.UNAUTHORIZED);
        expect(msg.includes(config.AUTH_ERR_MSG)).to.be.true;
      }
    });

    context("After Authentication", () => {
      it("should create a new blog file and object", async () => {
        let res = await request.post("/api/u/login").send(users.user1);
        token = res.body.result.token;

        res = await request.put("/api/b")
          .set(config.AUTH_TOKEN, token)
          .send(blogs.blog1);

        res = res.body.result;

        expect(samePost(res.post, blogs.blog1)).to.be.true;
        expect(Date.parse(res.post.createdAt)).to.not.equal(NaN);
      });

      it("should edit an existing post", async () => {
        let blogPost = (await Blog.findOne().exec()).toObject();
        let newTitle = "Dracula";
        let sameProps = ["text", "draft", "html"];

        expect(blogPost.title).to.not.equal(newTitle);

        blogPost.title = newTitle;

        let res = await request.put("/api/b")
          .set(config.AUTH_TOKEN, token)
          .send(blogPost);

        res = res.body.result;
        let blogPath = path.join(DATA, res.post._id);

        expect(samePost(res.post, blogPost, {props: sameProps})).to.be.true;
        expect(res.post.title).to.equal(newTitle);
        expect(fs.existsSync(blogPath)).to.be.true;
      });

      it("should save a draft", async () => {
        let req = request.put("/api/b").set(config.AUTH_TOKEN, token);
        let res = await req.send(blogs.blog2);

        res = res.body.result;
        let blogPath = path.join(DATA, res.post._id);

        expect(samePost(res.post, blogs.blog2)).to.be.true;
        expect(Date.parse(res.post.createdAt)).to.not.equal(NaN);
        expect(fs.existsSync(blogPath)).to.be.true;
      });

      it("should convert draft to post", async () => {
        let draft = (await Blog.findOne({draft: true})).toObject();
        let sameProps = ["title", "text", "html"];

        draft.draft = false;
        let firstCreatedAt = Date.parse(draft.createdAt);

        let res = await request.put("/api/b")
          .set(config.AUTH_TOKEN, token)
          .send(draft);

        res = res.body.result;

        expect(samePost(res.post, draft, {props: sameProps})).to.be.true;
        expect(res.post.draft).to.be.false;

        expect( (() => {
          return firstCreatedAt < Date.parse(res.post.createdAt);
        })() ).to.be.true;
      });

      it("should not save published post as draft", async () => {
        try{
          let post = (await Blog.findOne({title: blogs.blog2.title})).toObject();

          post.draft = true;

          await request.put("/api/b")
            .set(config.AUTH_TOKEN, token)
            .send(post);
        }
        catch(err){
          expect(err).to.have.status(http.BAD_REQUEST);
          expect(err.response.body.message.includes("already published")).to.be.true;
        }
      });
    });
  });

  context("Blog Post Retrieval", () => {
    before(async () => {
      try{
        await request.put("/api/b")
          .set(config.AUTH_TOKEN, token)
          .send(blogs.blog3);
      }
      catch(err){
        console.log(err);
        throw err;
      }
    });

    it("should return all drafts and published posts", async () => {
      let res = await request.get("/api/b");
      let posts = await Blog.find({deleted: false})
        .sort("-createdAt")
        .lean({virtuals: true})
        .exec();

      res = res.body.result;

      for(let i = 0; i < res.posts.length; i++){
        expect(samePost(res.posts[i], posts[i]));
      }
    });

    it("should return only drafts", async () => {
      let res = await request.get("/api/b/?draft=yes");
      let post = await Blog.findOne({draft: true, deleted: false})
        .lean({virtuals: true})
        .exec();

      res = res.body.result;

      expect(res.posts.length).to.equal(1);
      expect(samePost(res.posts[0], post)).to.be.true;
    });


    it("should return only published posts", async () => {
      let res = await request.get("/api/b/?draft=no");
      let posts = await Blog.find({draft: false}).sort("-date").lean({virtuals: true}).exec();

      res = res.body.result;

      for(let i = 0; i < res.posts.length; i++){
        expect(res.posts[i].draft).to.be.false;
        expect(samePost(res.posts[i], posts[i]));
      }
    });

    it("should return a post by _id", async () => {
      let post = await Blog.findOne().lean({virtuals: true}).exec();
      let res = await request.get(`/api/b/?_id=${post._id}`);

      res = res.body.result;

      expect(samePost(res.posts[0], post)).to.be.true;
    });
  });

  context("Post state of existence", async () => {
    let post;

    it("should delete a post by _id", async () => {
      post = await Blog.findOne().exec();

      expect(post.deleted).to.equal(false);

      let req = request.del("/api/b").set(config.AUTH_TOKEN, token);
      let res = await req.send({_id: post._id});

      res = res.body.result;

      expect(samePost(res.post, post)).to.be.true;
      expect(res.post.deleted).to.be.true;

      post = res.post;
    });

    it("should restore a deleted post", async () => {
      expect(post.deleted).to.be.true;

      let req = request.put("/api/b/restore").set(config.AUTH_TOKEN, token);
      let res = await req.send({_id: post._id});

      res = res.body.result;

      expect(samePost(res.post, post)).to.be.true;
      expect(res.post.deleted).to.be.false;
    });
  });
});

function samePost(post1, post2, options={}){
  let props = options.props || ["title", "text", "draft", "html"];
  let tags = options.tags || true;

  for(let prop of props){
    if(post1[prop] !== post2[prop]){
      return false;
    }
  }

  if(tags) return sameList(post1.tags, post2.tags);

  return true;
}

function sameList(lst1, lst2){
  if(lst1 === lst2) return true;
  if(lst1.length !== lst2.length) return false;

  for(let i = 0; i < lst1.length; i++){
    if(lst1[i] !== lst2[i]) return false;
  }

  return true;
}