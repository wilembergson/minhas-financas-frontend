import React from 'react'

import Login from '../views/Login'
import Home from '../views/Home'
import CadastroUsuario from '../views/CadastroUsuario'
import ConsultaLancamentos from '../views/ConsultaLancamentos'
import {Route, Switch, HashRouter} from 'react-router-dom'

export default function Rotas(){
    return(
        <HashRouter>
            <Switch>
                <div className="container">
                    <Route path="/home" component={Home}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/cadastroUsuario" component={CadastroUsuario}/>
                    <Route path="/consultaLancamentos" component={ConsultaLancamentos }/>
                </div>
            </Switch>
        </HashRouter>
    )
}