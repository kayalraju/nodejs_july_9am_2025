const express = require('express');
const AuthController = require('../controller/AuthController');
const AuthCheck = require('../middleware/AuthCheck');


const router=express.Router();



router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.get('/dashboard',AuthCheck, AuthController.dashboard)





module.exports=router;