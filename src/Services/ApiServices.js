import axios from "axios"

const baseUrl = 'http://localhost:8080'

export default new class ApiServices{
    
    obterSaldo(id){
        return axios.get(`${baseUrl}/api/usuarios/${id}/saldo`)
    }

    autenticar(obj={}){
        return axios.post(`${baseUrl}/api/usuarios/autenticar`, obj);
    }
}

