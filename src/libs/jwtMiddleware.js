const express = require("express");
const jwt = require('jsonwebtoken');
// export const JWT_SECRET = 'a7eebf12dcf772213ddfc2d95b151f773e483c905a59a4c0362b7b527cca84bc3118607c1d4781da4188863014d9a4c7e29d67d2db81fef804c8f0fca1980fcb'

function jwtMiddleware (req, res, next) {
        console.log('jwtMiddleware');
        // const token = req.get('Authorization').split('Bearer ')[1];
        // const token = req.cookies.access_token;
        const authorization = req.get('Authorization');
        console.log('Authorization',authorization );
        if(!authorization) return next();
        
        const token = authorization.split('Bearer ')[1];
        console.log('token',token );
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded);

            res.locals.member = {
                _id: decoded._id,
                email: decoded.email,
                authority: decoded.authority,
                name: decoded.name,
                nickname: decoded.nickname,
                role: decoded.role,
                thumbnail: decoded.thumbnail,
            }
            next();
        }catch(e){
            next();
        }
}

module.exports = jwtMiddleware;