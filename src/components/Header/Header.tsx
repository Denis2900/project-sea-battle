import react, { FC, useState } from 'react'
import GameBoard from '../GameBoard/GameBoard'
import PlayField from '../PlayField/PlayField'
import addingShips from "../../state_management/addingShips";
import oponentsField from '../../state_management/addingShipInOponentsField';
import { observer } from 'mobx-react-lite';
import './Header.css'
const Header:FC = observer(()=>{
    const [displayValue, setDisplayValue] = useState<string>('none')
    const clickInPlayButton = (event:React.MouseEvent<HTMLButtonElement>):void=>{
        setDisplayValue('block');
        addingShips.playButtonDisplay = 'none'
        oponentsField.displayFieldControlBlock = 'none'
        const field = event.currentTarget.parentElement?.children[3]
        const arrayOfObjects = [
            {length:4,name:'four'},
            {length:3,name:'firstThree'},
            {length:3,name:'secondThree'},
            {length:2,name:'firstTwo'},
            {length:2,name:'secondTwo'},
            {length:2,name:'firdTwo'},
            {length:1,name:'firstOne'},
            {length:1,name:'secondOne'},
            {length:1,name:'firdOne'},
            {length:1,name:'fourthOne'}
        ]
        if(field){
            oponentsField.addShips(arrayOfObjects,field)
        }
    }
    return(
        <div className='header'>
            <PlayField addInField={addingShips.addInMyField}></PlayField>
            <button className='header__playButton' style={{display:addingShips.arrayOfAllElements.length === 20 && addingShips.playButtonDisplay === 'block'?'block':'none'}} 
            onClick={clickInPlayButton}>Играть</button>
            <GameBoard visibled={displayValue}></GameBoard>
            <PlayField addInField={displayValue === 'block'?oponentsField.fireOnTheOponentsField:undefined}></PlayField>
        </div>
    )
})
export default Header