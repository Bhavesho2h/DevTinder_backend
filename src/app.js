const express = require('express');
const app = express();

app.get('/users', (req, res) => {
    res.status(201).send({ message: 'Hello Bhavesh' })

})
///playing with advance routes
app.get('/ab+c',(req, res)=>{
    res.status(200).send({message: "advanced Routing"})
})
app.get('/ab?c',(req, res)=>{
    res.status(200).send({message: "advanced Routing"})
})
app.get('/ab*c',(req, res)=>{
    res.status(200).send({message: "advanced Routing next level"})
})

app.get(/a/,(req,res)=> {
    res.status(200).send({message : "regex done"})
})



app.use('/test', (req, res) => {
    res.send('this is foor the testt file')
})

app.use('/hello', (req, res) => {
    res.send('hello from the server');
})

app.use('/', (req, res) => {
    res.send('this is the first file');
})


app.listen(7777);
