const express = require("express");
const asyncify = require("express-asyncify");
const vacations = require('./vacations');
const members = require('./vacations')
const auth = require('./auth');

const api = asyncify(express.Router()); 

api.use("/test", (req, res) => { res.send('Hello World!'); } );
api.use("/auth", auth);
// api.use("/members", members);
// api.use("/vacations", vacations);

module.exports = api;