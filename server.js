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
let apiRouter = require("./app/api");

mongoose.connect(config.DB_URL);

const STATIC = path.join(__dirname, "public");
let app = express();

app.use(express.static(STATIC));

app.use(logger("dev"));
app.use(bodyParser.json({limit: config.MAX_PAYLOAD}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.use("/api", apiRouter);

app.use("*", (req, res) => {
  res.sendFile(`${STATIC}/index.html`);
});

// start https or http server
startServer();

function startServer(){
  let {port} = config;
  let server;

  if(process.env.NODE_ENV === "production"){
    server = prodServer(port);
  }
  else {
    server = devServer(port);
  }

  server.on("close", async err => {
    if(err) throw err;

    console.log("\nClosing db connections...\n");
    try{
      await mongoose.disconnect();
    }
    catch (e) {
      console.error(e.message)
    }
    console.log("Server Out!! *drops mic*");
  });

  process.on("SIGINT", () => server.close());

  console.log(`Running on port: ${config.PORT}`);
}

function prodServer(port){
  let https = require("https");
  let fs = require("fs");

  let certPath = process.env.CERT;
  let keyPath = process.env.KEY;

  if (!(certPath && keyPath)){
    throw new Error("set env vars for https CERT and KEY paths");
  }

  let options = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath)
  };

  return https.createServer(options, app).listen(port)
}

function devServer(port){
  return app.listen(port);
}