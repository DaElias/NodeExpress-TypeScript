import Usuario from "../models/Usuario";
import { Request, Response } from "express";
import { v4 } from "uuid";

type modeloUsuario = {
  id?: string;
  nombre: string;
  email: string;
  contraseña: string;
  createdAt?: any;
  updatedAt?: any;
};

// Obtenemos los USUARIOS
const getUsuarios = async (req: Request, res: Response) => {
  const usuarios = await Usuario.findAll();

  res.json({ usuarios });
};
// Obtenemos El USUARIO
const getUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;

  // const usuario = await Usuario.findOne({ where: { id: id } });
  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      res.status(400).json({
        msg: `No existe un usuario con id: ${id}`,
      });
    }
    res.json({
      usuario,
    });
  } catch (error) {
    console.log(error);
  }
};

// Creamos el Usuario
const postUsuario = async (req: Request, res: Response) => {
  // const { nombre, email, contraseña } = req.body;
  const { nombre, email, contraseña } = req.body;

  const datos: modeloUsuario = {
    id: v4(), //** Inportate el ID */
    nombre,
    email,
    contraseña,
    createdAt: null,
    updatedAt: null,
  };

  try {
    // @ts-ignore to ignore the type checking errors on the next line in a TypeScript file. If you use a linter, you might have to add a comment to also suppress linting errors when using ts-ignore - // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    const usuario = new Usuario(datos);

    await usuario.save();
    res.json({
      msg: "Create User!!",
      usuario,
    });
  } catch (error) {
    return res.status(500).json({ msg: "Error hablar con el Admin" });
  }
};

/**
 *  Editar datos de usuarios
 */
const putUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre, email, contraseña }: modeloUsuario = req.body;
  try {
    //* validamos el usuario exista
    const usuario = await Usuario.findByPk(id);
    if (!usuario)
      return res.status(400).json({
        msg: "El Usuario no existe!!",
      });
    //* validamos la actualizacion del email
    // @ts-ignore to ignore the type checking errors on the next line in a TypeScript file. If you use a linter, you might have to add a comment to also suppress linting errors when using ts-ignore - // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    if (usuario.dataValues.email !== email) {
      const verificarAcualizarEmail = await Usuario.findOne({
        where: {
          email: email,
        },
      });
      if (verificarAcualizarEmail)
        return res.status(400).json({
          msg: "El email ingresado ya existe!!",
        });
    }
    //* actualizacion del usuario
    const data: modeloUsuario = {
      nombre,
      contraseña,
      email,
    };
    // @ts-ignore to ignore the type checking errors on the next line in a TypeScript file. If you use a linter, you might have to add a comment to also suppress linting errors when using ts-ignore - // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    await usuario.update(data);

    res.json({
      msg: "put Usuarios",
      usuario,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error hablar con el Admin - put", error });
  }
};

const deletetUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    msg: "delete delete",
    id,
  });
};

export { getUsuarios, deletetUsuario, getUsuario, postUsuario, putUsuario };
