const mongoose = require('mongoose');
const Joi = require("joi");
const Member = require("../../models/member");

const { isValidObjectId } = mongoose;

module.exports = {
    checkObjectId : async (req, res, next) => {
        const {id} = req.params;
        if(!isValidObjectId(id)) {
            return res.status(400).end(); // Bad Request
        }
        next();
    },

    register: async (req, res) => {
        // 회원가입
        // request body 검증

        const { email, password, name, nickname, role, authority, dateOfAntry, vacationCounts} = req.body;
        try{
            // 이메일이 존재하는 지 확인
            const exists = await Member.findByEmail(email);
            if(exists) {
                return res.status(409).end();
            }

            const member = new Member({
                email,
                name, 
                nickname, 
                role,
                authority,
                dateOfAntry,
                vacationCounts
            })
            await member.setPassword(password); // 비밀번호 설정
            
            await member.save()

            // 응답할 데이터에서 hashedPassword 필드 제거
            // const data = member.toJSON();
            // delete data.hashedPassword;

            const profile = member.toJSON();
            delete profile.hashedPassword;

            const token = await member.generateToken();

            res
                .status(200)
                .json({token, profile})
                .send()

        }catch(e){
            return res.status(500, e);
        }
    },

    login: async (req, res) => {
        // 로그인
        const { email, password } = req.body;

        if( !email || !password ) {
            return res.status(400).end();
        }

        try{
            const member = await Member.findByEmail(email);
            if(!member) {
                return res.status(401).end();
            }

            const valid = await member.checkPassword(password);
            if(!valid) {
                return res.status(401).end();
            }

            const profile = member.toJSON();
            delete profile.hashedPassword;

            const token = await member.generateToken();
            console.log(token);
            res
                .status(200)
                // .cookie('access_token', token, {
                //     maxAge: 1000*60*60*24*7, // 7일
                //     httpOnly: true,
                // })
                .json({token, profile})
                .send()
        }catch(e){
        
        }
    },

    check: async (req, res) => {
        // 로그인 상태 확인
        const { member } = res.locals;
        if(!member) {
            return res.status(401).end() 
        }

        delete member.authority;
        return res.status(200).json(member);
    },

    profile: async (req, res) => {
        // 로그인 상태 확인
        const { member } = res.locals;
        if(!member) {
            return res.status(401).end() 
        }

        // const profile = Member.findById(member._id).exec();

        try{
            const profile = await Member.findByEmail(member.email);
            if(!profile) {
                return res.status(401).end();
            }

            delete profile.hashedPassword;

            return res.status(200).json(profile);
        }catch(e){
            return res.status(500, e);
        }
    },

    // profile: async (req, res) => {
    //     // 로그인 상태 확인
    //     const { member } = res.locals;
    //     if(!member) {
    //         return res.status(401).end() 
    //     }

    //     delete member.authority;
    //     return res.status(200).json(member);
    // },

    logout: async (req, res) => {
        // 로그아웃
    },



    // register: async (req, res ) => {
    //     const schema = Joi.object().keys({
    //         email: Joi.string().required(), //필수 항목은 required()
    //         body: Joi.string().required(),
    //         tags: Joi.array().items(Joi.string()).required() // 문자열로 이루어진 배열
    //     })

    //     const result = schema.validate(req.body);
    //     if(result.error) {
    //         return res.status(400).json(result.error);
    //     }

    //     const {title, body, tags } = req.body;
    //     const post = new Post({
    //         title,
    //         body,
    //         tags,
    //     });
    //     try {
    //         await post.save();
    //         return res
    //             .status(200)
    //             .json(post);
    //     } catch(err) {
    //         return res.status(500).json({error: err});
    //     }
    // }, 

}