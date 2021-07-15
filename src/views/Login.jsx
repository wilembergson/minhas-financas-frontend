import React, { useState } from 'react'
import Card from '../components/Cards'
import FormGroup from '../components/FormGroup'

export default function Login(){

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    function entrar(){
        console.log('Email: ', email)
        console.log('Senha: ', senha)
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-6" style={{position:'relative', left: '300px'}}>
                    <div className="bs-docs-section">
                        <Card title="Login">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                        <fieldset>
                                            <FormGroup label="Email: *" htmlFor="exampleInputEmail1">
                                                <input type="email"
                                                    value={email}
                                                     onChange={e => setEmail(e.target.value)}
                                                    className="form-control" 
                                                    id="exampleInputEmail1" 
                                                    aria-describedby="emailHelp" 
                                                    placeholder="Digite o Email"/>
                                            </FormGroup>

                                            <FormGroup label="Senha: *" htmlFor="exampleInputPassword1">
                                                <input type="password" 
                                                value={senha}
                                                onChange={e => setSenha(e.target.value)}
                                                className="form-control" id="exampleInputPassword1" aria-describedby="emailHelp" placeholder="Password"/>
                                            </FormGroup>

                                            <button className="btn btn-success" onClick={entrar}>Entrar</button>
                                            <button className="btn btn-danger">Cancelar</button>

                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}