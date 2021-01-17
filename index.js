const mongoose = require('mongoose')
mongoose.connect(
    'mongodb+srv://hyevvy:asdf1234@cluster0.vpsr6.mongodb.net/<dbname>?retryWrites=true&w=majority',{
        useNewUrlParser:true, useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false
    }).then(()=>console.log('몽고디비 잘 연결됐습니당'))
    .catch(err=>console.log(err))