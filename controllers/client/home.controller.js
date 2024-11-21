const Product = require("../../models/product.model");
const productHelper = require("../../helper/product");

// [GET] /
module.exports.index = async (req, res) => {
  // Lấy sản phẩm nổi bật
  const productFeatured = await Product.find({
    featured: "1",
    deleted: false,
    status: "active",
  }).limit(6);
  const newProductsFeatured = productHelper.getNewPrice(productFeatured);
  //End lấy sản phẩm nổi bật

  //Lấy sản phẩm mới nhất
  const productNew = await Product.find({
    deleted: false,
    status: "active",
  })
    .sort({ position: "desc" })
    .limit(6);
  const newProductNew = productHelper.getNewPrice(productNew);
  //End lấy sản phẩm mới nhất

  res.render("client/pages/home/index", {
    pageTitle: "Trang chủ",
    productFeatured: newProductsFeatured,
    productNew: newProductNew,
  });
};
