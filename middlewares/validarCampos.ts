import { validationResult } from "express-validator";
import { Request, Response } from "express";

export const validarCampos = (req: Request, res: Response, next: Function) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json(error);
  }
  next();
};
