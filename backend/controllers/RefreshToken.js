import Peserta from "../models/PesertaModel.js";
import jwt from "jsonwebtoken";

export const refreshToken = async(req, res) => {
    try{
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(401);
        const peserta = await Peserta.findAll({
            where:{
                refresh_token: refreshToken
            }
        });
        if(!peserta[0]) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err) return res.sendStatus(403);
            const id = peserta[0].id;
            const name = peserta[0].name;
            const email = peserta[0].email;
            const accessToken = jwt.sign({id, name, email}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '15s'
            });
            res.json({accessToken});
    });
    }catch(error){
        console.log(error);
    }
}