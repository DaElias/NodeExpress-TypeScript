import Usuario from "../models/Usuario";
// import { Request, Response } from "express";

/**
 *  Valida al crear un Usuario que el Correo no se repita!!
 */
const ValidarEmail = async (email = "") => {
  //   const { email } = req.body;
  const verificar = await Usuario.findOne({ where: { email: email } });
  console.log(email + " " + verificar);
  if (verificar) throw new Error(`EL email ${email} ya esta registrado`);
  //   return res.status(400).json({
  //     msg: `EL email ${email} ya esta registrado`,
  //   });
  // next();
};

export { ValidarEmail };
