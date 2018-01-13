/* eslint-disable no-undef */
let fs = require("fs");
let path = require("path");
let mongoose = require("mongoose");
let chai = require("chai");
let chaiHttp = require("chai-http");
mongoose.Promise = global.Promise = require("bluebird");

let {DB_URL} = require("../config");

mongoose.connect(DB_URL, {useMongoClient: true});
let conn = mongoose.connection;

chai.use(chaiHttp);

let Blog = require("./models").Blog;

describe("All Tests", () => {
  after(async () => {
    let posts = await Blog.find().exec();

    for (let post of posts){
      fs.unlinkSync(path.join("./app/api/blog/data", post._id.toString()));
    }

    await conn.dropDatabase();
    return await conn.close();
  });

  require("./auth");
  require("./home");
  require("./blog");
});