const Order = require("../models/order");
const User = require("../models/user");


async function orderController(req, res) {
    try {
    const { userId, cartItems, totalPrice, shippingAddress, paymentMethod } =
      req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //create an array of product objects from the cart Items
    const products = cartItems.map((item) => ({
      name: item?.title,
      quantity: item.quantity,
      price: item.price,
      image: item?.image,
    }));

    //create a new Order
    const order = new Order({
      user: userId,
      product: products,
      totalPrice: totalPrice,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
    });



    await order.save();

    res.status(200).json({ message: "Order created successfully!" });
  } catch (error) {

    res.status(500).json({ message: "Error creating orders" });
  }
}

module.exports = orderController