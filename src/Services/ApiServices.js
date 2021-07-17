import axios from "axios"

const baseUrl = 'http://localhost:8080'

export default class ApiServices{
    
    static obterSaldo(id){
        return axios.get(`${baseUrl}/api/usuarios/${id}/saldo`)
    }

    static autenticar(obj={}){
        return axios.post(`${baseUrl}/api/usuarios/autenticar`, obj);
    }
}

