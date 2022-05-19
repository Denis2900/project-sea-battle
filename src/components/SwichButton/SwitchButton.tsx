import React, { FC } from "react"
import oponentsField from '../../state_management/addingShipInOponentsField'
import { observer } from "mobx-react-lite"
import './switchButton.css'
interface SwitchButtonProps{
    name:string
}
const SwichButton:FC<SwitchButtonProps> = observer(({name})=>{
    const addOrRemoveClassName = (event:React.MouseEvent<HTMLDivElement>)=>{
        if(name==="Sound"){
             oponentsField.soundStatus = !oponentsField.soundStatus
        }
        else{
            oponentsField.pause = !oponentsField.pause
        }
        if(event.currentTarget.classList.contains('switch-on')){
            event.currentTarget.classList.add('switch-off')
            event.currentTarget.classList.remove('switch-on')
        }
        else{
            event.currentTarget.classList.add('switch-on')
            event.currentTarget.classList.remove('switch-off')
        }
    }
    return(
        <div className="switch-button" onClick={addOrRemoveClassName}>
            <div className="switch-button__circle">

            </div>
        </div>
    )
})
export default SwichButton 