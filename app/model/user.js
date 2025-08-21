const mongoose = require('mongoose')
const Schema = mongoose.Schema


const UserSchema=new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    image:{
        type:String,
        default:'image'
    },
    password:{
        type:String,
        required:true
    },
    is_verified:{
        type:Boolean,
        default:false
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
},
    {
        timestamps: true,
        versionKey: false
    })

    const UserModel=mongoose.model('user',UserSchema)  
    
    module.exports=UserModel
