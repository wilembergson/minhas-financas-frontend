import React, { useState } from 'react'
import './Login.css'
import FormGroup from '../components/FormGroup'
import { withRouter } from 'react-router-dom'
import ApiServices from '../Services/ApiServices'
import {mensagemErro} from '../components/Toastr.js'
import { AuthContext } from '../main/ProvedorAutenticacao'



function Login(props){
    const contexto = React.useContext(AuthContext)

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    function entrar(){
        ApiServices.autenticar({email: email, senha: senha})
            .then(response => {
                //localStorage.setItem('_usuario_logado', JSON.stringify(response.data))
                contexto.iniciarSessao(response.data)
                props.history.push('/home')
            })
            .catch(erro => {
                mensagemErro(erro.response.data)
            })
    }

    function cancelar(){
        props.history.push('/cadastroUsuario')
    }

    return(
        <div className="login">
            <div className="logo">
                <h2>Minhas finanças</h2>
                <a className="nav-link" aria-current="page" onClick={cancelar}> Criar conta</a>
            </div>

            <div className="content">
                <h3 className="l-label">Login</h3>
                <fieldset>
                    <FormGroup label="Email" htmlFor="exampleInputEmail1">
                        <input type="email"
                            value={email}
                             onChange={e => setEmail(e.target.value)}
                            className="form-control" 
                            id="exampleInputEmail1" 
                            aria-describedby="emailHelp" 
                            placeholder="Digite o Email"/>
                    </FormGroup>

                    <FormGroup label="Senha" htmlFor="exampleInputPassword1">
                        <input type="password" 
                        value={senha}
                        onChange={e => setSenha(e.target.value)}
                        className="form-control" id="exampleInputPassword1" aria-describedby="emailHelp" placeholder="Password"/>
                    </FormGroup>

                    {/*<button className="btn btn-success" onClick={entrar}>
                        <i className="pi pi-sign-in"/> Entrar
                    </button>*/}
                    <button className="button" onClick={entrar}>
                        <i className="pi pi-sign-in"/> Entrar
                    </button>

                    <span>{mensagemErro}</span>

                </fieldset>
            </div>               
        </div>
    )
}


export default withRouter(Login)