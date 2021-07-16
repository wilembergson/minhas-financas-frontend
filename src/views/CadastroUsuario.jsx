import React, { useState } from 'react'
import { withRouter } from 'react-router-dom';

import Card from '../components/Cards'
import FormGroup from '../components/FormGroup'

function CadastroUsuario(props){

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaRepeticao, setSenhaRepericao] = useState('');

    const state = {nome: nome, email: email, senha: senha, senhaRepeticao: senhaRepeticao}

    function cadastrar(){
        console.log(state)
    }

    function cancelar(){
        props.history.push('/login')
    }

    return(
        <div className="container">
            <Card title="Cadastro de usuário">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <FormGroup label="Nome: *" htmlForm="inputNome">
                                <input type="text"
                                        id="inputNome"
                                        className="form-control"
                                        name="nome"
                                        onChange={e => setNome(e.target.value)}/>
                            </FormGroup>

                            <FormGroup label="Email: *" htmlForm="inputEmail">
                                <input type="email"
                                        id="inputEmail"
                                        className="form-control"
                                        name="email"
                                        onChange={e => setEmail(e.target.value)}/>
                            </FormGroup>

                            <FormGroup label="Senha: *" htmlForm="inputSenha">
                                <input type="password"
                                        id="inputSenha"
                                        className="form-control"
                                        name="senha"
                                        onChange={e => setSenha(e.target.value)}/>
                            </FormGroup>

                            <FormGroup label="Repita a Senha: *" htmlForm="inputRepitaSenha">
                                <input type="password"
                                        id="inputRepitaSenha"
                                        className="form-control"
                                        name="senha"
                                        onChange={e => setSenhaRepericao(e.target.value)}/>
                            </FormGroup>

                            <button onClick={cadastrar} type="button" className="btn btn-success">Salvar</button>
                            <button onClick={cancelar} type="button" className="btn btn-danger">Cancelar</button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default withRouter(CadastroUsuario)