const { Schema, model } = require('mongoose');

const CuponesSorteoSchema = new Schema({
    cupon: {
        type: String,
        unique: true
    },
    id_sorteo: {
        type: Schema.Types.ObjectId,
        ref: "sorteoBoletos"
    },
    canjeado: Boolean,
    cliente: {
        nombres: String,
        apellidos: String,
        telefono: String,
        estado: String,
    },
    boletos:[{
        _id: String,
        numero_boleto: String,
    }],
    fecha_pago: String,
    fecha_creado: String,
    total: String
});

module.exports = model("cuponessorteo",CuponesSorteoSchema);