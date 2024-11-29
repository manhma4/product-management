const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");
const productHelper = require("../../helper/product");
const Order = require("../../models/order.model");

// [GET] /checkout/
module.exports.index = async (req, res) => {
  const cartId = req.cookies.cartId;
  const cart = await Cart.findOne({
    _id: cartId,
  });
  // console.log(cart)
  if (cart.products.length > 0) {
    let totalCartPrice = 0;
    for (const product of cart.products) {
      const productId = product.product_id;
      let productInfo = await Product.findOne({
        _id: productId,
      });
      productInfo.priceNew = productHelper.getNewPriceOne(
        productInfo.price,
        productInfo.discountPercentage
      );
      // console.log(productInfo)
      product.productInfo = productInfo;
      product.totalPrice = productInfo.priceNew * product.quantity;
      // console.log(typeof(productInfo))
      totalCartPrice += product.totalPrice;
    }
    cart.totalCartPrice = totalCartPrice;
  }
  res.render("client/pages/checkout/index.pug", {
    pageTitle: "Đặt hàng",
    cart: cart,
  });
};
