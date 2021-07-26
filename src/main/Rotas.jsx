import React from 'react'

import Login from '../views/Login'
import Home from '../views/Home'
import CadastroUsuario from '../views/CadastroUsuario'
import ConsultaLancamentos from '../views/ConsultaLancamentos'
import CadastroLancamentos from '../views/CadastroLancamentos'
//import AuthService from '../Services/AuthService'
import {AuthConsumer} from '../main/ProvedorAutenticacao'

import {BrowserRouter, Route, Switch, Redirect, HashRouter} from 'react-router-dom'

function RotaAutenticada({component: Component, isUsuarioAutenticado, ...props}){
    return(
        <Route {...props} render={(componentProps) => {
            if(isUsuarioAutenticado){
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

function Rotas(props){
    return(
        <HashRouter>
            <Switch>
                <div className="container">
                    <Route path="/login" component={Login}/>
                    <Route path="/cadastroUsuario" component={CadastroUsuario}/>

                    <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/home" component={Home}/>
                    <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/consultaLancamentos" component={ConsultaLancamentos }/>
                    <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/cadastroLancamentos/:id?" component={CadastroLancamentos }/>

                </div>
            </Switch>
        </HashRouter>
    )
}

export default () => (
    <AuthConsumer>
        { (context) => (<Rotas isUsuarioAutenticado={context.isAutenticado} />)}
    </AuthConsumer>
)