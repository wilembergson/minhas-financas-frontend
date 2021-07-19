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

        if(lancamentoFiltro.descricao){
            params = `${params}&descricao=${lancamentoFiltro.descricao}`
        }

        return axios.get(`${baseUrl}/api/lancamentos${params}`)
    }

    static deletarLancamento(id){
        return axios.delete(`${baseUrl}/api/lancamentos/${id}`)
    }

    static obterListaMeses(){
        return [
            {label:'SELECIONE', value: ''},
            {label:'Janeiro', value: 1},
            {label:'Fevereiro', value: 2},
            {label:'Março', value: 3},
            {label:'Abril', value: 4},
            {label:'Maio', value: 5},
            {label:'Junho', value: 6},
            {label:'Julho', value: 7},
            {label:'Agosto', value: 8},
            {label:'Setembro', value: 9},
            {label:'Outubro', value: 10},
            {label:'Novembro', value: 11},
            {label:'Dezembro', value: 12}
        ]
    }

    static obterListaTipos(){
        return [
            {label:'SELECIONE', value: ''},
            {label:'Despesa', value: 'DESPESA'},
            {label:'Receita', value: 'RECEITA'}
        ]
    }
}


