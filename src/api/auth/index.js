const express = require("express");
const asyncify = require("express-asyncify");
const authCtrl = require("./auth.ctrl");

const auth = asyncify(express.Router()); 

auth.post("/register", authCtrl.register);
auth.post("/login", authCtrl.login);
auth.get("/check", authCtrl.check);
auth.post("/logout", authCtrl.logout);

module.exports = auth;