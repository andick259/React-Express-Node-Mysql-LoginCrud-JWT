import { Sequelize } from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;

const Lomba = db.define('lomba', {
nama_lomba:{type: DataTypes.STRING},
deskripsi:{type: DataTypes.STRING}
}, 
{freezeTableName:true});

export default Lomba;