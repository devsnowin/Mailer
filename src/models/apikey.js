const mongoose = require("mongoose");

const { Schema } = mongoose;

const apikeySchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.String, required: true, ref: "User" },
    apikey: { type: String, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Apikey", apikeySchema);
