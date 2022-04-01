import { Request, Response } from "express";

const getUsuarios = (req: Request, res: Response) => {
  res.json({
    msg: "get Usuarios",
  });
};

const getUsuario = (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    msg: "get Usuarios",
    id,
  });
};

const postUsuario = (req: Request, res: Response) => {
  const { body } = req;


  res.json({
    msg: "post Usuarios",
    body,
  });
};
const putUsuario = (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  res.json({
    msg: "put Usuarios",
    body,
    id,
  });
};

const deletetUsuario = (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    msg: "delete delete",
    id,
  });
};

export { getUsuarios, deletetUsuario, getUsuario, postUsuario, putUsuario };
