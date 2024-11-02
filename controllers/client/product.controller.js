const Product = require("../../models/products.model");

// [GET] /products
module.exports.index = async (req, res) => {
  const products = await Product.find({
    status: "active",
    deleted: false,
  });

  const newProducts = products.map((item) => {
    item.priceNew = (
      (item.price * (100 - item.discountPercentage)) /
      100
    ).toFixed(0);
    return item;
  });
  console.log(newProducts);

  res.render("client/pages/products/index", {
    pageTitle: "Trang danh sach san pham",
    products: newProducts,
  });
};
