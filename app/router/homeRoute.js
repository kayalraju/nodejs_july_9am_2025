const express = require('express');
const HomeController = require('../controller/HomeController');

const router=express.Router();



router.get('/',HomeController.index)
router.get('/about',HomeController.about)
router.get('/product',HomeController.product)




module.exports=router;