const express= require('express')
const app=express()
const port = 5000
const {User} = require("./models/User")
const bodyParser = require('body-parser')
const config = require('./config/key')
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect(
   config.mongoURI,{
        useNewUrlParser:true, useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false
    }).then(()=>console.log('몽고디비 잘 연결됐습니당'))
    .catch(err=>console.log(err))

app.get('/',(req,res) => res.send('Hello World 안녕하세용'))
app.post('/register',(req, res) => {
    //회원가입시 필요한 정보들을 client에서 가져오면
    // 데이터베이스에 넣어준다.

    const user = new User(req.body)
    user.save((err, userInfo)=>{
        if(err) return res.json({success:false, err})
        return res.status(200).json({
            success:true
        })
    })
}) 

app.listen(port,()=>console.log('잘 듣고 있어요'))