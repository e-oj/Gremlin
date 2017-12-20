/* eslint-disable no-undef */
/**
 * @author EmmanuelOlaojo
 * @since 12/20/17
 */

let path = require("path");
let express = require("express");
let logger = require("morgan");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
mongoose.Promise = global.Promise = require("bluebird");
let cors = require("cors");

let config = require("./config");

mongoose.connect(config.DB_URL, {useMongoClient: true});

const STATIC = path.join(__dirname, "public");
let app = express();

app.use(express.static(STATIC));

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.use("/", (req, res) => {
  res.send("hello world");
});

app.use("*", (req, res) => {
  res.sendFile(`${STATIC}/index.html`);
});

let server = app.listen(config.PORT);

server.on("close", async err => {
  if(err) throw err;

  console.log("\nClosing db connections...\n");
  await mongoose.disconnect();
  console.log("Server Out!! *drops mic*");
});

process.on("SIGINT", () => server.close());

console.log(`Running on port: ${config.PORT}`);