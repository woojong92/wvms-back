const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcrypt');

const VacationCountSchema = new Schema({
    year: Number, // 해당 연도
    totalDate: Number, // 전체 연차 일 수
    usedDate: Number, // 사용한 연차 일 수
    etcDate: Number, // 연차 이외의 휴가( 공가, 생일 등 )
})

const MemberSchema = new Schema ({
    email: String,
    hashedPassword: String,
    name: String,
    nickname: String,
    role: String,
    team: String,
    authority: String,
    dateOfAntry: String, // 입사일
    thumbnail: { type: String, default: 'https://www.clipartmax.com/png/middle/96-961447_%5B-img%5D-we-bare-bears-profile.png'},
    vacationCounts: [VacationCountSchema],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

MemberSchema.methods.setPassword = async function (password) {
    const hash = await bcrypt.hash(password, 10);
    this.hashedPassword = hash;
}

MemberSchema.methods.checkPassword = async function (password) {
    const result = await bcrypt.compare(password, this.hashedPassword);
    return result;
}

MemberSchema.statics.findByEmail = function(email) {
    return this.findOne({email});
}

module.exports = mongoose.model('Member', MemberSchema);