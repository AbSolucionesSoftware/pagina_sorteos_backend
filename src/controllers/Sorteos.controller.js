const sorteoCtrl = {};
const uploadImagen = require('../middlewares/awsFile');
const sorteosModel = require('../models/Sorteo');
const jwt = require("jsonwebtoken");

sorteoCtrl.uploadImagen = (req, res, next) => {
    uploadImagen.upload(req, res, function (err) {
      if (err) {
        res.status(500).json({ message: err });
      }
      return next();
    });
};

sorteoCtrl.getSorteos = async (req, res) => {
  try {
    const sorteo = await sorteosModel.findById({id: req.params.idSorteo});
    res.status(200).json({sorteo});
  } catch (error) {
    res.status(500).json({message: "Error del server", error})
  }
};

sorteoCtrl.getSorteoActivos = async (req, res) => {
  try {
    const sorteo = await sorteosModel.findOne({sorteo_activo: true});
    res.status(200).json({sorteo});
  } catch (error) {
    res.status(500).json({message: "Error del server", error})
  }
};

sorteoCtrl.getSorteoDesactivados = async (req, res) => {
  try {
    const sorteo = await sorteosModel.findOne({sorteo_activo: false});
    res.status(200).json({sorteo});
  } catch (error) {
    res.status(500).json({message: "Error del server", error})
  }
};

sorteoCtrl.crearSorteo = (req, res) => {
    try {
        const newSorteo = new sorteosModel(req.body);
        newSorteo.sorteo_activo = false;
        newSorteo.save(req.body);
        res.status(200).json({message: "Sorteo agregado con exito."});
    } catch (error) {
        console.log(error);
    }
};

sorteoCtrl.comprarBoleto = async (req,res) => {
  try {
      const {
          propietario, 
          telefono, 
          domicilio, 
          ciudad, 
          pago
      } = req.body;

      await sorteosModel.updateOne(
          {
              'boletos._id': req.params.idBoleto
          },
          {
              $set: { 
                  'boletos.$': 
                      { 
                        propietario: propietario, 
                        telefono: telefono, 
                        domicilio: domicilio, 
                        ciudad: ciudad, 
                        pago: pago
                      } 
              }
          }
      );
      
      res.status(200).json({message: "Boleto Comprado exitosamente"});
  } catch (error) {
      res.status(500).json({message: "Error del servidor"}, error);
      console.log(error);
  }
}

sorteoCtrl.buscarBoletos = async (req, res) => {
  try {
    const { numeroBoleto } = req.body;
    const boletoBuscado = await sorteosModel.find({"numero_boleto.boletos": numeroBoleto});
    res.status(200).json(boletoBuscado);
} catch (error) {
    res.status(500).json({message: "Error del servidor"}, error);
    console.log(error);
}
};

sorteoCtrl.activarSorteo = async (req, res) => {
  try {
    const { sorteo_activo } = req.body;
    await sorteosModel.findByIdAndUpdate(req.params.idSorteo, {sorteo_activo: sorteo_activo});
    res.status(200).json({message: 'Sorteo actualizado'});
} catch (error) {
    res.status(500).json({message: "Error del servidor"}, error);
    console.log(error);
}
};

module.exports = sorteoCtrl;