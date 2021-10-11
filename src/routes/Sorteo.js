const { Router } = require('express');
const router = Router();
const { 
    crearSorteo,
    getSorteoActivos,
    uploadImagen,
    comprarBoleto,
    buscarBoletos,
    getSorteoDesactivados,
    activarSorteo
} = require('../controllers/Sorteos.controller');
const auth = require('../middlewares/auth');

router.route('/crearSorteo').post(uploadImagen, crearSorteo);

router.route('/getSorteoActivo').get(getSorteoActivos);

router.route('/getSorteosEliminados').get(getSorteoDesactivados);

router.route('/comprarBoletoSorteo/:idBoleto').put(comprarBoleto);

router.route('/buscarBoleto/:idSorteo').post(buscarBoletos);

router.route('/activeSorteo/:idSorteo').put(activarSorteo);


module.exports = router;