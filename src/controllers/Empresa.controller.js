const empresaCtrl = {};
const uploadImagen = require('../middleware/awsFile');
const empresa = require('../models/Empresa');

empresaCtrl.uploadImagen = (req, res, next) => {
    uploadImagen.upload(req, res, function (err) {
      if (err) {
        res.status(500).json({ message: err });
      }
      return next();
    });
};

empresaCtrl.createEmpresa = async (req, res) => {
  try {
      
  } catch (error) {

  }
}

empresaCtrl.editEmpresa = async (req,res) => {
  try {
      
  } catch (error) {

  }
}

empresaCtrl.getEmpresa = async (req,res) => {
  try {
      
  } catch (error) {

  }
}

module.exports = empresaCtrl;
