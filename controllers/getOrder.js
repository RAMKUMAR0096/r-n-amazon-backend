const Order = require("../models/order");
const User = require("../models/user");

async function getOrderController (req,res){
    try {
        const userId = req.params.userId;


        const orders = await Order.find({user:userId}).populate("user");

        if(!orders || orders.length ==0){
            res.status(404).json({
                message : "no order found",
                success : false,
                error : true
            })
        }

        res.status(201).json({
            message : "Order details",
            data : orders,
            success : true,
            error : false
        })

    } catch (error) {
          res.status(500).json({
            message: error || error.message || "server error",
            success: false,
            error: true
        })
    }
}

module.exports = getOrderController