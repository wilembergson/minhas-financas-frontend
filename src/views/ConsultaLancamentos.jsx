import React, { useState, useEffect } from 'react' 
import { withRouter } from 'react-router-dom'
import Card from '../components/Cards'
import FormGroup from '../components/FormGroup'
import SelectMenu from '../components/SelectMenu'
import LancamentosTable from './LancamentosTable'

import ApiServices from '../Services/ApiServices'
import LocalStorageService from '../Services/LocalStorageService'
import * as messages from '../components/Taostr'

function ConsultaLancamentos(){
    const [ano, setAno] = useState('')
    const [mes, setMes] = useState('')
    const [tipo, setTipo] = useState('')
    const [descricao, setDescricao] = useState('')
    const [lancamentos, setLancamentos] = useState([])
    
    function buscar(){
        if(!ano){
            messages.mensagemErro('O preenchimento do campo ano é obrigatório.')
            return false
        }

        atualizarTabela()
    }

    function editar(id){
        console.log('Editando o lançamento.', id)
    }

    function deletar(id){
        ApiServices.deletarLancamento(id)
                    .then(response => {
                        atualizarTabela()
                        messages.mensagemSucesso('Lançamento deletado com sucesso.')
                    }).catch(error => {
                        messages.mensagemErro('Ocorreu um erro ao tentar deletar o lançamento.')
                    })
    }

    function atualizarTabela(){
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')
        const lancamentoFiltro = {
            tipo: tipo,
            ano: ano,
            mes: mes,
            descricao: descricao,
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

    const meses = ApiServices.obterListaMeses()

    const tipos = ApiServices.obterListaTipos()

    useEffect(() => {
        
    }, [lancamentos])

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

                        <FormGroup htmlFor="inputDesc" label="Descrição: ">
                            <input type="text"
                                    className="form-control"
                                    id="inputDesc"
                                    value={descricao}
                                    onChange={e => setDescricao(e.target.value)}
                                    placeholder="Digite uma descrição" />
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
                        <LancamentosTable lancamentos={lancamentos} editAction={editar} deleteAction={deletar}/>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default withRouter(ConsultaLancamentos)