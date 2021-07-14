import Ract from 'react'

export default function Card(props){
    return(
        <div className="card mb-3">
            <div className="card-header">{props.title}</div>
            <div className="card-body">
                {props.children}
            </div>
        </div>
    )
}