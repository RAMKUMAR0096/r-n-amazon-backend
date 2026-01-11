const User = require("../models/user");

async function getAllAddressController(req, res) {
    try {
        const userId = req?.params?.userId;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
                error: true
            })
        }

        const address = user.addresses;

        return res.status(200).json({
            data : address,
            message : "All address of the user",
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

module.exports = getAllAddressController;