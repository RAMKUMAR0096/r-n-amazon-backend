const Order = require('../models/order');
const User = require('../models/order')

async function orderController(req, res) {
    try {
        const { userId, cartItems, totalPrice, shippingAddress, paymentMethod } = req.body;

        const user = await User.findById(userId)

        if (!user) {
            return response.status(400).json({
                message: "User not found",
                error: true,
                success: false
            })
        }

        const products = cartItems.map((item) => (
            {
                name: item?.title,
                quantity: item?.quantity,
                price: item?.price,
                image: item?.image
            }
        ))

        const order  = new Order({
            userId: userId,
            products : products,
            totalPrice : totalPrice,
            shippingAddress :shippingAddress,
            paymentMethod : paymentMethod
        })

        await order.save()

        console.log("order",order);

        res.status(200).json({
            data : order,
            message : "order created successfully",
            success :true,
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

module.exports = orderController