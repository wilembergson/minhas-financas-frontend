import React from 'react' 
import './LancamentosTable.css'
import currencyFormater from 'currency-formatter'

export default function LancamentosTable({lancamentos, alterarStatus, editAction, deleteAction}){

    return(
        <table className="t-table">
            <thead>
                <tr className="t-row">
                    <th scope="col">ID</th>
                    <th scope="col">Descrição</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Mês</th>
                    <th scope="col">Situação</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>

            <tbody>
                {lancamentos.map(lancamento => {
                    return(
                        <tr className="t-row" key={lancamento.id}>
                            <td>{lancamento.id}</td>
                            <td>{lancamento.descricao}</td>
                            <td>{currencyFormater.format(lancamento.valor, {locale: 'pt-BR'})}</td>
                            <td>{lancamento.tipo}</td>
                            <td>{lancamento.mes}</td>
                            <td>{lancamento.status}</td>
                            <td>
                                <button onClick={e => alterarStatus(lancamento, 'EFETIVADO')} disabled={lancamento.status !== 'PENDENTE'} type="button" className="button-confirm" title="Efetivar">
                                    <i className="pi pi-check"/>
                                </button>

                                <button onClick={e => alterarStatus(lancamento, 'CANCELADO')} disabled={lancamento.status !== 'PENDENTE'} type="button" className="button-warning" title="Cancelar">
                                    <i className="pi pi-times"/>
                                </button>

                                <button onClick={e => editAction(lancamento.id)} type="button" className="button-primary">
                                    <i className="pi pi-pencil" title="Editar"/>
                                </button>

                                <button onClick={e => deleteAction(lancamento)} type="button" className="button-cancel">
                                    <i className="pi pi-trash" title="Excluir"/>
                                </button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}