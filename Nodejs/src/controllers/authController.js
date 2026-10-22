import 'dotenv/config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';
import Login from '../models/Login.js';
import Acesso from '../models/Acesso.js';

export default class AuthController {
    static async login(req, res) {
        const  { username, senha } = req.body;

        if (!username || !senha) {
            return res.status(400).json({message: "E-mail e/ou senha não fornecidos."});
        }

        try {
            const resultado = await Login.buscarPorUsername(username);
            if (!resultado || resultado.length === 0) {
                return res.status(401).json({message: "E-mail ou senha inválidos."})
            }
            const loginEncontrado = resultado[0];
            const senhaValidada = await bcrypt.compare(senha, loginEncontrado.senha);

            if (!senhaValidada) {
                return res.status(401).json({message: "E-mail ou senha inválidos."});
            }

            Acesso.inserirRegistroDeAcesso({username});

            const dadosLogin = {username: loginEncontrado.username, CPF: loginEncontrado.CPF};
            const secret = process.env.JWT_SECRET;

            const token = jwt.sign(
                dadosLogin,
                secret,
                {expiresIn: '8h'}
            );

            return res.status(200).json({
                message: "Login realizado com sucesso",
                token,
                dadosLogin
            });
        } catch (erro) {
            return res.status(500).json({message: `${erro.message} - falha no login`});
        }
    }

    static async cadastro(req, res) {
        const { CPF, prenome, sobrenome, nascimento, celular, email, idNivelAcesso = 1, senha } = req.body;

        if (!CPF || !prenome || !sobrenome || !nascimento || !celular || !email || !idNivelAcesso || !senha) {
            return res.status(400).json({message: "Não foram fornecidos todos os dados para cadastro."});
        }

        try {
            const usuarioJaCadastrado = await Usuario.buscarUsuarioPorCPF(CPF);
            if (usuarioJaCadastrado && usuarioJaCadastrado.length > 0) {
                return res.status(400).json({message: "CPF já cadastrado no sistema."});
            }

            const loginJaCadastrado = await Login.buscarPorUsername(email);
            if (loginJaCadastrado && loginJaCadastrado.length>0) {
                return res.status(400).json({message: "E-mail já cadastrado no sistema."});
            }

            await Usuario.inserirUsuario(req.body);
            return res.status(201).json({message: "Usuario cadastrado com sucesso!"});
        } catch (erro) {
            return res.status(500).json({message: `${erro.message} - falha no cadastro do usuário.`});
        }
    }
}