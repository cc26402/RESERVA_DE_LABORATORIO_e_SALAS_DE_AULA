import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';

class AuthController {
    static async login(req, res) {
        const  { email, senha } = req.body;

        if (!email || !senha) {
            return res.status()
        }
    }
}