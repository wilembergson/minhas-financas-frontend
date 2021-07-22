import React, { useState } from 'react' 
import AuthService from '../Services/AuthService'

export const AuthContext = React.createContext()
export const AuthConsumer = AuthContext.Consumer
const AuthProvider = AuthContext.Provider

export default function ProvedorAutenticacao(props){

    const [state, setState] = useState({
        usuarioAutenticado: null,
        isAutenticado: false
    })

    function iniciarSessao(usuario){
        AuthService.logar(usuario)
        setState({isAutenticado: true, usuarioAutenticado: usuario})
    }

    function encerrarSessao(){
        AuthService.removerUsuarioLogado(usuario)
        setState({isAutenticado: false, usuarioAutenticado: null})
    }

    const contexto = {
        usuarioAutenticado: state.usuarioAutenticado,
        isAutenticado: state.isAutenticado,
        iniciarSessao: iniciarSessao,
        encerrarSessao: encerrarSessao
    }

    return(
        <AuthProvider value={contexto}>
            {props.children}
        </AuthProvider>
    )
}