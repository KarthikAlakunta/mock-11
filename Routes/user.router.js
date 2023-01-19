require("dotenv").config();
const User = require("../Models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const express = require("express");
const server = express.Router();
const secret = process.env.JWT_SECRET || "MOCK-11";
server.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    let user = await User.create({ name, email, password: hash });
    return res.status(201).json({ message: "201 User created Successfully"});
  } catch (e) {
    return res.status(404).json({ message: e.message });
  }
});

server.post("/signin", async (req, res) => {
  let { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      let token = jwt.sign({name:user.name,email:user.email},secret,{ expiresIn: "7 days" });
      return res.status(200).json({ message: "200 success", data: token });
    }
    return res.status(404).json({ message: "please enter correct password or email" });
  } catch (e) {
    return res.status(404).json({ message: e.message });
  }
});
module.exports = server;
