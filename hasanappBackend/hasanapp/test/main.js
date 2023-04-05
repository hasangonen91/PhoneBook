const express = require("express");
const mongoose = require("mongoose");

const { User, Contact } = require("./model");

const app = express();

app.use(express.json());

app.get("/getContact", async (req, res) => {
  const allDogs = await Contact.find();
  return res.status(200).json(allDogs);
});

app.post("/setContact", async (req, res) => {
  const newContact = new Contact({ ...req.body });
  const insertedContact = await newContact.save();
  return res.status(201).json(insertedContact);
});

app.put("/setContact/:id", async (req, res) => {
  const { id } = req.params;
  const updateContact = await Contact.findById(id);
  return res.status(200).json(updateContact);
});

app.delete("/setContact/:id", async (req, res) => {
  const { id } = req.params;
  const deletedContact = await Contact.findByIdAndDelete(id);
  return res.status(200).json(deletedContact);
});

app.get("/login", async (req, res) => {
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;
    if (!user || !user.comparePassword(req.body.password)) {
      return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
    }
    return res.json({ token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id }, 'hasanapp') });
  });
});

app.get("/register", async (req, res) => {
  let newUser = new User(req.body);
  newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
  newUser.save(function(err, user) {
    if (err) {
      return res.status(400).send({
        message: err
      });
    } else {
      user.hash_password = undefined;
      return res.json(user);
    }
  });
});

exports.loginRequired = function(req, res, next) {
  if (req.user) {
    next();
  } else {

    return res.status(401).json({ message: 'Unauthorized user!!' });
  }
};
exports.profile = function(req, res, next) {
  if (req.user) {
    res.send(req.user);
    next();
  } 
  else {
   return res.status(401).json({ message: 'Invalid token' });
  }
};

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://hasanmongodb:SzUUn9x1lZxc5LNO@cluster0.p209cui.mongodb.net/?retryWrites=true&w=majority"
    );
    app.listen(3000, () => console.log("Server started on port 3000"));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
// hasanmongodb
// SzUUn9x1lZxc5LNO

