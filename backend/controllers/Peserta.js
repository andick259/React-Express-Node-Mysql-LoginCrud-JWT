import Peserta from "../models/PesertaModel.js";
import PendaftaranLomba from "../models/PendaftaranLomba.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getPeserta = async(req, res) => {
    try {
        const peserta = await Peserta.findAll({
            attributes:['id', 'name', 'email']
        });
        res.json(peserta);
    } catch (error){
        console.log(error);
    }
}

export const Register = async (req, res) => {
    const { name, email, password, confPassword } = req.body;
    
    if (!name || !email || !password || !confPassword) {
    return res.status(400).json({ msg: "Semua Kolom Wajib Diisi!" });
    }
    if (password !== confPassword) {
        return res.status(400).json({ msg: "Password Tidak Cocok!" });
    }
    try {
        const existingUser = await Peserta.findOne({ where: { email: email } });
        if (existingUser) {
            return res.status(400).json({ msg: "Gagal Register! Email sudah terdaftar" });
        }
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);
        await Peserta.create({
            name: name,
            email: email,
            password: hashPassword
        });
        res.json({ msg: "Register Berhasil" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
}

export const Login = async(req, res) => {
    try{
        const peserta = await Peserta.findAll({
            where:{
                email:req.body.email
            }
        });
        const match = await bcrypt.compare(req.body.password, peserta[0].password);
        if(!match) return res.status(400).json({msg: "Password Salah!"});
        const pesertaId = peserta[0].id;
        const name = peserta[0].name;
        const email = peserta[0].email;
        const accessToken = jwt.sign({pesertaId, name, email}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '20s'
        });
        const refreshToken = jwt.sign({pesertaId, name, email}, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });
        await Peserta.update({refresh_token: refreshToken}, {
            where:{
                id: pesertaId
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
        res.status(404).json({msg:"Email belum terdaftar!"});
    }
}

export const Logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(204);
        const peserta = await Peserta.findAll({
            where:{
                refresh_token: refreshToken
            }
        });
        if(!peserta[0]) return res.sendStatus(204);
        const pesertaId = peserta[0].id;
        await Peserta.update({refresh_token: null}, {
            where:{
                id: pesertaId
            }
        });
        res.clearCookie('refreshToken');
        return res.sendStatus(200);
}


export const DaftarLomba = async(req, res) => {
    try{
        await PendaftaranLomba.create(req.body);
        res.status(201).json({msg: "Pendaftaran Berhasil"});
    }catch (error){
        console.log(error.message);
    }
}


export const getDaftarLomba = async(req, res) => {
    try {
        const lombaTerdaftar = await PendaftaranLomba.findAll({
            attributes:['id_lomba', 'id_peserta', 'nama_peserta', 'nama_lomba', 'email']
        });
        res.json(lombaTerdaftar);
    } catch (error){
        console.log(error);
    }
}


export const getCountDaftarLomba = async (req, res) => {
    try {
        const lombaCount = await PendaftaranLomba.findAll({
            attributes: ['id_lomba', [sequelize.fn('COUNT', sequelize.col('id_peserta')), 'total_pendaftar']],
            group: ['id_lomba']
        });
        res.json(lombaCount);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
};