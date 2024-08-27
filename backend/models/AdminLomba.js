import { Sequelize } from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;

const AdminLomba = db.define('admin_lomba', {
username:{type: DataTypes.STRING},
password:{type: DataTypes.STRING},
refresh_token:{type: DataTypes.TEXT}
}, 
{freezeTableName:true});

export default AdminLomba;