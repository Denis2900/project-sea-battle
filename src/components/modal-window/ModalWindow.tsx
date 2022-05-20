import React, { FC, useState } from "react";
import oponentsField from '../../state_management/addingShipInOponentsField';
import addingShip from '../../state_management/addingShips';
import { observer } from "mobx-react";
import {rules} from '../RulesOfGame'
import './modalWindow.css'
const ModalWindow:FC = observer(()=>{
    const [modalWindoClassList,setModalWidnowClassList] = useState<string>('modal-window modalWindow-show-left')
    const modalWindowButtonFunction = (event:React.MouseEvent<HTMLButtonElement>)=>{
        let callback = ()=>{}
        if(event.currentTarget.textContent === 'Назад'){
            setModalWidnowClassList('modal-window modalWindow-hide-left')
            callback = ()=>{
                setModalWidnowClassList('modal-window modalWindow-show-right')
            }
        }
        else{
            setModalWidnowClassList('modal-window modalWindow-hide-right')
            callback = ()=>{setModalWidnowClassList('modal-window modalWindow-show-left')}
        }
        addingShip.setTimeoutFunction(500,callback)
        let indexOfRules = 0
        rules.forEach((page,index)=>{
             if(JSON.stringify(oponentsField.objectOfModalWindow) === JSON.stringify(page)){
                 indexOfRules = index
             }
        })
        if(event.currentTarget.textContent === 'Далее'){
           oponentsField.objectOfModalWindow = rules[indexOfRules+1]
        }
        else if(event.currentTarget.textContent === 'Назад'){
            oponentsField.objectOfModalWindow = rules[indexOfRules-1]
        }
        else{
            if(event.currentTarget.textContent === 'Начать с начала'){
                oponentsField.restartGame()
            }
            oponentsField.modalWindowDisplayStyle = 'none'
        }
    }
    const closeModalWindow = (event:React.MouseEvent<HTMLDivElement>)=>{
      let target = event.target as HTMLDivElement
      if(target.classList.contains('chell')){
          oponentsField.modalWindowDisplayStyle = 'none'
      }
    }
    return(
        <div className="chell" style={{display:oponentsField.modalWindowDisplayStyle}} onClick={closeModalWindow}>
            <div className={modalWindoClassList}>
                <div className="modalWindow__title">
                    {oponentsField.objectOfModalWindow.title}
                </div>
                <div className="modalWindow__sub-title">
                    {oponentsField.objectOfModalWindow.subTitle}
                </div>
                <div className="modalWindow__main-text">
                    <p className="modalWindow__paragraph">{oponentsField.objectOfModalWindow.mainText.firstParagraph}</p>
                    <p className="modalWindow__paragraph">{oponentsField.objectOfModalWindow.mainText.secondParagraph}</p>
                    <p className="modalWindow__paragraph">{oponentsField.objectOfModalWindow.mainText.firdPagagraph}</p>
                </div>
                <div className="modalWindow__button-block">
                    <button className="standart-button button-add" onClick={modalWindowButtonFunction}>{oponentsField.objectOfModalWindow.firstButtonText}</button>
                    <button className="standart-button button-remove" style={{display:oponentsField.objectOfModalWindow.secondButtonText?'inline-block':'none'}} 
                    onClick={modalWindowButtonFunction}>{oponentsField.objectOfModalWindow.secondButtonText}</button>
                </div>
            </div>
        </div>
    )
})
export default ModalWindow