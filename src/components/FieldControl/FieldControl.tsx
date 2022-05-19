import { FC } from "react"
import ButtonBlock from "../ButtonBlock/ButtonBlock"
import oponentField from '../../state_management/addingShipInOponentsField'
import './FieldControl.css'
import { observer } from "mobx-react-lite"
const FieldControl:FC=observer(()=>{
    return(
        <div className="field-control" style={{display:oponentField.displayFieldControlBlock}}>
            <ButtonBlock numberOfCells={4} name="four"></ButtonBlock>
            <ButtonBlock numberOfCells={3} name="firstThree"></ButtonBlock>
            <ButtonBlock numberOfCells={3} name="secondThree"></ButtonBlock>
            <ButtonBlock numberOfCells={2} name="firstTwo"></ButtonBlock>
            <ButtonBlock numberOfCells={2} name="secondTwo"></ButtonBlock>
            <ButtonBlock numberOfCells={2} name="thirdTwo"></ButtonBlock>
            <ButtonBlock numberOfCells={1} name="firstOne"></ButtonBlock>
            <ButtonBlock numberOfCells={1} name="secondOne"></ButtonBlock>
            <ButtonBlock numberOfCells={1} name="thirdOne"></ButtonBlock>
            <ButtonBlock numberOfCells={1} name="fourthOne"></ButtonBlock>
        </div>
    )
})
export default FieldControl