const express = require('express');
const AuthEjsController = require('../controller/AuthEjsController');
const Auth = require('../middleware/AuthCheckForEjs');



const router=express.Router();



router.get('/signup', AuthEjsController.signup)
router.post('/signup/create', AuthEjsController.signupCreate)
router.get('/signin', AuthEjsController.signin)
router.post('/signin/create', AuthEjsController.signinCreate)
router.get('/user/dashboard', Auth,AuthEjsController.checkAuth,AuthEjsController.userdashboard)
router.get('/logout', AuthEjsController.logout)



module.exports=router;