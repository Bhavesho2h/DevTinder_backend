const express = require('express');
const { adminAuth } = require('./middlewares/auth');
const app = express();

app.use('/admin',adminAuth)

app.use('/admin/Data',(req,res,next)=>{
    res.send('this is the data file');
})

app.use('/admin/profile',(req,res,next)=>{
    res.send('this is the admin profile');
})



app.listen(7777);
