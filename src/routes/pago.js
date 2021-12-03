const { Router } = require("express");
const router = Router();
const PagoModel = require("../models/Pago");
const moment = require("moment");
const SorteosModel = require("../models/Sorteo");
const CuponesModel = require('../models/CuponesSorteo');

router.route("/").post(async (req, res) => {
  try {
    const { cliente, boletos, total, id_paypal } = req.body;

    console.log("Body", req.body);

    let boletosFinal = [];
    const hoy = moment();

    for (let i = 0; i < boletos.length; i++) {
      boletosFinal.push({
        _id: boletos[i]._id,
        numero_boleto: boletos[i].numero_boleto,
        nombres: cliente.nombres,
        apellidos: cliente.apellidos,
        telefono: cliente.telefono,
        estado: cliente.estado,
        vendido: true,
        fecha_pago: hoy,
      });
    }


    console.log("boletosFinal", boletosFinal);

    const newPay = new PagoModel(
        {
            cliente,
            boletos: boletosFinal,
            total,
            id_paypal,
            pagado: false
        }
    );

    const data = await newPay.save();

    console.log("newPay", data);

    for (let i = 0; i < boletosFinal.length; i++) {
      await SorteosModel.updateOne(
        {
          "boletos._id": boletosFinal[i]._id,
        },
        {
          $set: {
            "boletos.$": {
              numero_boleto: boletosFinal[i].numero_boleto,
              nombres: boletosFinal[i].nombres,
              apellidos: boletosFinal[i].apellidos,
              telefono: boletosFinal[i].telefono,
              estado: boletosFinal[i].estado,
              vendido: true,
              fecha_pago: hoy,
            },
          },
        }
      );
    }

    await PagoModel.findByIdAndUpdate(data._id, { pagado: true });

    console.log("Pagado");

    res.status(200).json({messege: "Pago realizado"});
  } catch (error) {
      console.log(error);
    res.status(500).json({ messege: "Error de pago", error: error });
  }
});

router.route('/cupon/:Cupon').post(async (req,res) => {
  try {
    const cupon = req.params.Cupon;
    console.log(cupon);

    const cupon_base = await CuponesModel.findOne({ cupon: cupon });

    if(cupon_base){

      const { cliente, boletos, total, id_paypal } = req.body;

    console.log("Body", req.body);

    let boletosFinal = [];
    const hoy = moment();

    for (let i = 0; i < boletos.length; i++) {
      boletosFinal.push({
        _id: boletos[i]._id,
        numero_boleto: boletos[i].numero_boleto,
        nombres: cliente.nombres,
        apellidos: cliente.apellidos,
        telefono: cliente.telefono,
        estado: cliente.estado,
        vendido: true,
        fecha_pago: hoy,
      });
    }


    console.log("boletosFinal", boletosFinal);

    const newPay = new PagoModel(
        {
            cliente,
            boletos: boletosFinal,
            total,
            id_paypal,
            pagado: false
        }
    );

    const data = await newPay.save();

    for (let i = 0; i < boletosFinal.length; i++) {
      await SorteosModel.updateOne(
        {
          "boletos._id": boletosFinal[i]._id,
        },
        {
          $set: {
            "boletos.$": {
              numero_boleto: boletosFinal[i].numero_boleto,
              nombres: boletosFinal[i].nombres,
              apellidos: boletosFinal[i].apellidos,
              telefono: boletosFinal[i].telefono,
              estado: boletosFinal[i].estado,
              vendido: true,
              fecha_pago: hoy,
            },
          },
        }
      );
    }

    await PagoModel.findByIdAndUpdate(data._id, { pagado: true });
    await CuponesModel.findByIdAndUpdate(cupon_base._id,{
      canjeado: true,
      cliente: cliente,
      boletos: boletos,
      fecha_pago: hoy,
      total: total
    })

      res.status(200).json({ message: "Error de pago"});
    }else{
      res.status(404).json({ message: "Cupon no encontrado"});
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error de pago", error: error });
  }
});

module.exports = router;
