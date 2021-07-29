const express = require("express");
const asyncify = require("express-asyncify");
const vacationsCtrl = require("./vacations.ctrl");

const checkLoggedIn = require('../../libs/checkLoggedIn');

const vacations = asyncify(express.Router()); 

vacations.get('/', vacationsCtrl.list); 
vacations.post('/',  vacationsCtrl.create);
vacations.delete('/:id',  vacationsCtrl.checkObjectId, vacationsCtrl.remove);

// members.delete("/:id", membersCtrl.checkObjectId, postsCtrl.remove); // 직원 삭제
// vacations.get('/check', vacationsCtrl.hasEvent);

// vacations.get('/:id', postsCtrl.checkObjectId, vacationsCtrl.read);
// vacations.delete('/:id', checkLoggedIn, postsCtrl.checkObjectId, vacationsCtrl.remove);
// vacations.patch('/:id', checkLoggedIn, postsCtrl.checkObjectId, vacationsCtrl.update);



// vacations.get("/", postsCtrl.list); // 전체 휴가 리스트 가져오기

// vacations.get("/:id", postsCtrl.checkObjectId, postsCtrl.read); // id에 해당하는 휴가 상세
// vacations.delete("/:id", postsCtrl.checkObjectId, postsCtrl.remove); // 휴가 취소
// vacations.patch("/:id", postsCtrl.checkObjectId, postsCtrl.update); // 휴가 수정

// 특정 날짜/기간에 해당하는 휴가 리스트 가져오는 api
/** 
 * Get /api/vacations?startDate=&endDate=
 */


// 휴가 승인하기
// vacations.post("/", postsCtrl.write); // 휴가 신청하기

// 특정 멤버의 휴가 리스트 가져오기


// 휴가 반려 되었을 경우, 삭제 또는 수정해야 반영 


// 특정 날짜 휴가 리스트 가져오기





module.exports = vacations;