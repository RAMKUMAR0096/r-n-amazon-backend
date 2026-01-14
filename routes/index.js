const express = require('express');
const  verifyEmail  = require('../controllers/verifyEmail');
const registerCountroller = require('../controllers/register');
const loginController = require('../controllers/login');
const  addAddressController = require('../controllers/addAddress');
const getAllAddressController = require('../controllers/getAllAddress');
const orderController = require('../controllers/order');
const getUserDetailController = require('../controllers/getUserDetail');
const getOrderController = require('../controllers/getOrder');

const router = express.Router();

router.post('/register',registerCountroller)
router.get('/verify/:token',verifyEmail)
router.post('/login',loginController)
router.post('/add-address',addAddressController)
router.get('/get-all-address/:userId',getAllAddressController)
router.post('/orders',orderController)
router.get('/profile/:userId',getUserDetailController)
router.get('/order/:userId',getOrderController)



module.exports = router;