const Role = require("../../models/role.model");
const systemConfig = require("../../config/system");

// [GET] /admin/roles
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };
  const records = await Role.find(find);
  res.render("admin/pages/roles/index.pug", {
    pageTitle: "Nhóm quyền",
    records: records,
  });
};

// [GET] /admin/create
module.exports.create = async (req, res) => {
  res.render("admin/pages/roles/create.pug", {
    pageTitle: "Tạo nhóm quyền",
  });
};

// [POST] /admin/create
module.exports.createPost = async (req, res) => {
  console.log(req.body);
  const role = new Role(req.body);
  role.save();
  req.flash("success", "Thêm thành công nhóm quyền"); // Tẹo thêm thông báo
  res.redirect(`${systemConfig.prefixAdmin}/roles`);
};

// [GET] /admin/roles/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;

    let find = {
      _id: id,
      deleted: false,
    };
    const record = await Role.findOne(find);
    res.render("admin/pages/roles/edit.pug", {
      pageTitle: "Chỉnh sửa nhóm quyền",
      record: record,
    });
  } catch (error) {
    redirect(`${systemConfig.prefixAdmin}/roles`);
  }
};

// [PATCH] /admin/roles/edit/:id
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;
  const record = await Role.updateOne(
    {
      _id: id,
    },
    req.body
  );

  req.flash("success", "Cập nhập nhóm quyền thành công");

  res.redirect("back");
};
