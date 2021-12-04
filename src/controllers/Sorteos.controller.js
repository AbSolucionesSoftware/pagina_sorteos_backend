const sorteoCtrl = {};
const uploadImagen = require("../middlewares/awsFile");
const { eliminarImagen } = require("../middlewares/awsFile");
const sorteosModel = require("../models/Sorteo");
// const jwt = require("jsonwebtoken");

const CuponModel = require('../models/CuponesSorteo');
const moment = require('moment');
moment.locale('es');
const PagoModel = require('../models/Pago');

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
    const sorteo = await sorteosModel.findById({ id: req.params.idSorteo });
    res.status(200).json({ sorteo });
  } catch (error) {
    res.status(500).json({ message: "Error del server", error });
  }
};

sorteoCtrl.getSorteoActivos = async (req, res) => {
  try {
    let sorteo = await sorteosModel.findOne({ sorteo_activo: true });
    let cupones = [];
    if (sorteo) cupones = await CuponModel.find().where({id_sorteo: sorteo._id});
    console.log(sorteo);
    res.status(200).json({ sorteo, cupones: cupones.length > 0 ? cupones : [] });
  } catch (error) {
    res.status(500).json({ message: "Error del server", error });
  }
};

sorteoCtrl.getSorteoDesactivados = async (req, res) => {
  try {
    const sorteos = await sorteosModel.find({ sorteo_activo: false });
    res.status(200).json({ sorteos });
  } catch (error) {
    res.status(500).json({ message: "Error del server", error });
  }
};

