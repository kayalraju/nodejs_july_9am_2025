require('dotenv').config()
const mongoose=require('mongoose')


const DatabaseConnection=async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Database connected successfully")
    } catch (error) {
        console.log("Database connection failed")
    }
}

module.exports=DatabaseConnection