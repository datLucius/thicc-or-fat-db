const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const voteSchema = new Schema({
  thicc: Number,
  fat: Number
}, {collection: 'Vote'})

const User = mongoose.model('Vote', voteSchema);

module.exports = Vote;
