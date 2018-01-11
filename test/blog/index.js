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

  context("Blog Post Creation", () => {
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

      it("should return a new blog object", async () => {
        let props = ["title", "text", "draft"];
        let res = await request.post("/api/u/login").send(users.user1);
        token = res.body.result.token;

        res = await request.put("/api/b")
          .set(config.AUTH_TOKEN, token)
          .send(blogs.blog1);

        res = res.body.result;
        let blogPath = path.join(DATA, res.blog._id);

        for(let prop of props){
          expect(blogs.blog1[prop]).to.equal(res.blog[prop]);
        }

        for(let i = 0; i < blogs.blog1.tags.length; i++){
          expect(blogs.blog1.tags[i]).to.equal(res.blog.tags[i]);
        }

        expect(Date.parse(res.blog.createdAt)).to.not.equal(NaN);
        expect(fs.existsSync(blogPath)).to.be.true;

        fs.unlinkSync(blogPath);
      });
    });
  });
});