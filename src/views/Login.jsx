import React, { useState } from 'react'
import Card from '../components/Cards'
import FormGroup from '../components/FormGroup'
import { withRouter } from 'react-router-dom'

import axios from 'axios'

function Login(props){

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [mensagemErro, setMensagemErro] = useState(null)

    function entrar(){
        axios.post('http://localhost:8080/api/usuarios/autenticar', {email: email, senha: senha})
            .then(response => {props.history.push('/home')})
            .catch(erro => {setMensagemErro(erro.response.data)})
    }

    function prepareCadastrar(){
        props.history.push('/cadastroUsuario')
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-6" style={{position:'relative', left: '300px'}}>
                    <div className="bs-docs-section">
                        <Card title="Login">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                        <fieldset>
                                            <FormGroup label="Email: *" htmlFor="exampleInputEmail1">
                                                <input type="email"
                                                    value={email}
                                                     onChange={e => setEmail(e.target.value)}
                                                    className="form-control" 
                                                    id="exampleInputEmail1" 
                                                    aria-describedby="emailHelp" 
                                                    placeholder="Digite o Email"/>
                                            </FormGroup>

                                            <FormGroup label="Senha: *" htmlFor="exampleInputPassword1">
                                                <input type="password" 
                                                value={senha}
                                                onChange={e => setSenha(e.target.value)}
                                                className="form-control" id="exampleInputPassword1" aria-describedby="emailHelp" placeholder="Password"/>
                                            </FormGroup>

                                            <button className="btn btn-success" onClick={entrar}>Entrar</button>
                                            <button onClick={prepareCadastrar} className="btn btn-danger">Cadastar</button>

                                            <span>{mensagemErro}</span>

                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Login)