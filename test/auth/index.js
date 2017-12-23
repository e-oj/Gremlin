/* eslint-disable no-undef */
/**
 * @author EmmanuelOlaojo
 * @since 12/23/17
 */

let bcrypt = require("bcrypt");
let jwt = Promise.promisifyAll(require("jsonwebtoken"));
let chai = require("chai");
let expect = chai.expect;

// let User = require("../models/index").User;
// let http = require("../../utils/HttpStats");
let config = require("../../config");
let mock = require("./mock.users");
let SERVER_URL = `http://localhost:${config.PORT}`;

module.exports = describe("Authentication Tests", () => {
  let request = chai.request(SERVER_URL);

  context("Creating a User", () => {
    let res;

    it("should return a user and a jwt with user's _id and alias", async () => {
      res = await request.post("/api/u").send(mock.user1);
      let {user, token} = res.body.result;
      let decoded = await jwt.verifyAsync(token, config.SECRET);
      let {alias: d_alias} = decoded;

      expect(mock.user1.alias).to.equal(user.alias);
      expect(bcrypt.compareSync(mock.user1.password, user.password)).to.be.true;

      expect(mock.user1.alias).to.equal(d_alias);
    });
  });
});
