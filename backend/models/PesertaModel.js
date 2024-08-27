import { Sequelize } from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;

const Peserta = db.define('peserta', {
name:{type: DataTypes.STRING},
email:{type: DataTypes.STRING},
password:{type: DataTypes.STRING},
refresh_token:{type: DataTypes.TEXT}
}, 
{freezeTableName:true});

export default Peserta;