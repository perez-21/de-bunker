const mongoose = require("mongoose");

const credentialSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    enum: ["card", "wallet", "login", "note"],
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Credential", credentialSchema);
