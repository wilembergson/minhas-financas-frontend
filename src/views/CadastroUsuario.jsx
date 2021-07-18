import React, { useState } from 'react'
import { withRouter } from 'react-router-dom';

import Card from '../components/Cards'
import FormGroup from '../components/FormGroup'
import ApiServices from '../Services/ApiServices';
import {mensagemErro, mensagemSucesso} from '../components/Taostr'

function CadastroUsuario(props){

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaRepeticao, setSenhaRepericao] = useState('');

    const state = {
        nome: nome, 
        email: email,
        senha: senha, 
        senhaRepeticao: senhaRepeticao
    }

    function validar(){
        const msgs = []

        if(!state.nome){
            msgs.push('O campo nome é obrigatório.')
        }

        if(!state.email){
            msgs.push('O campo email é obrigatório.')
        }else if(!state.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)){
            msgs.push('Informe um email valido.')
        }

        if(!state.senha || !state.senhaRepeticao){
            msgs.push('Digite a senha 2x.')
        }else if(state.senha !== state.senhaRepeticao){
            msgs.push('As senhas não batem.')
        }

        return msgs
    }

    function cadastrar(){
        const msgs = validar()

        if(msgs && msgs.length > 0){
            msgs.forEach((msg, index) => {
                mensagemErro(msg)
            })
            return false
        }

        const usuario = {
            email: state.email,
            nome: state.nome,
            senha: state.senha
        }
        ApiServices.salvarUsuario(usuario)
        .then(response => {
            mensagemSucesso('Usuario cadastrado com sucesso. Faça o login para acessar o sistema.')
            props.history.push('/login')
        }).catch(error => {
            mensagemErro(error.response.data)
        })
        
    }

    function cancelar(){
        props.history.push('/login')
    }

    return(
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
    )
}

export default withRouter(CadastroUsuario)