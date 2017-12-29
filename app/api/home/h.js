/**
 * @author EmmanuelOlaojo
 * @since 12/26/17
 */

let moduleId = "/api/home/h";

let Home = require("../../models/Home").Home;
let response = require("../../../utils/response");
let http = require("../../../utils/HttpStats");

/**
 * route handler for creating/editing
 * home objects
 *
 * @param req request
 * @param res response
 *
 * @returns {Promise.<void>}
 */
exports.setHome = async (req, res) => {
  let respond = response.success(res);
  let respondErr = response.failure(res, moduleId);

  try{
    let home = await Home.findOne().exec();
    let text = req.body.text.trim();

    if(!home) home = new Home();

    home.text = text;
    home = await home.save();

    respond(http.OK, "Home text set", {home});
  }
  catch(err){
    respondErr(http.SERVER_ERROR, err.message, err);
    console.log(err);
  }
};

/**
 * route handler for retrieving a
 * home object
 *
 * @param req request
 * @param res response
 *
 * @returns {Promise.<*>}
 */
exports.getHome = async (req, res) => {
  let respond = response.success(res);
  let respondErr = response.failure(res, moduleId);

  try{
    let home = await Home.findOne().exec();

    if(!home) {
      return respondErr(http.NOT_FOUND, "No homepage available");
    }

    respond(http.OK, "Found homepage", {home});
  }
  catch(err){
    respondErr(http.SERVER_ERROR, "");
  }
};