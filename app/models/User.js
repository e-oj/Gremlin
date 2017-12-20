/**
 * @author EmmanuelOlaojo
 * @since 12/20/17
 */
let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let UserSchema = new Schema({
  alias: {type: String, required: true}
  , password: {type: String, required: true}
});

exports.User = mongoose.model("Users", UserSchema);