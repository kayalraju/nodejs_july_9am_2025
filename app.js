require('dotenv').config();
const express=require('express');
const ejs=require('ejs');
const DbConnection=require('./app/config/dbCon')
const cookieParser=require('cookie-parser');
const session=require('express-session');
const flash=require('connect-flash');


const app=express();

DbConnection();


//setup middleware
app.use(cookieParser());
app.use(session({
    secret: 'keyboardcatdddddd',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: 1000 * 60 * 60 * 24 // 24 hours
     }
  }))
app.use(flash());


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

//auth for ejs
const authEjsRoute=require("./app/router/AuthEjsRouter");
app.use(authEjsRoute);

const PORT=process.env.PORT || 3002;
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})