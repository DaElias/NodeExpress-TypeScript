import { version as uuidVersion } from "uuid";
import { validate as uuidValidate } from "uuid";
import { Request, Response } from "express";

/**
 *
 * @param uuid
 * @returns bolean
 */
function uuidValidateV4(uuid: string): boolean {
  return uuidValidate(uuid) && uuidVersion(uuid) === 4;
}

/**
 * Valida que el id sea uuid v4
 */
const ValidarUUID = (req: Request, res: Response, next: Function) => {
  const { id } = req.params;

  if (!uuidValidateV4(id)) {
    return res.status(401).json({
      msg: `El id: ${id} no es valido!`,
    });
  }
  next();
};



export { ValidarUUID };
