/**
 * @author EmmanuelOlaojo
 * @since 12/20/17
 */

let moduleId = "/api/user/auth";

let response = require("../../utils/response");
let http = require("../../utils/HttpStats");
let auth = require("../../utils/authToken");
let User = require("../models/User").User;

exports.createUser = async (req, res) => {
  let respond = response.success(res);
  let respondErr = response.failure(res, moduleId);
  let props = ["alias", "password"];
  let user = new User();

  for(let prop of props){
    user[prop] = req.body[prop];
  }

  try{
    user = await user.save();
    let token = auth.createToken(user);

    respond(http.CREATED, "User created", {user, token});
  }
  catch(err){
    respondErr(http.SERVER_ERROR, err.message, err);
  }
};