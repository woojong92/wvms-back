const Post = require("../../models/post");
const mongoose = require('mongoose');
const Joi = require("joi");

const { isValidObjectId } = mongoose;

module.exports = {
    checkObjectId : async (req, res, next) => {
        const {id} = req.params;
        if(!isValidObjectId(id)) {
            return res.status(400).end(); // Bad Request
        }
        next();
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

    // list: async (req, res ) => {
    //     try {
    //         const posts = await Post.find().exec();
    //         return  res
    //             .status(200)
    //             .json(posts)
    //     } catch(err) {
    //         return res.status(500).json({error: err});
    //     }
    // }, 

    // read: async (req, res ) => {
    //     const { id } = req.params;
    //     try {
    //         const post = await Post.findById(id).exec();
    //         if(!post) {
    //             return res.status(404).end()      
    //         }else{
    //             return  res
    //             .status(200)
    //             .json(post)
    //         }
    //     } catch(err) {
    //         return res.status(500).json({error: err});
    //     }
    // }, 

    // remove: async (req, res ) => {
    //     const { id } = req.params;
    //     try{    
    //         await Post.findByIdAndRemove(id).exec();
    //         return res.status(204).end() // No Content (성공하였지만 응답할 데이터는 없음)
    //     }catch(err){
    //         return res.status(500).json({error: err});
    //     }
    // }, 

    // update: async (req, res ) => {
    //     const schema = Joi.object().keys({
    //         title: Joi.string(), //필수 항목은 required()
    //         body: Joi.string(),
    //         tags: Joi.array().items(Joi.string()) // 문자열로 이루어진 배열
    //     })

    //     const result = schema.validate(req.body);
    //     if(result.error) {
    //         return res.status(400).json(result.error);
    //     }

    //     const { id } = req.params;
    //     try{
    //         const post = await Post.findByIdAndUpdate(id, req.body, {
    //             new: true, // 이 값을 설정하면 업데이트 된 데이터를 반환
    //                     // false이면 업데이트 이전 데이터를 반환. 
    //         }).exec();
    //         if(!post) {
    //             return res.status(404).end();
    //         }
    //         return res
    //             .status(200)
    //             .json(post);
    //     }catch(err){
    //         return res.status(500).json({error: err});
    //     }   
    // }, 
}