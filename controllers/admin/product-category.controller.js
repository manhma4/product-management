const systemConfig = require("../../config/system");
const ProductCategory = require("../../models/product-category.model");
const filterStatusHelper = require("../../helper/filterStatus");
const createTreeHelper = require("../../helper/createTree");

// [GET] /admin/products-category
module.exports.index = async (req, res) => {
  // console.log(req.query)
  let find = {
    deleted: false,
  };
  const filterStatus = filterStatusHelper(req.query);
  // console.log(filterStatus)
  if (req.query.status) {
    find.status = req.query.status;
  }
  if (req.query.keyword) {
    const regex = new RegExp(req.query.keyword, "i");
    find.title = regex;
  }

  const records = await ProductCategory.find(find);

  const treeRecords = createTreeHelper.tree(records);

  res.render("admin/pages/product-category/index", {
    pageTitle: "Danh mục sản phẩm",
    records: treeRecords,
    filterStatus: filterStatus,
  });
};

// [GET] /admin/products-category/create
module.exports.create = async (req, res) => {
  let find = {
    deleted: false,
  };

  const records = await ProductCategory.find(find);
  const treeRecords = createTreeHelper.tree(records);

  res.render("admin/pages/product-category/create", {
    pageTitle: "Tạo danh mục sản phẩm",
    records: treeRecords,
  });
};

// [POST] /admin/products-category/create
module.exports.createPost = async (req, res) => {
  // console.log(req.body);
  if (req.body.position) {
    req.body.position = parseInt(req.body.position);
  } else {
    const productCategoryCount = await ProductCategory.countDocuments();
    req.body.position = productCategoryCount + 1;
  }
  const productCategory = new ProductCategory(req.body);
  await productCategory.save();
  req.flash("success", "Thêm thành công sản phẩm");
  res.redirect(`${systemConfig.prefixAdmin}/product-category`);
};
