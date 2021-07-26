import React from 'react'
import './Navbar.css'
import NavbarItem from './NavbarItem'
import { AuthConsumer } from '../main/ProvedorAutenticacao'

function Navbar(props){

    return(
    <div className="navbar navbar-expand-lg fixed-top navbar-dark">
      <div className="container">
            <a href="/home" className="navbar-brand">Minhas Finanças</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav">
                    <NavbarItem render={props.isUsuarioAutenticado} href="#/home" label="Home"/>
                    <NavbarItem render={props.isUsuarioAutenticado} href="#/cadastroUsuario" label="Usuários"/>
                    <NavbarItem render={props.isUsuarioAutenticado} href="#/consultaLancamentos" label="Lançamentos"/>
                    <NavbarItem render={props.isUsuarioAutenticado} onClick={props.deslogar} href="/#login" label="Sair"/>
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