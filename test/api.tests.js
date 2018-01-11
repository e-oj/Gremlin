/* eslint-disable no-undef */
let mongoose = require("mongoose");
let chai = require("chai");
let chaiHttp = require("chai-http");
mongoose.Promise = global.Promise = require("bluebird");

let {DB_URL} = require("../config");

mongoose.connect(DB_URL, {useMongoClient: true});
let conn = mongoose.connection;

chai.use(chaiHttp);

describe("All Tests", () => {
  after(async () => {
    await conn.dropDatabase();
    return await conn.close();
  });

  require("./auth");
  require("./home");
  require("./blog");
});