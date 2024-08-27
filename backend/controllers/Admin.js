import AdminLomba from "../models/AdminLomba.js";
import LombaList from "../models/LombaModel.js";
import PendaftaranLomba from "../models/PendaftaranLomba.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const getLomba = async(req, res) => {
    try {
        const lomba = await LombaList.findAll({
            attributes:['id', 'nama_lomba', 'deskripsi']
        });
        res.json(lomba);
    } catch (error){
        console.log(error);
    }
}

export const LoginAdmin = async(req, res) => {
    try{
        const admin = await AdminLomba.findAll({
            where:{
                username:req.body.username
            }
        });
        const match = await bcrypt.compare(req.body.password, admin[0].password);
        if(!match) return res.status(400).json({msg: "Password Salah!"});
        const username = admin[0].username;
        const accessToken = jwt.sign({username}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '20s'
        });
        const refreshToken = jwt.sign({username}, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });
        await AdminLomba.update({refresh_token: refreshToken}, {
            where:{
                username: username
            }
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
            /*for server host 
            maxAge: 24 * 60 * 60 * 1000,
            secure: true
            */
        });
        res.json({ accessToken });
    }catch(error){
        res.status(404).json({msg:"Username Admin belum terdaftar!"});
    }
}

export const LogoutAdmin = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(204);
        const admin = await AdminLomba.findAll({
            where:{
                refresh_token: refreshToken
            }
        });
        if(!admin[0]) return res.sendStatus(204);
        const username = admin[0].username;
        await AdminLomba.update({refresh_token: null}, {
            where:{
                username: username
            }
        });
        res.clearCookie('refreshToken');
        return res.sendStatus(200);
}


export const AddLomba = async(req, res) => {
    const { nama_lomba, deskripsi } = req.body;
    if (!nama_lomba || !deskripsi) {
        return res.status(400).json({ msg: "Semua Kolom Wajib Diisi!" });
        }
    try{
        await LombaList.create(req.body);
        res.status(201).json({msg: "Lomba Berhasil Ditambahkan"});
    }catch (error){
        console.log(error.message);
    }
}

export const EditLomba = async(req, res) => {
    try{
        await LombaList.update(req.body, {
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Lomba Berhasil Diedit"});
    }catch (error){
        console.log(error.message);
    }
}

export const getLombaById = async(req, res) => {
    try{
        const response = await LombaList.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    }catch (error){
        console.log(error.message);
    }
}

export const deleteLomba = async(req, res) => {
    try{
        await LombaList.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Lomba dihapus"});
    }catch (error){
        console.log(error.message);
    }
}

export const getPesertaById = async(req, res) => {
    try{
        const response = await PendaftaranLomba.findAll({
            where:{
                id_lomba: req.params.id
            }
        });
        res.status(200).json(response);
    }catch (error){
        console.log(error.message);
    }
}