const User = require('../models/user')

async function verifyEmail(req,res) {
    const token = req?.params?.token


    const verifyUser =await User.findOne({verificationToken : token})

    if(!verifyUser){
        return res.status(400).json({
            message : "Invalid verification Token",
            success : false,
            error : true
        })
    }

    verifyUser.verified = true;
    verifyUser.verificationToken = undefined;

    await  verifyUser.save();

    return res.status(200).json({
        message : "Email verified successfully",
        success : true,
        error : false
    })
}

module.exports = verifyEmail