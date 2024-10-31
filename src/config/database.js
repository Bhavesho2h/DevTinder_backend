// 

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://NamasteDev:Admin%40321@cluster0.7y9bw.mongodb.net/devTinder')
    }
    catch (err) {
        throw new Error(err);
    }
}

module.exports =  connectDB ;
