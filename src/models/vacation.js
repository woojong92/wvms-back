const mongoose = require('mongoose');
const {Schema} = mongoose;

const Vacation = new Schema ({
    vacationType: String,
    timeType: String, // 4h, 8h
    startDate: Date,
    endDate: Date,
    reason: String,
    isApproved: {
        type: Boolean,
        default: false,
    },
    usedDate: Number,
    member: {
        _id: mongoose.Types.ObjectId,
        name: String,
        nickname: String,
        role: String,
        thumbnail: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Vacation', Vacation);