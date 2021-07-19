import React from 'react' 
import currencyFormater from 'currency-formatter'

export default function LancamentosTable({lancamentos, editAction, deleteAction}){

    return(
        <table className="table table-hover">
            <thead>
                <tr>
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
                            <td>{lancamento.descricao}</td>
                            <td>{currencyFormater.format(lancamento.valor, {locale: 'pt-BR'})}</td>
                            <td>{lancamento.tipo}</td>
                            <td>{lancamento.mes}</td>
                            <td>{lancamento.status}</td>
                            <td>
                                <button onClick={e => editAction(lancamento.id)} type="button" className="btn btn-primary">Editar</button>
                                <button onClick={e => deleteAction(lancamento)} type="button" className="btn btn-danger">Deletar</button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}