const express = require("express");
const jwt = require('jsonwebtoken');

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