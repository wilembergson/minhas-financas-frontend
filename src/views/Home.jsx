import React, { useState } from 'react'
import './Home.css'

import ApiServices from '../Services/ApiServices'
import { AuthContext } from '../main/ProvedorAutenticacao'

export default function Home(props){
    const contexto = React.useContext(AuthContext)
    const [saldo, setSaldo] = useState(0)

    const usuarioLogado = contexto.usuarioAutenticado

    ApiServices.obterSaldo(usuarioLogado.id)
            .then(response => {
                setSaldo(response.data)
            }).catch(error => {
                console.error(error.response)
            })

    function cadUsuario(){
        props.history.push('/cadastroUsuario')
    }

    function cadLancamento(){
        props.history.push('/cadastroLancamentos')
    }

    return(
        <div className="jumbotron">
                <h1 className="display-3">Bem vindo, {usuarioLogado.nome}!</h1>
                <p className="lead">Esse é seu sistema de finanças.</p>
                <p className="lead">Seu saldo atualmente é de R${saldo}</p>
                <hr className="my-4"/>
                <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
                
                <button onClick={cadUsuario} className="button-primary">
                    <i className="pi pi-users"/> Cadastrar usuário
                </button>
                <button onClick={cadLancamento} className="button-primary">
                <i className="pi pi-money-bill"/> Castrar Lançamento
                </button>
        </div>
    )
}