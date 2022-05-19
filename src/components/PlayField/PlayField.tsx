import  { FC } from "react";
import FieldRow from "../FieldRow/FieldRow";
import './PlayField.css'
interface fieldProps{
    addInField?:(element:EventTarget & HTMLDivElement)=>string|null
}
const PlayField:FC<fieldProps> = ({addInField})=>{
    return(
        <div className="header__play-field field">
            <FieldRow addInField={addInField} coordinateY='0'></FieldRow>
            <FieldRow addInField={addInField} coordinateY='1'></FieldRow>
            <FieldRow addInField={addInField} coordinateY='2'></FieldRow>
            <FieldRow addInField={addInField} coordinateY='3'></FieldRow>
            <FieldRow addInField={addInField} coordinateY='4'></FieldRow>
            <FieldRow addInField={addInField} coordinateY='5'></FieldRow>
            <FieldRow addInField={addInField} coordinateY='6'></FieldRow>
            <FieldRow addInField={addInField} coordinateY='7'></FieldRow>
            <FieldRow addInField={addInField} coordinateY='8'></FieldRow>
        </div>
    )
}
export default PlayField