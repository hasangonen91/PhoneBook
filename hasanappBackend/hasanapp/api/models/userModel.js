'use strict';

var mongoose = require('mongoose'),
  bcrypt = require('bcrypt'),
  Schema = mongoose.Schema;


var UserSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  hash_password: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  },
//   contacts:[
//     {type: Schema.Types.ObjectId, ref: 'Contact'}
//   ]
});

UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.hash_password);
};

// module.exports.User = mongoose.model("User", UserSchema);

const User = mongoose.model("User", UserSchema);
// // mongoose.model('User', UserSchema);

module.exports = { User };