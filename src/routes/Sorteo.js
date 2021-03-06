const { Router } = require('express');
const router = Router();
const { 
    crearSorteo,
    getSorteoActivos,
    uploadImagen,
    comprarBoleto,
    buscarBoletos,
    getSorteoDesactivados,
    activarSorteo,
    agregarPremioLista,
    editSorteo,
    crearCuponesSorteo,
    obteneBoletosUsuario
} = require('../controllers/Sorteos.controller');
const auth = require('../middlewares/auth');

router.route('/crearSorteo').post(uploadImagen, crearSorteo);

router.route('/getSorteoActivo').get(getSorteoActivos);

router.route('/getSorteosEliminados').get(getSorteoDesactivados);

router.route('/edit/lista/premios/:idSorteo/premio/:idPremio').put(uploadImagen,agregarPremioLista);

router.route('/comprarBoletoSorteo/:idBoleto').put(comprarBoleto);

router.route('/buscarBoleto/:idSorteo').post(buscarBoletos);

router.route('/activeSorteo/:idSorteo').put(activarSorteo);

router.route('/editarSorteo/:idSorteo/editar').put(uploadImagen,editSorteo);

router.route('/crear/cupones/:idSorteo').post(crearCuponesSorteo);


router.route('/folio/compra/:Folio').get(obteneBoletosUsuario);


module.exports = router;