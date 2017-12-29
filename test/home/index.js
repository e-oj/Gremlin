/* eslint-disable no-undef */
/**
 * @author EmmanuelOlaojo
 * @since 12/26/17
 */

let chai = require("chai");
let expect = chai.expect;

let http = require("../../utils/HttpStats");
let config = require("../../config");
let homes = require("./mock.home");
let users = require("../auth/mock.users");
let Home = require("../models").Home;
const SERVER_URL = `http://localhost:${config.PORT}`;

module.exports = describe("Home Tests", () => {
  let request = chai.request(SERVER_URL);

  context("Home Creation", () => {
    it("should fail without authentication", async () => {
      try{
        await request.put("/api/h").send(homes.home1);
      }
      catch(err){
        let msg = err.response.body.message;

        expect(err).to.have.status(http.UNAUTHORIZED);
        expect(msg.includes(config.AUTH_ERR_MSG)).to.be.true;
      }
    });

    context("After Authentication", () => {
      let token;

      it("should return a new home object", async () => {
        let res = await request.post("/api/u/login").send(users.user1);
        token = res.body.result.token;

        res = await request.put("/api/h")
          .set(config.AUTH_TOKEN, token)
          .send(homes.home1);

        expect(res.body.result.home.text).to.equal(homes.home1.text);
      });

      it("should modify existing home (only one home)", async () => {
        let res = await request.put("/api/h")
          .set(config.AUTH_TOKEN, token)
          .send(homes.home2);

        let dbHomes = await Home.find().exec();

        expect(res.body.result.home.text).to.equal(homes.home2.text);
        expect(dbHomes).to.have.length(1);
      });
    });
  });

  context("Home retrieval", () => {
    it("should return the home object", async () => {
      let res = await request.get("/api/h");

      expect(res.body.result.home.text).to.equal(homes.home2.text);
    });
  });
});
