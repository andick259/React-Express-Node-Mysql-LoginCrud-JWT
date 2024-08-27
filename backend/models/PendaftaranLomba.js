import { Sequelize } from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;

const PendaftaranLomba = db.define('pendaftaran_lomba', {
id_lomba:{type: DataTypes.INTEGER},
id_peserta:{type: DataTypes.INTEGER},
nama_peserta:{type: DataTypes.STRING},
nama_lomba:{type: DataTypes.STRING},
email:{type: DataTypes.STRING}
}, 
{freezeTableName:true});

export default PendaftaranLomba;