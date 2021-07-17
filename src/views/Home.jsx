import React, { useState } from 'react'

import ApiServices from '../Services/ApiServices'

export default function Home(){
    const [saldo, setSaldo] = useState(0)

    const usuarioLogadoString = localStorage.getItem('_usuario_logado')
    const usuarioLodado = JSON.parse(usuarioLogadoString)

    ApiServices.obterSaldo(usuarioLodado.id)
            .then(response => {
                setSaldo(response.data)
            }).catch(error => {
                console.error(error.response)
            })

    return(
        <div className="container">
            <div className="jumbotron">
                <h1 className="display-3">Bem vindo, {usuarioLodado.nome}!</h1>
                <p className="lead">Esse é seu sistema de finanças.</p>
                <p className="lead">Seu saldo para o mês atual é de R${saldo}</p>
                <hr className="my-4"/>
                <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
                <p className="lead">
                  <a className="btn btn-primary btn-lg" href="#/cadastroUsuario" role="button"><i className="fa fa-users"></i>  Cadastrar Usuário</a>
                  <a className="btn btn-danger btn-lg" href="https://bootswatch.com/flatly/#" role="button"><i className="fa fa-users"></i>  Cadastrar Lançamento</a>
                </p>
            </div>
        </div>
    )
}