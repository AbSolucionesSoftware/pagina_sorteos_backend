const { Schema, model } = require('mongoose');

const PagoSchema = new Schema(
    {
        cliente: {
            nombres: String,
            apellidos: String,
            telefono: String,
            estado: String,
        },
        boletos: [{
            _id: String,
            numero_boleto: String,
        }],
        total: String,
        id_paypal: String,
        pagado: Boolean,
    },
    {
        timestamps: true
    }
)

module.exports = model('pago', PagoSchema);