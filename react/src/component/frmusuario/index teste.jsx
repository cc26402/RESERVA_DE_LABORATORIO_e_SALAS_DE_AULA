
import { Select } from "../select";

export default function FrmUsuarioTeste(dadosUsuario){
    const metodo = (dadosUsuario ? "PATCH" : "POST")
    const url = (dadosUsuario ? `http://localhost:8080/usuarios/${dadosUsuario.CPF}` : `http://localhost:8080/usuarios`)
    let dadosFrm = (dadosUsuario ? dadosUsuario : {CPF: "", prenome:"", sobrenome:"", nascimento: "", celular:"", email:"", idNivelAcesso:"0"});

    function handlerSubmit(evento){
        console.log(evento)
        evento.preventDefault();
        const CPF = document.getElementById("CPF");
        const prenome = document.getElementById("nome");
        const sobrenome = document.getElementById("sobrenome");
        const nascimento = document.getElementById("nascimento");
        const celular = document.getElementById("celular");
        const email = document.getElementById("email");
        const idNivelAcesso = document.getElementById("selectNivelAcesso");
        const dadosEnvio = {
            CPF: CPF.value,
            prenome: prenome.value,
            sobrenome: sobrenome.value,
            nascimento: nascimento.value,
            celular: celular.value,
            email: email.value,
            idNivelAcesso: idNivelAcesso.value
        };

        fetch(url,
                {
                    method: metodo,
                    header: {'Content-type' : 'application/json'},
                    body: JSON.stringify(dadosEnvio)
                }
            )
            .then(response => {
                if(!response.ok) throw new Error('Erro ao submeter dados');
                alert(metodo=="POST" ? "Usuario cadastrado com sucesso" : "Usuario editado com sucesso");
                if (metodo=="POST") resetaCampos();
            })
            .catch(() => {
                alert(metodo=="POST" ? "Erro ao cadastrar o usuário" : "Erro ao editar o usuário");
                if (metodo=="PATCH") resetaCampos();
            })
    }

    function resetaCampos(){
        CPF.value = dadosFrm.CPF;
        prenome.value = dadosFrm.prenome;
        sobrenome.value = dadosFrm.sobrenome;
        nascimento.value = dadosFrm.nascimento;
        celular.value = dadosFrm.celular;
        email.value = dadosFrm.email;
        idNivelAcesso.value = dadosFrm.idNivelAcesso;
    }

    return (
        <>
            <form onSubmit={handlerSubmit}>
                <div>
                    <label htmlFor="">CPF</label>
                    <input type="text" id="CPF" defaultValue={dadosFrm.CPF}/>
                </div>
                <div>
                    <label htmlFor="">Nome</label>
                    <input type="text" id="nome" defaultValue={dadosFrm.prenome}/>
                </div>
                <div>
                    <label htmlFor="">Sobrenome</label>
                    <input type="text" id="sobrenome" defaultValue={dadosFrm.sobrenome}/>
                </div>
                <div>
                    <label htmlFor="">Data de Nascimento</label>
                    <input type="date" id="nascimento" defaultValue={(dadosFrm.nascimento.split("T"))[0]}/>
                </div>
                <div>
                    <label htmlFor="">Celular</label>
                    <input type="text" id="celular" defaultValue={dadosFrm.celular}/>
                </div>
                <div>
                    <label htmlFor="">E-mail</label>
                    <input type="text" id="email" defaultValue={dadosFrm.email}/>
                </div>
                <div>
                    <label htmlFor="">Nível de acesso</label>
                    <Select opcoes={niveisAcesso} chaveValor="idNivelAcesso" chaveTexto="nome" textoOptionPadrao="Selecione..." id="selectNivelAcesso" defaultValue={dadosFrm.idNivelAcesso}></Select>
                </div>
                <button>Salvar</button>
            </form>
        </>
    );
}