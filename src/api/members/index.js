const express = require("express");
const asyncify = require("express-asyncify");
const membersCtrl = require("./members.ctrl");

const members = asyncify(express.Router()); 


members.get("/", (req,res) => res.send('hello')); // 전체 직원 리스트 가져오기
members.post("/", (req,res) => res.send('hello')); // 직원 등록하기
members.get("/:id", membersCtrl.checkObjectId, postsCtrl.read); // id에 해당하는 직원 정보 가져오기
members.delete("/:id", membersCtrl.checkObjectId, postsCtrl.remove); // 직원 삭제
members.patch("/:id", membersCtrl.checkObjectId, postsCtrl.update); // 직원 정보 수정

module.exports = members;