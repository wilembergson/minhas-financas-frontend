import React from 'react'

import NavbarItem from './NavbarItem'
import AuthService from '../Services/AuthService'

const deslogar = () => {
  AuthService.removerUsuarioLogado()
}

export default function Navbar(){
    return(
    <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
      <div className="container">
            <a href="https://bootswatch.com/" className="navbar-brand">Minhas Finanças</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav">
                    <NavbarItem href="#/home" label="Home"/>
                    <NavbarItem href="#/cadastroUsuario" label="Usuários"/>
                    <NavbarItem href="#/consultaLancamentos" label="Lançamentos"/>
                    <NavbarItem onClick={deslogar} href="#/login" label="Sair"/>
                </ul>
            </div>
      </div>
    </div>

    )
}