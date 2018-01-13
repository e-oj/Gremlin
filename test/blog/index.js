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
      let token;

      it("should create a new blog file and object", async () => {
        let props = ["title", "text", "draft", "html"];
        let res = await request.post("/api/u/login").send(users.user1);
        token = res.body.result.token;

        res = await request.put("/api/b")
          .set(config.AUTH_TOKEN, token)
          .send(blogs.blog1);

        res = res.body.result;

        for(let prop of props){
          expect(blogs.blog1[prop]).to.equal(res.blog[prop]);
        }

        expect(sameList(blogs.blog1.tags, res.blog.tags)).to.be.true;
        expect(Date.parse(res.blog.createdAt)).to.not.equal(NaN);
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
        let blogPath = path.join(DATA, res.blog._id);

        for(let prop of sameProps){
          expect(res.blog[prop]).to.equal(blogPost[prop]);
        }

        expect(sameList(res.blog.tags, blogPost.tags)).to.be.true;
        expect(res.blog.title).to.equal(newTitle);
        expect(fs.existsSync(blogPath)).to.be.true;
      });

      it("should save a draft", async () => {
        let props = ["title", "text", "draft", "html"];

        let res = await request.put("/api/b")
          .set(config.AUTH_TOKEN, token)
          .send(blogs.blog2);

        res = res.body.result;
        let blogPath = path.join(DATA, res.blog._id);

        for(let prop of props){
          expect(res.blog[prop]).to.equal(blogs.blog2[prop]);
        }

        expect(sameList(res.blog.tags, blogs.blog2.tags));
        expect(Date.parse(res.blog.createdAt)).to.not.equal(NaN);
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

        for(let prop of sameProps){
          expect(res.blog[prop]).to.equal(draft[prop]);
        }

        expect(sameList(res.blog.tags, draft.tags)).to.be.true;
        expect(res.blog.draft).to.be.false;

        expect( (() => {
          return firstCreatedAt < Date.parse(res.blog.createdAt);
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
});

function sameList(lst1, lst2){
  if(lst1 === lst2) return true;
  if(lst1.length !== lst2.length) return false;

  for(let i = 0; i < lst1.length; i++){
    if(lst1[i] !== lst2[i]) return false;
  }

  return true;
}