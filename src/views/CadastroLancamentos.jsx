import React, { useState } from 'react' 
import Card from '../components/Cards'
import SelectMenu from '../components/SelectMenu'

import { withRouter } from 'react-router-dom'
import FormGroup from '../components/FormGroup'
import * as messages from '../components/Taostr'

import ApiServices from '../Services/ApiServices'
import LocalStorageService from '../Services/LocalStorageService'

function CadastroLancamentos(){
    
    const tipos = ApiServices.obterListaTipos()
    const meses = ApiServices.obterListaMeses()

    const [descricao, setDescricao] = useState('')
    const [valor, setValor] = useState('')
    const [mes, setMes] = useState('')
    const [ano, setAno] = useState('')
    const [tipo, setTipo] = useState('')
    const [status, setStatus] = useState('')

    function submeter(){
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

        const lancamento = {
            descricao: descricao,
            valor: valor,
            mes: mes,
            ano: ano,
            tipo: tipo,
            usuario: usuarioLogado.id
        }

        ApiServices.salvarLancamento(lancamento)
                    .then(response => {
                        messages.mensagemSucesso('Lançamento cadastrado com sucesso.')
                    }).catch(error => {
                        messages.mensagemErro(error.response.data)
                    })
    }
    
    return(
        <Card title="Cadastro de lançamento">
            <div className="row">
                <div className="col-md-12">
                    <FormGroup id="inputDescricao" label="Descricao: *">
                        <input id="inputDescricao"
                                type="text"
                                className="form-control"
                                name="descricao"
                                value={descricao}
                                onChange={e => setDescricao(e.target.value)}/>
                    </FormGroup>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <FormGroup id="inputAno" label="Ano: *">
                        <input id="inputAno"
                                type="text"
                                name="ano"
                                value={ano}
                                onChange={e => setAno(e.target.value)}
                                className="form-control"/>
                    </FormGroup>
                </div>
                <div className="col-md-6">
                    <FormGroup id="inputMes" label="Mês: *">
                        <SelectMenu id="inputMes"
                                    lista={meses}
                                    className="form-control"
                                    name="mes"
                                    value={mes}
                                    onChange={e => setMes(e.target.value)}/>
                    </FormGroup>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4">
                    <FormGroup id="inputValor" label="Valor: *">
                        <input id="inputValor"
                                type="text"
                                className="form-control"
                                name="valor"
                                value={valor}
                                onChange={e => setValor(e.target.value)}/>
                    </FormGroup>
                </div>
                <div className="col-md-4">
                    <FormGroup id="inputTipo" label="Tipo: *">
                        <SelectMenu id="inputTipo"
                                    lista={tipos}
                                    className="form-control"
                                    name="tipo"
                                    value={tipo}
                                    onChange={e => setTipo(e.target.value)}/>
                    </FormGroup>
                </div>
                <div className="col-md-4">
                    <FormGroup id="inputStatus" label="Status: *">
                        <input type="text"
                                className="form-control"
                                name="status"
                                value={status}
                                disabled />
                    </FormGroup>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <button onClick={submeter} className="btn btn-success">Salvar</button>
                    <button className="btn btn-danger">Cancelar</button>

                </div>
            </div>
        </Card>
    )
}

export default withRouter(CadastroLancamentos)