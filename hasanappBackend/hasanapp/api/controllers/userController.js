'use strict';

const mongoose = require('mongoose');
const  jwt = require('jsonwebtoken');
const  bcrypt = require('bcrypt');


const {User} = require('../models/userModel');
const {Contact} = require('../models/contactModel');
  
exports.register = async (req, res) => {
    try {
        const newUser = new User(req.body);
        newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
        await newUser.save();
        let resUser = newUser;
        resUser.hash_password = undefined;
        return await res.json(resUser);
    } catch (err) {
        return res.status(400).send({
            message: err.toString()
        });
    }
};

exports.sign_in = async (req, res) => {
    try {
        const currentUser = await User.findOne({
            phone: req.body.phone
        });
        if (!currentUser) {
            return res.status(404).send({
                message: "Kullanıcı bulunamadı."
            });
        }
        if (!currentUser || !currentUser.comparePassword(req.body.password)) {
            return res.status(401).json({ message: 'Geçersiz kullanıcı veya parola. Kimlik doğrulama başarısız oldu. Geçersiz kullanıcı veya şifre.' });
        }else {
            return res.json({ token: jwt?.sign({ phone: currentUser?.phone, firstName: currentUser?.firstName, lastName: currentUser?.lastName, _id: currentUser?._id }, 'hasanapp') });
        }
    } catch (err) {
        return res.status(400).send({
            message: err.toString()
        });
    }
};

exports.loginRequired = function(req, res, next) {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: 'Kimlik doğrulama başarısız oldu' });
  }
};

exports.profile = function(req, res, next) {
  if (req.user) {
    res.send(req.user);
    next();
  } 
  else {
   return res.status(401).json({ message: 'Geçersiz token' });
  }
};


exports.contacts = async (req, res) => {
    try {
        Contact.find({ "saved":  req.user._id})
        const currentContact = await Contact.find({ "saved":  req.user._id});
        if (!currentContact) {
            return res.status(404).send({
                data: [],
                message: "Veri bulunamadı."
            });
        }
        else {
            return res.json({ 
                data: currentContact,
                message: "Veriler Listelendi."
            });
        }
    } catch (err) {
        return res.status(400).send({
            message: err.toString()
        });
    }
};

exports.addContact = async (req, res) => {
    try {
        const currentContact = await Contact.find({ "saved":  req.user._id, phone: req.body.phone })
        // const currentContact = await Contact.find({ "saved":  req.user._id});
        if (currentContact && currentContact.length > 0) {
            return res.status(400).send({
                message: "Numara Kayıtlı!!!"
            });
        }
        else {
            console.log(req.body);
            try {
                const newUserContact = new Contact({
                    phone: req.body.phone,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    saved: req.user._id,
                });
                await newUserContact.save();
                let resUser = newUserContact;
                console.log(resUser);
                return await res.json(resUser);
            } catch (err) {
                return res.status(400).send({
                    message: err.toString()
                });
            }
        }
    } catch (err) {
        return res.status(400).send({
            message: err.toString()
        });
    }
};

exports.deleteContact = async (req, res) => {
    try {
        await Contact.deleteOne({ _id: req.body.id });
        return res.status(201).send({
            message: "Başarıyla Silindi."
        });
    } catch (err) {
        return res.status(400).send({
            message: err.toString()
        });
    }
};