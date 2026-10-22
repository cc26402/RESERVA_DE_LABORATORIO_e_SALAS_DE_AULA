import Status from "../models/Status.js";

class StatusController{
    static async listarStatus(req, res){
        try{
            const listarStatus = await Status.buscarTodos();  
            res.status(200).json(listarStatus);
        }
        catch(error){
            res.status(500).json({message: `${error} - falha na requisição`})
        }
    }
}

export default StatusController;