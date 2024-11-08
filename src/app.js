const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/user');
const app = express();

app.use(express.json());
connectDB().then(() => {
    console.log('connection successfully established');
    app.listen(7777, () => {
        console.log('connnection to server established');
    })
})
    .catch((err) => {
        throw new Error(err, 'coming here');
    })

app.post('/signup', async (req, res) => {
    console.log(req.body,'what is here');
    const user = new User(req.body);
try{    
        await user.save()
        res.send('User Added Successfully')
     }
     catch(err) {
        res.send('Unable to add User');
     }
   
})


app.get('/user', async(req, res)=>{
    const {emailId} = req.body;
    console.log(emailId);
    try{
        const userDetails = await User.findOne({emailId:emailId})
        res.status(200).send({
            userDetails
        })
    }
    catch(err){
        throw new Error(err);
    }
})

app.get('/feed', async(req, res)=> {
    try{
        const feeddetails = await User.find();
        res.status(200).send({
            feeddetails
        })
    }
    catch(err){
        throw new Error(err);
    }
})

app.put('/update', async(req, res)=> {
    const {firstName,userId} = req.body;
    const id = "672c2e120f7483b165295ef5"

    try{
        const updateUser = await User.findByIdAndUpdate(id,{firstName:firstName});
        res.status(200).send({
            message: 'Details Updated Successfully'
        })
        
    }
    catch(err){
        throw new Error(err);
    }
})







