const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name: {
        type:String,
        maxlength:50
    },
    email:{
        type:String,
        trim:true, //빈칸을 없애주는 역할 ex) hye vvy@naver.com => hevvy@naver.com
        unique:1
    },
    lastname:{
        type:String,
        maxlength:50
    },
    role:{
        type:Number,
        default:0,
    },
    image:String,
    token: {
        type:String
    } ,
    tokenExp:{
        type:Number
    }
})

const User = mongoose.model('User',userSchema)// 모델을 스키마로 감싼다.
module.exports = {User}//다른 곳에서도 쓸 수 있게 