const empresaCtrl = {};
const uploadImagen = require('../middlewares/awsFile');
const empresaModel = require('../models/Empresa');
const bcrypt = require('bcrypt-nodejs');
const jwt = require("jsonwebtoken");

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
    const { password, repeatPassword } = req.body;
    const newEmpresa = new empresaModel(req.body);
    if(!password || !repeatPassword){
        res.status(404).json({ message: "Las contrasenas son obligatorias." });
    } else {
        if(password !== repeatPassword){
            res.status(404).json({ message: "Las contrasenas no son iguales." });
        } else {
            bcrypt.hash(password, null, null, function (err, hash){
                if(err){
                    res.status(500).json({message: "Ups, algo paso al registrar el usuario",err,});
                } else {
                    newEmpresa.password = hash;
                    newEmpresa.save((err, userStored) => {
                        if (err) {
                          res
                            .status(500)
                            .json({
                              message: "Ups, algo paso al registrar el usuario",
                              err,
                            });
                        } else {
                          if (!userStored) {
                            res.status(404).json({ message: "Error al crear el usuario" });
                          } else {
                            res.status(200).json({message: "Usuario agregado."});
                          }
                        }
                      })
                }
            })
        }
    }
  } catch (error) {
    res.status(500).json({message: "Error del server", error})
    console.log(error);
  }
}

empresaCtrl.resetPassCompany = async (req,res) => {
  try {
      const { password, repeatPassword  } = req.body;
      console.log(req.body);
      console.log(password);
      console.log(repeatPassword);
      if(password !== repeatPassword){
          res.status(404).json({ message: "Las contrasenas no son iguales." });
      } else {
          bcrypt.hash(password, null, null, async function (err, hash){
              if(err){
                  res.status(500).json({message: "Ups, algo paso al registrar el usuario",err,});
              } else {
                  await modelCompany.findByIdAndUpdate(req.params.idCompany,{password: hash});
                  res.status(200).json({message: "Usuario actualizado."});
              }
          })
      }

  } catch (error) {
      res.status(500).json({message: "Error del server", error})
      console.log(error);
  }
}

empresaCtrl.inicioSesion = async (req,res) => {
  try {
      const { nameUser, password } = req.body;
      const userBase = await empresaModel.findOne({nameUser: nameUser});
      if(userBase){
        if (!bcrypt.compareSync(password, userBase.password)) {
          res.status(404).json({ message: "Contraseña incorrecta" });
        } else {
          const token = jwt.sign(
              {
                _id: userBase._id,
                nombre_empresa: userBase.nombre_empresa,
                nameUser: userBase.nameUser,
                slug: userBase.slug,
                propietario: userBase.propietario,
                calle_numero: userBase.calle_numero,
                colonia: userBase.colonia,
                ciudad: userBase.ciudad,
                cp: userBase.cp,
                facebook: userBase.facebook,
                instagram: userBase.instagram,
                twitter: userBase.twitter,
                telefono: userBase.telefono,
                imgEmpresaUrl: userBase.imgEmpresaUrl
              },
              process.env.AUTH_KEY
            );
          res.status(200).json({ token });
        }
      }else{
          res.status(404).json({message: "Este usuario no existe."});
      }
  } catch (error) {
      res.status(500).json({message: "Error del server", error})
      console.log(error);
  }
};


empresaCtrl.eliminarVideo = async (req,res) => {
    try {
      await empresaModel.updateOne(
        {
          _id: req.params.idCompany
        },
        {
          $pull: {
            videos_ganadores: {
              _id: req.params.idVideo
            }
          }
        },
      ); 
      res.status(200).json({message: "Video Eliminada"});
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
}

empresaCtrl.eliminarPregunta = async (req,res) => {
    try {
      await empresaModel.updateOne(
        {
          _id: req.params.idCompany
        },
        {
          $pull: {
            preguntas: {
              _id: req.params.idPregunta
            }
          }
        },
      ); 
      res.status(200).json({message: "Pregunta Eliminada"});
    } catch (error) {
      res.status(500).json({message: "Error del servidor"}, error);
      console.log(error);
    }
}


empresaCtrl.editEmpresa = async (req, res) => {
  try {
      const company = await empresaModel.findById(req.params.idCompany);
      const newCompany = req.body;
      if(req.file){
          newCompany.imgEmpresaKey = req.file.key;
          newCompany.imgEmpresaUrl = req.file.location;
          if(company.imgEmpresaKey){
            uploadImagen.eliminarImagen(company.imgEmpresaKey);
          }
      }else{
          newCompany.imgEmpresaKey = company.imgEmpresaKey ? company.imgEmpresaKey : "";
          newCompany.imgEmpresaUrl = company.imgEmpresaUrl ? company.imgEmpresaUrl : "";
      }
      await empresaModel.findByIdAndUpdate(req.params.idCompany, newCompany);

      res.status(200).json({message: "Usuario actualizado."});
  } catch (error) {
      res.status(500).json({message: "Ocurrio un problema en el servidor"});
  }
}

empresaCtrl.editPreguntas = async (req, res) => {
  try {
    const {pregunta, respuesta} = req.body;
    await empresaModel.updateOne(
      {
          _id: req.params.idCompany
      },
      {
        $addToSet: {
          preguntas: {
            pregunta: pregunta,
            respuesta: respuesta
          }
        }
      }
    );
    res.status(200).json({message: "Pregunta agregada con exito"});
  } catch (error) {
      res.status(500).json({message: "Ocurrio un problema en el servidor"});
  }
}

empresaCtrl.editVideos = async (req, res) => {
  try {
      const {titulo_video, link_video} = req.body;
      await empresaModel.updateOne(
        {
            _id: req.params.idCompany
        },
        {
          $addToSet: {
            videos_ganadores: {
              titulo_video: titulo_video,
              link_video: link_video
            }
          }
        }
      );
    res.status(200).json({message: "Video agregado."});
  } catch (error) {
      res.status(500).json({message: "Ocurrio un problema en el servidor"});
  }
}

empresaCtrl.getEmpresa = async (req, res) => {
  try {
    const empresa = await empresaModel.findOne();
    res.status(200).json({empresa});
  } catch (error) {
    res.status(500).json({message: "Error del server", error})
  }
};

module.exports = empresaCtrl;
