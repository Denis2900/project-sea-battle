import React, {FC} from "react";
import addingShips from "../../state_management/addingShips";
import './ButtonBlock.css'
interface ButtonBlockProps{
    numberOfCells:number,
    name:string
}
const ButtonBlock:FC<ButtonBlockProps> = ({numberOfCells,name})=>{
    const arrayOfCells:React.ReactNode[] = [] 
    for(let i = 0; i < numberOfCells;i++){
        const div:React.ReactElement<HTMLDivElement> = <div className="field-control__cell" key={i}></div>
        arrayOfCells.push(div)
    }
    const addValueInCurrentShipLength = (event:React.MouseEvent<HTMLButtonElement>):void=>{
        event.currentTarget.classList.add('clickInButton')
        let deleteCallback = ()=>{
            event.currentTarget.classList.remove('clickInButton')
        }
        addingShips.setTimeoutFunction(1000,deleteCallback)
        const button = event.currentTarget
        if(!button.classList.contains('button-disabled')){
            addingShips.currentShipLength = numberOfCells
            addingShips.shipName = name
            addingShips.shipLength = numberOfCells
            addingShips.arrayOfButtonBlockCells = event.currentTarget.parentElement?.children[0]
            button.classList.add('button-disabled')
        }
    
    }
    const removeShipOfField = (event:React.MouseEvent<HTMLButtonElement>):void=>{
        const array = event.currentTarget.parentElement?.children[0].children
        const addButton = event.currentTarget.previousElementSibling
        addButton?.classList.remove('button-disabled')
        arrayOfCells.forEach((element,index)=>{
            if(array){
               array[index].classList.remove('red-cells')
            }
        })
        addingShips.removeShipOfThisLength(name)
    }
    return(
        <div className="filed-control__button-block">
            <div className="field-control__cells">{arrayOfCells}</div>
            <button className="standart-button button-add" onClick={addValueInCurrentShipLength}>Добавить</button>
            <button className="standart-button button-remove" onClick={removeShipOfField}>Удалить</button>
        </div>
    )
}
export default ButtonBlock