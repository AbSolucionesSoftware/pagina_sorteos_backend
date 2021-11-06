const bannerCtrlAdmin = {};
const uploadImagen = require('../middlewares/awsFile');
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
      const newBanner = new modelBannerAdmin(req.body);
      if(req.file){
        newBanner.imgBannerAdminKey = req.file.key;
        newBanner.imgBannerAdminUrl = req.file.location;
        await newBanner.save();
        res.status(200).json({message: "Banner agregado."});
      }else{
        res.status(404).json({message: "Imagen necesaria."});
      }
  } catch (error) {
      res.status(500).json({message: "Error del servidor"}, error);
  }
}

bannerCtrlAdmin.editBanner = async (req,res) => {
  try {
      
  } catch (error) {

  }
}

bannerCtrlAdmin.deleteBaneer = async (req,res) => {
  try {
      const bannerDelete = await modelBannerAdmin.findById(req.params.idBanner);
        if(bannerDelete){
          if(bannerDelete.imgBannerAdminKey){
            uploadImagen.eliminarImagen(bannerDelete.imgBannerAdminKey);
          }
          await modelBannerAdmin.findByIdAndDelete(bannerDelete._id);
          res.status(200).json({message: "Banner eliminado."});
        }else{
          res.status(404).json({message: "Este banner no existe."});
        }
  } catch (error) {

  }
}

bannerCtrlAdmin.getBanner = async (req,res) => {
  try {
    const bannersComapny = await modelBannerAdmin.find();
    res.status(200).json({bannersComapny});
  } catch (error) {

  }
}

module.exports = bannerCtrlAdmin;
