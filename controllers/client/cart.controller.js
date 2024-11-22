const Cart = require("../../models/cart.model");
// [POST] /cart/add/:productId
module.exports.addPost = async (req, res) => {
  const cartId = req.cookies.cartId;
  const productId = req.params.productId;
  const quantity = parseInt(req.body.quantity);
  const cart = await Cart.findOne({
    _id: cartId,
  });
  // console.log(cart)
  // console.log(cart.products)
  const existProductInCart = cart.products.find(
    (item) => item.product_id == productId
  );
  // console.log(existProductInCart)
  if (existProductInCart) {
    const newQuantity = quantity + existProductInCart.quantity;
    console.log(newQuantity);
    await Cart.updateOne(
      {
        _id: cartId,
        "products.product_id": productId,
      },
      {
        "products.$.quantity": newQuantity,
      }
    );
  } else {
    const objectCart = {
      product_id: productId,
      quantity: quantity,
    };
    // console.log(cartId);
    // console.log(productId);
    // console.log(quantity);
    await Cart.updateOne(
      {
        _id: cartId,
      },
      {
        $push: {
          products: objectCart,
        },
      }
    );
  }
  req.flash("success", "Thêm sản phẩm vào giỏ hàng thành công");
  res.redirect("back");
};
