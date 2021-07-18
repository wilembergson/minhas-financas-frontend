import axios from "axios"

const baseUrl = 'http://localhost:8080'

export default class ApiServices{
    
    static obterSaldo(id){
        return axios.get(`${baseUrl}/api/usuarios/${id}/saldo`)
    }

    static autenticar(obj={}){
        return axios.post(`${baseUrl}/api/usuarios/autenticar`, obj);
    }

    static salvarUsuario(obj={}){
        return axios.post(`${baseUrl}/api/usuarios`, obj)
    }

    static consultarLancamento(lancamentoFiltro){
        let params = `?ano=${lancamentoFiltro.ano}`

        if(lancamentoFiltro.mes){
            params = `${params}&mes=${lancamentoFiltro.mes}`
        }

        if(lancamentoFiltro.tipo){
            params = `${params}&tipo=${lancamentoFiltro.tipo}`
        }

        if(lancamentoFiltro.status){
            params = `${params}&status=${lancamentoFiltro.status}`
        }

        if(lancamentoFiltro.usuario){
            params = `${params}&usuario=${lancamentoFiltro.usuario}`
        }

        return axios.get(`${baseUrl}/api/lancamentos${params}`)
    }
}


