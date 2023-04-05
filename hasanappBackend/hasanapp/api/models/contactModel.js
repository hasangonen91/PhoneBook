'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * User Schema
 */
var ContactSchema = new Schema({
    firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      saved: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
});


const Contact = mongoose.model("Contact", ContactSchema);
// // mongoose.model('User', UserSchema);

module.exports = { Contact };
