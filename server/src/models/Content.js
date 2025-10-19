const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  hash: {
    type: mongoose.Schema.Types.UUID,
    required: true,
  },
  data: {
    type: Buffer,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Content", contentSchema);
