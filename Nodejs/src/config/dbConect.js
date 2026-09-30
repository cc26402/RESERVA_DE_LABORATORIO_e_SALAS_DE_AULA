import 'dotenv/config';
import mssql from 'mssql';

const stringSQL = process.env.CONNECTION_STRING;
async function conectaBD() {
    try{
        await mssql.connect(stringSQL);
        return mssql;
    }
    catch(erro){
        console.log("Erro no acesso ao BD.", erro)
    }
}
export default conectaBD;