require('dotenv').config();
const express=require('express');
const ejs=require('ejs');
const DbConnection=require('./app/config/dbCon')


const app=express();

DbConnection();

//get data form body

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//setup ejs
app.set('view engine','ejs');
app.set('views','views')




const homeRoute=require("./app/router/homeRoute");
app.use(homeRoute);

const authRoute=require("./app/router/AuthRouter");
app.use('/auth',authRoute);

const PORT=process.env.PORT || 3002;
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})