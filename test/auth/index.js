/* eslint-disable no-undef */
/**
 * @author EmmanuelOlaojo
 * @since 12/23/17
 */

let bcrypt = require("bcrypt");
let jwt = Promise.promisifyAll(require("jsonwebtoken"));
let chai = require("chai");
let expect = chai.expect;

let http = require("../../utils/HttpStats");
let config = require("../../config");
let mock = require("./mock.users");
let SERVER_URL = `http://localhost:${config.PORT}`;

module.exports = describe("Authentication Tests", () => {
  let request = chai.request(SERVER_URL);

  context("User Creation", () => {
    it("should return a user and a jwt with user's _id and alias", async () => {
      let res = await request.post("/api/u").send(mock.user1);
      let {user, token} = res.body.result;
      let decoded = await jwt.verifyAsync(token, config.SECRET);

      expect(mock.user1.alias).to.equal(user.alias);
      expect(bcrypt.compareSync(mock.user1.password, user.password)).to.be.true;

      expect(mock.user1.alias).to.equal(decoded.alias);
      expect(decoded._id).to.exist;
    });

    it("should not allow the creation of a second user", async () => {
      try{
        await request.post("/api/u").send(mock.user2);
      }
      catch(err){
        let msg = err.response.body.message;

        expect(err).to.have.status(http.FORBIDDEN);
        expect(msg.includes("cannot be created")).to.be.true;
      }
    });
  });

  context("Log in", () => {
    it("should return a jwt with user's _id and alias", async () => {
      let res = await request.post("/api/u/login").send(mock.user1);
      let {token} = res.body.result;
      let decoded = await jwt.verifyAsync(token, config.SECRET);

      expect(decoded._id).to.exist;
      expect(decoded.alias).to.equal(mock.user1.alias);
    });

    it("should fail for an invalid user", async () => {
      try{
        await request.post("/api/u/login").send(mock.user2);
      }
      catch(err){
        let msg = err.response.body.message;

        expect(msg.includes("Invalid User")).to.be.true;
        expect(err).to.have.status(http.UNAUTHORIZED);
      }
    });
  });
});
