const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength:4,
        maxLength:50
    },
    lastName: {
        type: String
    },
    age: {
        type: String, 
        required:true,
        min:18
    },
    gender: {
        type: String,
        required:true,
        validate: {
            validator: (value)=>{
                return value === 'male' || value === 'female' || value === 'others';
            },
            message: 'Gender is not valid'

        }
    
    },
    about: {
        type: String,
        default: 'this is my profile'
    },
    skills: {
        type:[String]
    },
    password: {
        type: String
    },
    
    emailId: {
        type: String,
        unique: true,
        required:true,
        lowercase: true,
        trim: true

    }
},{
    timestamps: true
}
)

const User = mongoose.model('User', userSchema);


module.exports = User;