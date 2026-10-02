import conectaBD from "../config/dbConect.js"

class Acesso{
    constructor (idAcesso, username){
        this.idAcesso = idAcesso;
        this.username = username;
        this.dataHoraAcesso = new Date().toISOString()
    }
}