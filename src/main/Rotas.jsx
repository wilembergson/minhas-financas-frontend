import React from 'react'

import Login from '../views/Login'
import CadastroUsuario from '../views/CadastroUsuario'
import {Route, Switch, HashRouter} from 'react-router-dom'

export default function Rotas(){
    return(
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/cadastroUsuario" component={CadastroUsuario}/>
            </Switch>
        </HashRouter>
    )
}