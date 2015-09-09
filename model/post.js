var mongoose = require("mongoose");

var PostSchema = mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, required: true}
});

module.exports = mongoose.model("Post", PostSchema);
