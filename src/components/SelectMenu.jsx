import React from 'react' 

export default function SelectMenu(props){
    const options = props.lista.map((option, index) => {
        return(
            <option key={index} value={option.value}> {option.label} </option>
        )
    })

    return(
        <select {...props}>
            {options}
        </select>
    )
}