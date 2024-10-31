module.exports.index = (req, res) => {
  res.render("client/pages/products/index", {
    pageTitle: "Trang danh sach san pham",
  });
};

module.exports.create = (req, res) => {
  res.render("client/pages/products/index");
};

module.exports.delete = (req, res) => {
  res.render("client/pages/products/index");
};
