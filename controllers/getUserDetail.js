const User = require('../models/order')

async function getUserDetailController(req,res){
    try {
        const {userId} =req.body;

        const user = await User.findById(userId);
        if (!user) {
            return response.status(400).json({
                message: "User not found",
                error: true,
                success: false
            })
        }

        res.status(201).json({
            message : "user details",
            data : user,
            success : true,
            error : false
        })

    } catch (error) {
        res.status(500).json({
            message : error.message || error,
            success : false,
            error : true
        })
    }
}

module.exports = getUserDetailController