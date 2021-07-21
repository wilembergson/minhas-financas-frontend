import React from 'react' 
import currencyFormater from 'currency-formatter'

export default function LancamentosTable({lancamentos, alterarStatus, editAction, deleteAction}){

    return(
        <table className="table table-hover">
            <thead>
                <tr>
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
                        <tr key={lancamento.id}>
                            <td>{lancamento.id}</td>
                            <td>{lancamento.descricao}</td>
                            <td>{currencyFormater.format(lancamento.valor, {locale: 'pt-BR'})}</td>
                            <td>{lancamento.tipo}</td>
                            <td>{lancamento.mes}</td>
                            <td>{lancamento.status}</td>
                            <td>
                                <button onClick={e => alterarStatus(lancamento, 'EFETIVADO')} disabled={lancamento.status !== 'PENDENTE'} type="button" className="btn btn-success" title="Efetivar">
                                    <i className="pi pi-check"/>
                                </button>

                                <button onClick={e => alterarStatus(lancamento, 'CANCELADO')} disabled={lancamento.status !== 'PENDENTE'} type="button" className="btn btn-warning" title="Cancelar">
                                    <i className="pi pi-times"/>
                                </button>

                                <button onClick={e => editAction(lancamento.id)} type="button" className="btn btn-primary">
                                    <i className="pi pi-pencil" title="Editar"/>
                                </button>

                                <button onClick={e => deleteAction(lancamento)} type="button" className="btn btn-danger">
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