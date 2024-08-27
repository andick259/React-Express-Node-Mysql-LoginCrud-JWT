import AdminLomba from "../models/AdminLomba.js";
import jwt from "jsonwebtoken";

export const refreshTokenAdmin = async(req, res) => {
    try{
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(401);
        const admin = await AdminLomba.findAll({
            where:{
                refresh_token: refreshToken
            }
        });
        if(!admin[0]) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err) return res.sendStatus(403);
            const username = admin[0].username;
            const accessToken = jwt.sign({username}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '15s'
            });
            res.json({accessToken});
    });
    }catch(error){
        console.log(error);
    }
}