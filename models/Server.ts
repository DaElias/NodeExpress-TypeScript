import express, { Application } from "express";
import userRouter from "../routes/usuarios";
import cors from "cors";
import db from "../db/connection";

class Server {
  private app: Application;
  private port: String | Number;
  private apiPath = {
    usuarios: "/api/usuario",
  };
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;
    this.dbConnection();
    this.middlewares();
    //rutas del servidor
    this.routes();
  }
  routes() {
    this.app.use(this.apiPath.usuarios, userRouter);
  }

  async dbConnection() {
    try {
      await db.authenticate();
      console.log("Data base Lista!!");
    } catch (error: any) {
      throw new Error(error);
    }
  }

  middlewares() {
    //CORS
    this.app.use(cors());
    //LECTURA DEL BODY
    this.app.use(express.json());
    //CARPETA PUBLICA
    this.app.use(express.static("../public"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor Corriendo!! http://localhost:${this.port}/`);
    });
  }
}

export default Server;
