import { Sequelize } from "sequelize";

const db = new Sequelize('peserta_lomba', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

export default db;