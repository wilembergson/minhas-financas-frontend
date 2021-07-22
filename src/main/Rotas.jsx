import React from 'react'

import Login from '../views/Login'
import Home from '../views/Home'
import CadastroUsuario from '../views/CadastroUsuario'
import ConsultaLancamentos from '../views/ConsultaLancamentos'
import CadastroLancamentos from '../views/CadastroLancamentos'
import AuthService from '../Services/AuthService'

import {Route, Switch, HashRouter, Redirect} from 'react-router-dom'

function RotaAutenticada({component: Component, ...props}){
    return(
        <Route {...props} render={(componentProps) => {
            if(AuthService.isUsuarioAutenticado()){
                return(
                    <Component {...componentProps}/>
                )
            }else{
                return(
                    <Redirect to={ {pathname: '/login', state: {from: componentProps.location}} }/>
                )
            }
        }}/>
    )
}

export default function Rotas(){
    return(
        <HashRouter>
            <Switch>
                <div className="container">
                    <Route path="/login" component={Login}/>
                    <Route path="/cadastroUsuario" component={CadastroUsuario}/>

                    <RotaAutenticada path="/home" component={Home}/>
                    <RotaAutenticada path="/consultaLancamentos" component={ConsultaLancamentos }/>
                    <RotaAutenticada path="/cadastroLancamentos/:id?" component={CadastroLancamentos }/>

                </div>
            </Switch>
        </HashRouter>
    )
}