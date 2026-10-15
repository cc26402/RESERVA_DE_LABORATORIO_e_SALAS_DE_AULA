import 'dotenv/config';
import jwt from 'jsonwebtoken';

export default function AuthMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({message: "Acesso negado. Token não fornecido."});
    }

    const partes = authHeader.split(' ');

    if (partes.length !== 2 || partes[0] !== 'Bearer') {
        return res.status(401).json({message: "Formato de token inválido. Use Bearer <token>"});
    }

    const token = partes[1];
    const secret = process.env.JWT_SECRET;

    try {
        const tokenDecodificado = jwt.verify(token, secret);
        req.params.id = tokenDecodificado.CPF;
        req.usuarioCPF = tokenDecodificado.CPF;
        req.loginUsername = tokenDecodificado.username;
        return next();
    } catch (erro) {
        return res.status(401).json({message: "Token inválido ou expirado"});
    }
}