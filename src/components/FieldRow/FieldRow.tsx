import { FC } from "react";
import { observer } from "mobx-react-lite";
import addingShips from "../../state_management/addingShips";
import './FieldRow.css'
interface fieldRowProps{
    addInField?:(element:EventTarget & HTMLDivElement)=>string|null
    coordinateY:string
}
const FieldRow:FC<fieldRowProps> = observer(({addInField,coordinateY})=>{
    const callFunctionProps = (event:React.MouseEvent<HTMLDivElement>,coordinateY:string,coordinateX:string):void=>{
        const element = event.currentTarget
        if(!element.getAttribute('coordinateX') && !element.getAttribute('coordinateY')){
            element.setAttribute('coordinateX',coordinateX)
            element.setAttribute('coordinateY',coordinateY)
        }
        if(addInField){
           const className:string|null = addInField(element)
           if(className){
               element.classList.add(className)
               addingShips.arrayOfButtonBlockCells?.children[addingShips.shipLength-addingShips.currentShipLength - 1].classList.add('red-cells')
               if(className.includes('background')){
                    const callback = ()=>{
                        element.classList.remove(className)
                    }
                    addingShips.setTimeoutFunction(3000,callback)
               }
           } 
        }
    }
    return(
        <div className="field__row">
            <div className="field__cell" onClick={(event)=>{callFunctionProps(event,coordinateY,'0')}}></div>
            <div className="field__cell" onClick={(event)=>{callFunctionProps(event,coordinateY,'1')}}></div>
            <div className="field__cell" onClick={(event)=>{callFunctionProps(event,coordinateY,'2')}}></div>
            <div className="field__cell" onClick={(event)=>{callFunctionProps(event,coordinateY,'3')}}></div>
            <div className="field__cell" onClick={(event)=>{callFunctionProps(event,coordinateY,'4')}}></div>
            <div className="field__cell" onClick={(event)=>{callFunctionProps(event,coordinateY,'5')}}></div>
            <div className="field__cell" onClick={(event)=>{callFunctionProps(event,coordinateY,'6')}}></div>
            <div className="field__cell" onClick={(event)=>{callFunctionProps(event,coordinateY,'7')}}></div>
            <div className="field__cell" onClick={(event)=>{callFunctionProps(event,coordinateY,'8')}}></div>
        </div>
    )
})
export default FieldRow