const mongoose = require("mongoose");

const bcrypt = require('bcrypt');

const ContactSchema = new mongoose.Schema({
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
  ingredients:[
    {type: Schema.Types.ObjectId, ref: 'User'}
  ]
});

const UserSchema = new mongoose.Schema({
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
    unique: true,
  },
  hash_password: {
    type: String,
    required: true,
  },
});

UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.hash_password);
};

const Contact = mongoose.model("Contact", ContactSchema);
const User = mongoose.model("User", UserSchema);

module.exports = { Contact, User };


// Backend kısmında Java, Nodejs veya Express ile Frontend kısmında React Native kullanarak,

// ·        Login girişi olan,

// ·        Kullanıcı ad ve soyad ve telefon numarası içeren bir rehber uygulaması yapmanızı bekliyoruz.

 