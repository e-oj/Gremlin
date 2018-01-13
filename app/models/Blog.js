/**
 * @author EmmanuelOlaojo
 * @since 1/9/18
 */

let fs = Promise.promisifyAll(require("fs"));
let path = require("path");
let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let BlogSchema = new Schema({
  title: {type: String, required: true},
  text: {type: String, required: true},
  tags: {type: [String], required: true},
  draft: {type: Boolean, default: null, required: true},
  createdAt: {type: Date, required: true}
});

BlogSchema.virtual("html")
  .get(function(){
    let self = this;

    let blogPath = path.join("./app/api/blog/data", self._id.toString());
    let text = fs.readFileSync(blogPath);

    return text.toString();
  });

BlogSchema.set("toObject", {virtuals: true});

exports.Blog = mongoose.model("Blog", BlogSchema);