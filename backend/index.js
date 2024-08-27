import express from "express";
import db from "./config/database.js";
import Peserta from "./models/PesertaModel.js";
import Lomba from "./models/LombaModel.js";
import AdminLomba from "./models/AdminLomba.js";
import PendaftaranLomba from "./models/PendaftaranLomba.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./routes/index.js";
import dotenv from "dotenv";
dotenv.config();


const app = express();

try{
    await db.authenticate();
    console.log('Database Terhubung...');
    await Peserta.sync();
    await Lomba.sync();
    await AdminLomba.sync();
    await PendaftaranLomba.sync();
}catch(error){
    console.error(error);
}

app.use(cors({ credentials:true, origin:'http://localhost:3000'}));
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(5000, ()=> console.log('Server berjalan di port 5000'));