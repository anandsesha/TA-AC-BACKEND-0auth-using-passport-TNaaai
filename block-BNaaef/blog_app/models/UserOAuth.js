var mongoose = require('mongoose');
const { use } = require('../routes');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var userOauthSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    photo: { type: String, required: true },
  },
  { timestamps: true }
);

var UserOAuth = mongoose.model('UserOAuth', userOauthSchema);

module.exports = UserOAuth;
