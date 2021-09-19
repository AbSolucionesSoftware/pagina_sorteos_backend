const { Schema, model } = require('mongoose');

const sorteoBoletosShema = new Schema(
    {
        nombre_sorteo: String,
        fecha_sorteo: String,
        lista_premios:[{
            pocision: String,
            premio: String,
        }],
        imgSorteoBoletosKey: String,
        imgSorteoBoletosUrl: String,
        boletos:[
            {
                numero_boleto: String,
                propietario: String,
                telefono: String,
                domicilio: String,
                ciudad: String,
                fecha_pago: Date
            }
        ]
    },
    {
        timestamps: true
    }
)

module.exports = model('sorteoBoletos', sorteoBoletosShema);