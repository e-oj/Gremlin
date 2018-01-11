/**
 * @author EmmanuelOlaojo
 * @since 1/9/18
 */

let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let BlogSchema = new Schema({
  title: {type: String, required: true},
  text: {type: String, required: true},
  tags: {type: [String], required: true},
  draft: {type: Boolean, default: null, required: true},
  createdAt: {type: Date, required: true}
});

exports.Blog = mongoose.model("Blog", BlogSchema);