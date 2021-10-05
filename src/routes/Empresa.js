const { Router } = require('express');
const router = Router();
const { 
    createEmpresa, 
    editEmpresa, 
    getEmpresa, 
    inicioSesion, 
    resetPassCompany,
    editPreguntas,
    editVideos,
    eliminarPregunta,
    eliminarVideo,
    uploadImagen
} = require('../controllers/Empresa.controller');
const auth = require('../middlewares/auth');

router.route('/empresaSorteo').post(createEmpresa).get(getEmpresa)

router.route('/empresaSorteo/:idCompany').put(uploadImagen, editEmpresa)
    
router.route("/logIn").post(inicioSesion);

router.route("/resetPass/:idCompany").put(resetPassCompany);

router.route("/actionEmpresa/preguntas/:idCompany").put(editPreguntas);


router.route("/actionEmpresa/videos/:idCompany/:idVideo").delete(eliminarVideo);
router.route("/actionEmpresa/preguntas/:idCompany/:idPregunta").delete(eliminarPregunta);


router.route("/actionEmpresa/videos/:idCompany").put(editVideos);

module.exports = router;