import React, { useState } from 'react' 
import { withRouter } from 'react-router-dom'
import Card from '../components/Cards'
import FormGroup from '../components/FormGroup'
import SelectMenu from '../components/SelectMenu'
import LancamentosTable from './LancamentosTable'

import ApiServices from '../Services/ApiServices'
import LocalStorageService from '../Services/LocalStorageService'

function ConsultaLancamentos(){
    const [ano, setAno] = useState('')
    const [mes, setMes] = useState('')
    const [tipo, setTipo] = useState('')
    const [lancamentos, setLancamentos] = useState([])
    

    function buscar(){
        
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

       const lancamentoFiltro = {
            tipo: tipo,
            ano: ano,
            mes: mes,
            usuario: usuarioLogado.id
        }

        ApiServices.consultarLancamento(lancamentoFiltro)
                .then(resposta => {
                    setLancamentos(resposta.data)
                })
                .catch(error => {
                    console.log(error)
                })
    }

    const meses = [
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

    const tipos = [
        {label:'SELECIONE', value: ''},
        {label:'Despesa', value: 'DESPESA'},
        {label:'Receita', value: 'RECEITA'}
    ]

    return(
        <Card title="Consulta Lançamentos">
            <div className="row">
                <div className="col-md-6">
                    <div className="bs-component">
                        <FormGroup htmlFor="inputAno" label="Ano: *">
                            <input type="text"
                                    className="form-control"
                                    id="inputAno"
                                    value={ano}
                                    onChange={e => setAno(e.target.value)}
                                    placeholder="Digite o ano" />
                        </FormGroup>

                        <FormGroup htmlFor="inputMes" label="Mês: ">
                            <SelectMenu id="inputMes"
                                        value={mes}
                                        onChange={e => setMes(e.target.value)}
                                        className="form-control"
                                        lista={meses}/>
                        </FormGroup>

                        <FormGroup htmlFor="inputTipo" label="Tipo lançamento: ">
                            <SelectMenu id="inputTipo"
                                        value={tipo}
                                        onChange={e => setTipo(e.target.value)}
                                        className="form-control"
                                        lista={tipos}/>
                        </FormGroup>

                        <button onClick={buscar} type="button" className="btn btn-success">Buscar</button>       
                        <button type="button" className="btn btn-danger">Cadastrar</button>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="bs-component">
                        <LancamentosTable lancamentos={lancamentos}/>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default withRouter(ConsultaLancamentos)