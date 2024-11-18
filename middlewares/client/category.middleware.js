const ProductCategory = require("../../models/product-category.model");
const createTreeHelper = require("../../helper/createTree");

module.exports.category = async (req, res, next) => {
  const productCategories = await ProductCategory.find({
    deleted: false,
  });
  const treeProductCategories = createTreeHelper.tree(productCategories);
  res.locals.layoutProductCategories = treeProductCategories;
  next();
};
