import React from 'react' 
import { withRouter } from 'react-router-dom'
import Card from '../components/Cards'
import FormGroup from '../components/FormGroup'

function ConsultaLancamentos(){
    return(
        <Card title="Consulta Lançamentos">
            <div className="row">
                <div className="col-md-6">
                    <div className="bs-component">
                        <FormGroup htmlFor="inputAno" label="Ano: *">
                            <input type="text"
                                    class="form-control"
                                    id="inputAno"
                                    aria-describedby="emailHelp"
                                    placeholder="Digite o ano" />
                        </FormGroup>

                        
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default withRouter(ConsultaLancamentos)