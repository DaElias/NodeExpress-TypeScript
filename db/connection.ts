import { Sequelize } from "sequelize";

const userNameDb = "root";
const passWordDb = "rootroot";

const db = new Sequelize("node", userNameDb, passWordDb, {
  host: "localhost",
  dialect: "mysql",
  // logging:false
});

export default db;
