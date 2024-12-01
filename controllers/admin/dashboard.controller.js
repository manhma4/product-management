const ProductCategory = require("../../models/product-category.model");
const Product = require("../../models/product.model");
const User = require("../../models/user.model");
const Account = require("../../models/account.model");

// [GET] /admin/dashboard
module.exports.dashboard = async (req, res) => {
  const statistic = {
    productCategory: {
      total: 0,
      active: 0,
      inactive: 0,
    },
    product: {
      total: 0,
      active: 0,
      inactive: 0,
    },
    adminAccount: {
      total: 0,
      active: 0,
      inactive: 0,
    },
    clientAccount: {
      total: 0,
      active: 0,
      inactive: 0,
    },
  };

  statistic.productCategory.total = await ProductCategory.countDocuments({
    deleted: false,
  });
  statistic.productCategory.active = await ProductCategory.countDocuments({
    status: "active",
    deleted: false,
  });
  statistic.productCategory.inactive = await ProductCategory.countDocuments({
    status: "inactive",
    deleted: false,
  });
  statistic.product.total = await Product.countDocuments({
    deleted: false,
  });
  statistic.product.active = await Product.countDocuments({
    status: "active",
    deleted: false,
  });
  statistic.product.inactive = await Product.countDocuments({
    status: "inactive",
    deleted: false,
  });
  statistic.adminAccount.total = await Account.countDocuments({
    deleted: false,
  });
  statistic.adminAccount.active = await Account.countDocuments({
    status: "active",
    deleted: false,
  });
  statistic.adminAccount.inactive = await Account.countDocuments({
    status: "inactive",
    deleted: false,
  });
  statistic.clientAccount.total = await User.countDocuments({
    deleted: false,
  });
  statistic.clientAccount.active = await User.countDocuments({
    status: "active",
    deleted: false,
  });
  statistic.clientAccount.inactive = await User.countDocuments({
    status: "inactive",
    deleted: false,
  });

  res.render("admin/pages/dashboard/index", {
    pageTitle: "Trang tổng quan",
    statistic: statistic,
  });
};
