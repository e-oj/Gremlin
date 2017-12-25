/**
 * @author EmmanuelOlaojo
 * @since 12/20/17
 */
let bcrypt = require("bcrypt");
let mongoose = require("mongoose");

let Schema = mongoose.Schema;
const REQUIRED = "{PATH} is required";

let UserSchema = new Schema({
  alias: {type: String, required: REQUIRED, minlength: 2}
  , password: {type: String, required: REQUIRED, minlength: 2}
});

UserSchema.pre("save", async function(next){
  let doc = this;

  try{
    if(doc.isModified("password")){
      let rounds = 10;
      doc.password = await bcrypt.hash(doc.password, rounds);
    }
  }
  catch(err){
    return next(err);
  }

  next();
});

exports.User = mongoose.model("Users", UserSchema);
