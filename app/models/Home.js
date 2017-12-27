/**
 * @author EmmanuelOlaojo
 * @since 12/26/17
 */

let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let HomeSchema = new Schema({
  text: {type: String, required: true}
});

exports.Home = mongoose.model("Home", HomeSchema);