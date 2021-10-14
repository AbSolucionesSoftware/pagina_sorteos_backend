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
    const sorteos = await sorteosModel.find({sorteo_activo: false});
    res.status(200).json({sorteos});
  } catch (error) {
    res.status(500).json({message: "Error del server", error})
  }
};

sorteoCtrl.crearSorteo = (req, res) => {
    try {
      const newSorteo = new sorteosModel(req.body);
      if(req.file){
        newSorteo.imgSorteoBoletosKey = req.file.key;
        newSorteo.imgSorteoBoletosUrl = req.file.location;
      }
      newSorteo.lista_premios = JSON.parse(req.body.lista_premios);
      newSorteo.boletos = JSON.parse(req.body.boletos);
      newSorteo.sorteo_activo = true;
      newSorteo.save();
      res.status(200).json({message: "Sorteo Creado exitosamente"});
    } catch (error) {
        console.log(error);
    }
};

sorteoCtrl.editSorteo = (req, res) => {
  try {
    const newSorteo = new sorteosModel(req.body);
    if(req.file){
      newSorteo.imgSorteoBoletosKey = req.file.key;
      newSorteo.imgSorteoBoletosUrl = req.file.location;
    }
    newSorteo.lista_premios = JSON.parse(req.body.lista_premios);
    newSorteo.boletos = JSON.parse(req.body.boletos);
    newSorteo.sorteo_activo = true;
    newSorteo.save();
    res.status(200).json({message: "Sorteo Creado exitosamente"});
  } catch (error) {
      console.log(error);
  }
};

sorteoCtrl.comprarBoleto = async (req,res) => {
  try {
      const {
        nombres,
        apellidos,
        telefono,
        estado,
      } = req.body;
      console.log(req.body);
      await sorteosModel.updateOne(
          {
              'boletos._id': req.params.idBoleto
          },
          {
              $set: { 
                    'boletos.$.nombres': nombres,
                    'boletos.$.apellidos': apellidos,
                    'boletos.$.telefono': telefono,
                    'boletos.$.estado': estado,
                    'boletos.$.vendido': true,
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
    let busqueda = await sorteosModel.findOne({sorteo_activo: true});
    let boletoBuscado = {};
    busqueda.boletos.forEach(resultado => {
      if( resultado.numero_boleto === req.body.numeroBoleto){
        boletoBuscado = busqueda.boletos.filter(pregunta => pregunta.numero_boleto === req.body.numeroBoleto);
      }
    });
    console.log(boletoBuscado);
    res.status(200).json(boletoBuscado);
  } catch (error) {
      res.status(500).json({message: "Error del servidor"});
      console.log(error);
  }
};

sorteoCtrl.activarSorteo = async (req, res) => {
  try {
    const { sorteo_activo } = req.body;
    await sorteosModel.findByIdAndUpdate(req.params.idSorteo, {sorteo_activo: sorteo_activo});
    res.status(200).json({message: 'Sorteo dado de baja existosamente'});
} catch (error) {
    res.status(500).json({message: "Error del servidor"}, error);
    console.log(error);
}
};

module.exports = sorteoCtrl;