import LocalStorageService from "./LocalStorageService"

const USUAIO_LOGADO = '_usuario_logado'

export default class AuthService{
    
    static isUsuarioAutenticado(){
        const usuario = LocalStorageService.obterItem(USUAIO_LOGADO)
        return usuario && usuario.id
    }

    static removerUsuarioLogado(){
        LocalStorageService.removerItem(USUAIO_LOGADO)
    }
}