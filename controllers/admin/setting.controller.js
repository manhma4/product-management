const SettingGeneral = require("../../models/setting-general.model");

// [GET] /settings/general
module.exports.general = async (req, res) => {
  const settingGeneral = await SettingGeneral.findOne({});
  // console.log(settingGeneral)
  res.render("admin/pages/settings/general.pug", {
    pageTitle: "Cài đặt chung",
    settingGeneral: settingGeneral,
  });
};

// [PATCH] /settings/general
module.exports.generalPatch = async (req, res) => {
  // console.log(req.body)
  const settingGeneral = await SettingGeneral.findOne({});
  if (!settingGeneral) {
    const record = new SettingGeneral(req.body);
    await record.save();
  } else {
    await SettingGeneral.updateOne({}, req.body);
  }
  req.flash("success", "Cập nhật cài đặt thành công");
  res.redirect("back");
};
