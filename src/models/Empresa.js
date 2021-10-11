const { Schema, model } = require('mongoose');

const empresaSorteosShema = new Schema(
    {
        nombre_empresa: String,
        propietario: String,
        telefono: String,
        nameUser: String,
        slug: String,
        password: String,
        calle_numero: String,
        colonia: String,
        ciudad: String,
        cp: String,
        facebook: String,
        instagram: String,
        twitter: String,
        imgEmpresaKey: String,
        imgEmpresaUrl: String,
        quienes_somos: String,
        preguntas:[{
            pregunta: String,
            respuesta: String
        }],
        videos_ganadores: [{
            titulo_video: String,
            link_video: String
        }]
    },
    {
        timestamps: true
    }
)

module.exports = model('empresaSorteos', empresaSorteosShema);