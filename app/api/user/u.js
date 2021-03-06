/**
 * @author EmmanuelOlaojo
 * @since 12/20/17
 */

let moduleId = "/api/user/auth";

let bcrypt = require("bcrypt");

let response = require("../../../utils/response");
let http = require("../../../utils/HttpStats");
let auth = require("../../../utils/authToken");
let User = require("../../models/User").User;

/**
 * Route handler for creating users
 *
 * @param req the request
 * @param res the response
 *
 * @returns {Promise.<*>}
 */
exports.createUser = async (req, res) => {
  let respond = response.success(res);
  let respondErr = response.failure(res, moduleId);
  let props = ["alias", "password"];

  try{
    let userExists = !!await User.findOne().exec();

    if(userExists){
      return respondErr(http.FORBIDDEN, "User cannot be created");
    }

    let user = new User();

    for(let prop of props){
      user[prop] = req.body[prop].toString().trim();
    }

    user = await user.save();
    let token = await auth.createToken(user);

    respond(http.CREATED, "User created", {user, token});
  }
  catch(err){
    respondErr(http.SERVER_ERROR, err.message, err);
  }
};

/**
 * Login route handler
 *
 * @param req request
 * @param res response
 *
 * @returns {Promise.<*>}
 */
exports.login = async (req, res) => {
  let respond = response.success(res);
  let respondErr = response.failure(res, moduleId);
  let {alias, password} = req.body;
  let fail = () => respondErr(http.UNAUTHORIZED, "Invalid User");

  try{
    let user = await User.findOne({alias}).exec();
    if(!user) return fail();

    let validPass = await bcrypt.compare(password, user.password);
    if(!validPass) return fail();

    let token = await auth.createToken(user);
    return respond(http.OK, "Logged In!", {token});
  }
  catch(err){
    respondErr(http.SERVER_ERROR, err.message, err);
  }
};