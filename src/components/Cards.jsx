import './Cards.css'

export default function Card(props){
    return(
        <div className="card mb-3">
            <div className="header"><h3>{props.title}</h3></div>
            <div className="c-body">
                {props.children}
            </div>
        </div>
    )
}