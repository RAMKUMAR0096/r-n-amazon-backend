const express = require('express');
const  verifyEmail  = require('../controllers/verifyEmail');
const registerCountroller = require('../controllers/register');
const loginController = require('../controllers/login');
const  addAddressController = require('../controllers/addAddress');
const getAllAddressController = require('../controllers/getAllAddress');

const router = express.Router();

router.post('/register',registerCountroller)
router.get('/verify/:token',verifyEmail)
router.post('/login',loginController)
router.post('/add-address',addAddressController)
router.get('/get-all-address/:userId',getAllAddressController)



module.exports = router;