const SettingGeneral = require("../../models/setting-general.model");

module.exports.settingGeneral = async (req, res, next) => {
  const settingGeneral = await SettingGeneral.findOne({});
  // console.log(settingGeneral)
  res.locals.settingGeneral = settingGeneral;
  next();
};
