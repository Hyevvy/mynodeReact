const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken');


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

userSchema.pre('save', function(next){
    //비밀번호를 암호화시킨다.
    var user = this;

    if(user.isModified('password')) {
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err);
            bcrypt.hash(user.password,salt,function(err, hash){
                if(err) return next(err);
                user.password = hash; //hash :암호화된 비밀번호 
                next()
            } )    
        })
    } else {
        next()
    }
})

userSchema.methods.comparePassword = function(plainPassword, cb){
    //plainPassword 1234567  암호화된 비밀번호 둘이 같은지 체크해야함.
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err),
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb){
    var user = this;

    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    user.token = token

    user.save(function(err, user){
        if(err) return cb(err);
        cb(null, user);
    })
    //   user._id + 'secretToken' = token
}

userSchema.statics.findByToken = function(token, cb){
    var user = this;
    //user._id + '' = token;
    //토큰을 decode한다.
    jwt.verify(token,'secretToken',function(err, decoded){
        //유저 아이디를 이용해서 유저를 찾은 다음에 
        //클라이언트에서 가져온 토큰과 DB에 보관된 토큰이 일치하는지 확인
        user.findOnd({"_id": decoded, "token": token}, function(err, user){
            if(err) return cb(err);
            cb(null,user);
        })
    })

}


const User = mongoose.model('User',userSchema)// 모델을 스키마로 감싼다.
module.exports = {User}//다른 곳에서도 쓸 수 있게 