import { observer } from "mobx-react-lite";
import { FC } from "react";
import oponentsField from '../../state_management/addingShipInOponentsField';
import addingShips from "../../state_management/addingShips";
import SwitchButton from "../SwichButton/SwitchButton";
import useInterval from 'use-interval'
import './GameBoard.css'
interface gameBoardProps{
    visibled:string
}
const GameBoard:FC<gameBoardProps> = observer(({visibled})=>{
    useInterval(()=>{
        if(oponentsField.time > 0 && !oponentsField.waiting && oponentsField.oponentsCellsShip.length>0 && !oponentsField.pause){
            oponentsField.time--
            if(oponentsField.time === 0){
                oponentsField.time = 60
                addingShips.fire()
            }
        }
    },1000)
    return(
        <div className="game-board" style={{display:visibled}}>
            <div className="game-board__row row">
                <div></div>
                <div>Вы</div>
                <div>Соперник</div>
            </div>
            <div className="game-board__row row">
                <div className="row__item">Подбитые корабли</div>
                <div className="row__item">{oponentsField.wrackedShips}</div>
                <div className="row__item">{addingShips.wrackedShips}</div>
            </div>
            <div className="game-board__row row">
                <div className="row__item">Попадания</div>
                <div className="row__item">{oponentsField.allWracked}</div>
                <div className="row__item">{addingShips.allWracked}</div>
            </div>
            <div className="game-board__row row">
                <div className="row__item">Очередь выстрела</div>
                <div className="row__item">
                    <div className={oponentsField.repeatStrike?'row__green-circle row__circle':'row__circle'}></div>
                </div>
                <div className="row__item">
                    <div className={oponentsField.repeatStrike?'row__circle':'row__red-circle row__circle'}></div>
                </div>  
            </div>
            <div className="game-board__row row">
                <div className="row__item">Время</div>
                <div className="row__item">{oponentsField.time}</div>
                <div className="row__item">-</div>
            </div>
            <div className="game-board__row row">
                <div className="row__item">
                   <span>Звук</span> <SwitchButton name="Sound"></SwitchButton>
                </div>
                <div className="row__item">
                    <span>Пауза</span> <SwitchButton name="Pause"></SwitchButton>
                </div>
                <div className="row__item">
                   <button className="row__button button-add" onClick={()=>{oponentsField.restartGame()}}>Начать заного</button>
                </div>
            </div>
        </div>
    )
})
export default GameBoard
