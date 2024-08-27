import express from "express";
import {getPeserta, Register, Login, Logout, DaftarLomba, getDaftarLomba} from "../controllers/Peserta.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import {LoginAdmin, LogoutAdmin, getLomba, AddLomba, EditLomba, getLombaById, deleteLomba, getPesertaById} from "../controllers/Admin.js";
import { verifyTokenAdmin } from "../middleware/VeryfyTokenAdmin.js";
import { refreshTokenAdmin } from "../controllers/RefreshTokenAdmin.js";
const router = express.Router();

router.get('/peserta', verifyToken, getPeserta);
router.post('/peserta', Register);
router.post('/peserta-lomba', DaftarLomba);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);
router.get('/daftar-lomba', verifyToken, getDaftarLomba);


router.post('/login-admin', LoginAdmin);
router.get('/token-admin', refreshTokenAdmin);
router.delete('/logout-admin', LogoutAdmin);
router.get('/lomba-admin', verifyTokenAdmin, getLomba);
router.post('/add-lomba', AddLomba);
router.patch('/edit-lomba/:id', EditLomba);
router.get('/edit-lomba/:id', getLombaById);
router.delete('/lomba-admin-delete/:id', deleteLomba);
router.get('/peserta-lomba-admin/:id', getPesertaById);



export default router;