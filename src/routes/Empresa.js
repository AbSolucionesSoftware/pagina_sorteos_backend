const { Router } = require('express');
const router = Router();
const { createEmpresa, editEmpresa, getEmpresa } = require('../controllers/Empresa.controller');
const auth = require('../middleware/auth');

router.route('/empresaSorteo')
    .post(uploadImagen,createEmpresa)
    .put(uploadImagen,editEmpresa)
    .get(getEmpresa);



module.exports = router;