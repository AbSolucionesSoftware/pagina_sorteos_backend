const { Schema, model } = require('mongoose');

const sorteoBoletosShema = new Schema(
    {
        nombre_sorteo: String,
        fecha_sorteo: String,
        sorteo_activo: Boolean,
        precio_boleto: String,
        lista_premios:{
            premio_uno: {
                nombre_premio: String,
                imagen: {
                    url: String,
                    key: String
                }
            },
            premio_dos: {
                nombre_premio: String,
                imagen: {
                    url: String,
                    key: String
                }
            },
            premio_tres:{
                nombre_premio: String,
                imagen: {
                    url: String,
                    key: String
                }
            }
        },
        imgSorteoBoletosKey: String,
        imgSorteoBoletosUrl: String,
        boletos:[{
            numero_boleto: String,
            nombres: String,
            apellidos: String,
            telefono: String,
            estado: String,
            vendido: Boolean,
            fecha_pago: Date
        }]
    },
    {
        timestamps: true
    }
)

module.exports = model('sorteoBoletos', sorteoBoletosShema);