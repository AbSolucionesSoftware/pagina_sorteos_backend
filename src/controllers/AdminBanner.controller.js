const bannerCtrlAdmin = {};
const uploadImagen = require('../middleware/awsFile');
const modelBannerAdmin = require('../models/AdminBanner');

bannerCtrlAdmin.uploadImagen = (req, res, next) => {
    uploadImagen.upload(req, res, function (err) {
      if (err) {
        res.status(500).json({ message: err });
      }
      return next();
    });
};

bannerCtrlAdmin.createBanner = async (req, res) => {
  try {
      
  } catch (error) {

  }
}

bannerCtrlAdmin.editBanner = async (req,res) => {
  try {
      
  } catch (error) {

  }
}

bannerCtrlAdmin.deleteBaneer = async (req,res) => {
  try {
      
  } catch (error) {

  }
}

bannerCtrlAdmin.getBanner = async (req,res) => {
  try {
      
  } catch (error) {

  }
}

module.exports = bannerCtrlAdmin;
