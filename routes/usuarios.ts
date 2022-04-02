import { Router } from "express";
import {
  deletetUsuario,
  getUsuario,
  getUsuarios,
  postUsuario,
  putUsuario,
} from "../controller/usuarios";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validarCampos";
import { ValidarUUID } from "../middlewares/validaciones"; /**Valida que el uuid sea v4*/
import { ValidarEmail } from "../helpers/ValidarEmail";

const router = Router();

router.get("/", [validarCampos], getUsuarios);
router.get("/:id", [ValidarUUID, validarCampos], getUsuario);
router.post(
  "/",
  [
    check("email", "El email no es valido").isEmail(),
    check("email").custom(ValidarEmail),
    check("nombre", "El nombre no puede estar vacio").not().isEmpty(),
    check(
      "contraseña",
      "La contraseña debe tener mas de 6 caracteres"
    ).isLength({
      min: 6,
    }),
    validarCampos,
  ],
  postUsuario
);
router.put(
  "/:id",
  [
    ValidarUUID,
    validarCampos,
  ],
  putUsuario
);
router.delete("/:id", [validarCampos], deletetUsuario);

export default router;
