const mongoose = require('mongoose');
const Joi = require("joi");
const Vacation = require("../../models/vacation");
const Member = require('../../models/member');

const { isValidObjectId } = mongoose;

module.exports = {
    checkObjectId : async (req, res, next) => {
        const {id} = req.params;
        if(!isValidObjectId(id)) {
            return res.status(400).end(); // Bad Request
        }
        next();
    },

    // api/vacations?memberId=&startDate=&endDate=
    list: async (req, res) => {
        const {  id, memberId, date, from, to} = req.query;
        // db.posts.find({created_on: {$gte: start, $lt: end}});
        const query = {
            ...(id ? {'_id': id} : {} ),
            ...(memberId ? {'member._id': memberId} : {} ),
            ...(date ? {'startDate' : { $lt : date } } : {}),
            ...(date ? {'endDate': { $gte : date } } : {}),
            ...(from ? {'startDate' : { $lt : to } } : {}),
            ...(to ? {'endDate': { $gte : from } } : {}),
        }

        try{
            const vacations = await Vacation.find(query).sort( { "startDate": 1} ).exec();
            return res
                .status(200)
                .json(vacations);
        
        }catch(e){
            return res.status(500, e);
        }
    },

    create: async (req, res) => {
        const { vacationType, timeType, startDate, endDate, reason, usedDate } = req.body;

        const vacation = new Vacation({
            vacationType,
            timeType,
            startDate,
            endDate,
            reason,
            usedDate,
            member: {
                _id: res.locals.member._id,
                name: res.locals.member.name,
                nickname: res.locals.member.nickname,
                role: res.locals.member.role,
                thumbnail: res.locals.member.thumbnail,
            }
        })
    
        if(vacationType === '연차'){
            // 휴가 신청 시, 휴가 사용 일 수 정
            Member.findById(res.locals.member._id).then(item => {
                const index = item.vacationCounts.map(item => item.year).indexOf(2021);
                item.vacationCounts[index].usedDate += usedDate ;
                item.save();
            })
        }

        try{
            await vacation.save();
            return res.status(200).json(vacation)
        }catch(e){
            return res.status(500).end();
        }
    },

        // remove: async (req, res ) => {
    //     const { id } = req.params;
    //     try{    
    //         await Post.findByIdAndRemove(id).exec();
    //         return res.status(204).end() // No Content (성공하였지만 응답할 데이터는 없음)
    //     }catch(err){
    //         return res.status(500).json({error: err});
    //     }
    // }, 

    remove: async (req, res) => {
        const { id } = req.params;

        // Vacation.findById(id)
        const vacation = await Vacation.findById(id).exec();

        // // 휴가 신청 시, 휴가 사용 일 수 정
        Member.findById(res.locals.member._id).then(item => {
            const index = item.vacationCounts.map(item => item.year).indexOf(2021);
            item.vacationCounts[index].usedDate -= vacation.usedDate ;
            item.save();
        })

        try{

            await Vacation.findByIdAndRemove(id).exec()
            // await vacation.save();
            return res.status(204).end();
        }catch(e){
            return res.status(500).end();
        }
    },

    hasEvent: async (req,res) => {
        const {date} = req.query;
        try{
            const vacation = await Vacation.findOne({ 'startDate': { $lt : date }, 'endDate': {$gte : date}});
            if(!vacation){
                return res
                        .status(200)
                        .json({result: false})
            }else{
                return res
                        .status(200)
                        .json({result: true})
            }
        
        }catch(e){
            return res.status(500, e);
        }
    }

    // 승인 허가


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