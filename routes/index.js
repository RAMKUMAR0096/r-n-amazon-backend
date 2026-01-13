const express = require('express');
const  verifyEmail  = require('../controllers/verifyEmail');
const registerCountroller = require('../controllers/register');
const loginController = require('../controllers/login');
const  addAddressController = require('../controllers/addAddress');
const getAllAddressController = require('../controllers/getAllAddress');
const orderController = require('../controllers/order');
const getUserDetailController = require('../controllers/getUserDetail');

const router = express.Router();

router.post('/register',registerCountroller)
router.get('/verify/:token',verifyEmail)
router.post('/login',loginController)
router.post('/add-address',addAddressController)
router.get('/get-all-address/:userId',getAllAddressController)
router.post('/orders',orderController)
router.get('/profile',getUserDetailController)



module.exports = router;