import React from 'react'

import NavbarItem from './NavbarItem'
import AuthService from '../Services/AuthService'
import { AuthConsumer } from '../main/ProvedorAutenticacao'

const deslogar = () => {
  AuthService.removerUsuarioLogado()
}

/*const isUsuarioAutenticado = () => {
  return AuthService.isUsuarioAutenticado()
}*/

function Navbar(props){



    return(
    <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
      <div className="container">
            <a href="#/home" className="navbar-brand">Minhas Finanças</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav">
                    <NavbarItem render={props.isUsuarioAutenticado} href="#/home" label="Home"/>
                    <NavbarItem render={props.isUsuarioAutenticado} href="#/cadastroUsuario" label="Usuários"/>
                    <NavbarItem render={props.isUsuarioAutenticado} href="#/consultaLancamentos" label="Lançamentos"/>
                    <NavbarItem render={props.isUsuarioAutenticado} onClick={props.deslogar} href="#/login" label="Sair"/>
                </ul>
            </div>
      </div>
    </div>

    )
}

export default () => (
  <AuthConsumer>
    {(context) => (
      <Navbar isUsuarioAutenticado={context.isAutenticado} deslogar={context.encerrarSessao} />
    )}
  </AuthConsumer>
)