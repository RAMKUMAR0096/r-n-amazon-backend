const User = require("../models/user");

async function addAddressController(req, res) {
    try {
        const { userId, address} = req.body;

        const user =await User.findById( userId)

        

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
                error: true
            })
        }

        if (!address) {
            return res.status(404).json({
                message: "please provide the address",
                success: false,
                error: true
            })
        }

        user.addresses.push(address);

        user.save();
        
        return res.status(201).json({
            message : "Address added successfully",
            success : true,
            error : false
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            success: false,
            error: true
        })
    }
}

module.exports = addAddressController;