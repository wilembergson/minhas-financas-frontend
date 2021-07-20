import React, { useEffect, useState } from 'react' 
import Card from '../components/Cards'
import SelectMenu from '../components/SelectMenu'

import { withRouter } from 'react-router-dom'
import FormGroup from '../components/FormGroup'
import * as messages from '../components/Taostr'

import ApiServices from '../Services/ApiServices'
import LocalStorageService from '../Services/LocalStorageService'

function CadastroLancamentos(props){
    
    const tipos = ApiServices.obterListaTipos()
    const meses = ApiServices.obterListaMeses()

    const [descricao, setDescricao] = useState('')
    const [valor, setValor] = useState('')
    const [mes, setMes] = useState('')
    const [ano, setAno] = useState('')
    const [tipo, setTipo] = useState('')
    const [status, setStatus] = useState('')

    const [lancamento, setLancamento] = useState({
                                            id: null,
                                            descricao: '',
                                            valor: '',
                                            mes: '',
                                            ano: '',
                                            tipo: '',
                                            status: '',
                                            usuario: null
                                        })

    function submeter(){
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

        setLancamento({
            descricao: descricao,
            valor: valor,
            mes: mes,
            ano: ano,
            tipo: tipo,
            usuario: usuarioLogado.id
        }) 

        ApiServices.salvarLancamento(lancamento)
                    .then(response => {
                        props.history.push('/consultaLancamentos')
                        messages.mensagemSucesso('Lançamento cadastrado com sucesso.')
                    }).catch(error => {
                       messages.mensagemErro(error.response.data)
                    })
    }

    useEffect(() => {
        setDescricao(lancamento.descricao)
        setValor(lancamento.valor)
        setMes(lancamento.mes)
        setAno(lancamento.ano)
        setTipo(lancamento.tipo)
    }, [lancamento])

    const params = props.match.params
    if(params.id){
        ApiServices.obterLancamentoPorId(params.id)
                    .then(response => {
                        setLancamento({...response.data})
                    })
                    .catch(erros => {
                        messages.mensagemErro(erros.response.data)
                    })
    }

    

    function atualizar(){
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

        setLancamento({
            id: params.id,
            descricao: descricao,
            valor: valor,
            mes: mes,
            ano: ano,
            tipo: tipo,
            usuario: usuarioLogado.id
        }) 

        ApiServices.atualizarLancamento(lancamento)
                    .then(response => {
                        props.history.push('/consultaLancamentos')
                        messages.mensagemSucesso('Lançamento atualizado com sucesso.')
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
                    <button onClick={atualizar} className="btn btn-primary">Atualizar</button>
                    <button onClick={e => props.history.push('/consultaLancamentos')} className="btn btn-danger">Cancelar</button>

                </div>
            </div>
        </Card>
    )
}

export default withRouter(CadastroLancamentos)