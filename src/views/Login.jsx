import React, { useState } from 'react'
import Card from '../components/Cards'
import FormGroup from '../components/FormGroup'
import { withRouter } from 'react-router-dom'
import ApiServices from '../Services/ApiServices'
import {mensagemErro} from '../components/Taostr.js'

function Login(props){

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    function entrar(){
        ApiServices.autenticar({email: email, senha: senha})
            .then(response => {
                localStorage.setItem('_usuario_logado', JSON.stringify(response.data))
                props.history.push('/home')
            })
            .catch(erro => {
                mensagemErro(erro.response.data)
            })
    }

    function prepareCadastrar(){
        props.history.push('/cadastroUsuario')
    }

    return(
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
    )
}

export default withRouter(Login)