sorteoCtrl.crearSorteo = async (req, res) => {
  try {
    const newSorteo = new sorteosModel(req.body);
    // console.log(req.body);
    if (req.file) {
      newSorteo.imgSorteoBoletosKey = req.file.key;
      newSorteo.imgSorteoBoletosUrl = req.file.location;
      newSorteo.lista_premios = {
        premio_uno: {
          nombre_premio: "",
          imagen: {
            url: "",
            key: "",
          },
        },
        premio_dos: {
          nombre_premio: "",
          imagen: {
            url: "",
            key: "",
          },
        },
        premio_tres: {
          nombre_premio: "",
          imagen: {
            url: "",
            key: "",
          },
        },
      };
      newSorteo.boletos = JSON.parse(req.body.boletos);
      newSorteo.sorteo_activo = true;
      const sorteo = await newSorteo.save();
      res.status(200).json(sorteo);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Ocurrio un error", error});
  }
};

sorteoCtrl.editSorteo = async (req, res) => {
  try {
    const sorteo = req.body;
    const sorteoBase = await sorteosModel.findById(req.params.idSorteo);
    if (req.file) {
      if (sorteoBase.imgSorteoBoletosKey)
        eliminarImagen(sorteoBase.imgSorteoBoletosKey);
      sorteo.imgSorteoBoletosKey = req.file.key;
      sorteo.imgSorteoBoletosUrl = req.file.location;
      await sorteosModel.findByIdAndUpdate(req.params.idSorteo, sorteo);
    } else {
      await sorteosModel.findByIdAndUpdate(req.params.idSorteo, sorteo);
    }
    res.status(200).json({ message: "Sorteo Creado exitosamente" });
  } catch (error) {
    console.log(error);
  }
};

sorteoCtrl.agregarPremioLista = async (req, res) => {
  try {
    // console.log(req.body);
    const { nombre_premio } = req.body;
    console.log(req.params.idSorteo);
    console.log(req.params.idPremio);
    console.log(nombre_premio);

    const sorteo = await sorteosModel.findById(req.params.idSorteo);
    if (req.params.idPremio == 1) {
      if (req.file) {
        let imagen = { url: req.file.location, key: req.file.key };
        if (sorteo.lista_premios.premio_uno.imagen.key !== "")
          eliminarImagen(sorteo.lista_premios.premio_uno.imagen.key);
        await sorteosModel.findByIdAndUpdate(req.params.idSorteo, {
          "lista_premios.premio_uno.nombre_premio": nombre_premio,
          "lista_premios.premio_uno.imagen": imagen,
        });
        res.status(200).json({ message: "Sorteo Creado exitosamente" });
      } else {
        await sorteosModel.findByIdAndUpdate(req.params.idSorteo, {
          "lista_premios.premio_uno.nombre_premio": nombre_premio,
        });
        res.status(200).json({ message: "Sorteo Creado exitosamente" });
      }
    } else if (req.params.idPremio == 2) {
      if (req.file) {
        // console.log(req.file);
        console.log("Entro a imagen");
        let imagen = { url: req.file.location, key: req.file.key };
        if (sorteo.lista_premios.premio_dos.imagen.key !== "")
          eliminarImagen(sorteo.lista_premios.premio_dos.imagen.key);
        await sorteosModel.findByIdAndUpdate(req.params.idSorteo, {
          "lista_premios.premio_dos.nombre_premio": nombre_premio,
          "lista_premios.premio_dos.imagen": imagen,
        });
        res.status(200).json({ message: "Sorteo Creado exitosamente" });
      } else {
        await sorteosModel.findByIdAndUpdate(req.params.idSorteo, {
          "lista_premios.premio_dos.nombre_premio": nombre_premio,
        });
        res.status(200).json({ message: "Sorteo Creado exitosamente" });
      }
      // res.status(200).json({ message: "Sorteo Creado exitosamente" });
    } else {
      if (req.file) {
        // console.log(req.file);
        console.log("Entro a imagen");
        let imagen = { url: req.file.location, key: req.file.key };
        if (sorteo.lista_premios.premio_tres.imagen.key !== "")
          eliminarImagen(sorteo.lista_premios.premio_tres.imagen.key);
        await sorteosModel.findByIdAndUpdate(req.params.idSorteo, {
          "lista_premios.premio_tres.nombre_premio": nombre_premio,
          "lista_premios.premio_tres.imagen": imagen,
        });
        res.status(200).json({ message: "Sorteo Creado exitosamente" });
      } else {
        await sorteosModel.findByIdAndUpdate(req.params.idSorteo, {
          "lista_premios.premio_tres.nombre_premio": nombre_premio,
        });
        res.status(200).json({ message: "Sorteo Creado exitosamente" });
      }
      // res.status(200).json({ message: "Sorteo Creado exitosamente" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error del servidor" });
    console.log(error);
  }
};

sorteoCtrl.comprarBoleto = async (req, res) => {
  try {
    const { nombres, apellidos, telefono, estado } = req.body;
    console.log(req.body);
    await sorteosModel.updateOne(
      {
        "boletos._id": req.params.idBoleto,
      },
      {
        $set: {
          "boletos.$.nombres": nombres,
          "boletos.$.apellidos": apellidos,
          "boletos.$.telefono": telefono,
          "boletos.$.estado": estado,
          "boletos.$.vendido": true,
        },
      }
    );
    res.status(200).json({ message: "Boleto Comprado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error del servidor" }, error);
    console.log(error);
  }
};

sorteoCtrl.buscarBoletos = async (req, res) => {
  try {
    let busqueda = await sorteosModel.findOne({ sorteo_activo: true });
    let boletoBuscado = {};
    busqueda.boletos.forEach((resultado) => {
      if (resultado.numero_boleto === req.body.numeroBoleto) {
        boletoBuscado = busqueda.boletos.filter(
          (pregunta) => pregunta.numero_boleto === req.body.numeroBoleto
        );
      }
    });
    console.log(boletoBuscado);
    res.status(200).json(boletoBuscado);
  } catch (error) {
    res.status(500).json({ message: "Error del servidor" });
    console.log(error);
  }
};

sorteoCtrl.activarSorteo = async (req, res) => {
  try {
    const { sorteo_activo } = req.body;
    await sorteosModel.findByIdAndUpdate(req.params.idSorteo, {
      sorteo_activo: sorteo_activo,
    });
    res.status(200).json({ message: "Sorteo dado de baja existosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error del servidor" }, error);
    console.log(error);
  }
};

sorteoCtrl.crearCuponesSorteo = async (req,res) => {
  try {
    const { cantidad } = req.body;
    
    const hoy = moment().locale('es-mx').format('YYYY-MM-DD');

    for(i = 0; i < parseInt(cantidad); i++){
      const newCoupon = new CuponModel({
        cupon: generateCode(10),
        id_sorteo: req.params.idSorteo,
        canjeado: false,
        fecha_creado: hoy
      })
      await newCoupon.save();
    }

    res.status(200).json({message: "Cupones Creados"});

  } catch (error) {
    res.status(500).json({message: "Parece que ocurrio un error."});
  }
}

sorteoCtrl.obteneBoletosUsuario = async (req,res) => {
  try {
    const folio = req.params.Folio;
    if(!folio){
      res.status(404).json({message: "El folio obligatorio."});
    }else{
      const folio_base = await PagoModel.findOne({folio: folio});
      if(folio_base){
        res.status(200).json({folio: folio_base})
      }else{
        res.status(404).json({message: "El folio no encontrado."});
      }
    }
  } catch (error) {
    res.status(500).json({message: "Parece que ocurrio un error."});
  }
}

const generateCode = (length) => {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

module.exports = sorteoCtrl;
