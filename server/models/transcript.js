const mongoose = require("mongoose");

const Transcript = new mongoose.Schema({
   audioURL: { type: String },
   transcriptText: { type: String },
   date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Transcript", Transcript);