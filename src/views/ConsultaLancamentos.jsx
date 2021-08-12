import React, { useState } from 'react' 
import { withRouter } from 'react-router-dom'
import Card from '../components/Cards'
import FormGroup from '../components/FormGroup'
import SelectMenu from '../components/SelectMenu'
import LancamentosTable from './LancamentosTable'

import ApiServices from '../Services/ApiServices'
import LocalStorageService from '../Services/LocalStorageService'
import * as messages from '../components/Toastr'

import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'

function ConsultaLancamentos(props){
    const [ano, setAno] = useState('')
    const [mes, setMes] = useState('')
    const [tipo, setTipo] = useState('')
    const [descricao, setDescricao] = useState('')
    const [showConfirmDialog, setShowConfirmDialog] = useState(false)
    const [lancamentoDeletar, setLancamentoDeletar] = useState({})
    const [lancamentos, setLancamentos] = useState([])
    
    function buscar(props){
        if(!ano){
            messages.mensagemErro('O preenchimento do campo ano é obrigatório.')
            return false
        }
        
        atualizarTabela()
    }

    function editar(id){
        props.history.push(`/cadastroLancamentos/${id}`)
    }

    function abirConfirmacao(lancamento){
        setShowConfirmDialog(true)
        setLancamentoDeletar(lancamento)
    }

    function cancelarDelecao(){
        setShowConfirmDialog(false)
        setLancamentoDeletar({})
    }

    function deletar(){
        ApiServices.deletarLancamento(lancamentoDeletar.id)
                    .then(response => {
                        atualizarTabela()
                        setShowConfirmDialog(false)
                        messages.mensagemSucesso('Lançamento deletado com sucesso.')
                    }).catch(error => {
                        messages.mensagemErro('Ocorreu um erro ao tentar deletar o lançamento.')
                    })
    }

    function atualizarTabela(){
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')
        const lancamentoFiltro = {
            ano: ano,
            mes: mes,
            descricao: descricao,
            tipo: tipo,
            usuario: usuarioLogado.id
        }
                
        ApiServices.consultarLancamento(lancamentoFiltro)
                    .then(resposta => {
                        const lista = resposta.data

                        if(lista.length < 1){
                            messages.mensagemAlert("Nenhum resultado encontrado.")
                        }
                        setLancamentos(resposta.data)
                    })
                    .catch(error => {
                        console.log(error)
                    })
    }

    const meses = ApiServices.obterListaMeses()

    function confirmDialogFooter(){
        return(
            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={deletar}/>
                <Button label="Cancelar" icon="pi pi-times" onClick={cancelarDelecao} className="p-button-secundary"/>
            </div>
        )
    }

    function preparaFormularioCadastro(){
        props.history.push('/cadastroLancamentos')
    }

    function alterarStatus(lancamento, status){
        ApiServices.alterarStatus(lancamento.id, status)
                    .then(response => {
                        const copiaLancamentos = lancamentos
                        const index = copiaLancamentos.indexOf(lancamento)
                        if(index !== -1){
                            lancamento['status'] = status
                            copiaLancamentos[index] = lancamento
                            setLancamentos(copiaLancamentos)
                            atualizarTabela()


                        }
                        messages.mensagemSucesso("Status atualizado com sucesso.")
                    })
    }

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


                        <button onClick={buscar} type="button" className="button-confirm">
                            <i className="pi pi-search"/>  Buscar
                        </button>
                               
                        <button onClick={preparaFormularioCadastro} type="button" className="button-primary">
                        <i className="pi pi-plus"/>  Cadastrar
                        </button>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="bs-component">
                        <LancamentosTable lancamentos={lancamentos}
                                            alterarStatus ={alterarStatus}
                                            editAction={editar}
                                            deleteAction={abirConfirmacao}
                                            />
                    </div>
                </div>
            </div>

            <div>
                <Dialog header="Confirmação"
                        visible={showConfirmDialog} 
                        onHide={() => setShowConfirmDialog(false)} 
                        footer={confirmDialogFooter}
                        breakpoints={{'960px': '75vw', '640px': '100vw'}} 
                        style={{width: '50vw'}}>
                    Tem certeza que deseja excluir este lançameto?
                </Dialog>
            </div>
        </Card>
    )
}

export default withRouter(ConsultaLancamentos)