import { makeAutoObservable } from "mobx"
import addingShips from "./addingShips"
import { IobjectOfModalWindow } from "../types/types"
import {rules} from '../components/RulesOfGame'
class OponentsField{
    constructor(){
        makeAutoObservable(this)
    }
    oponentsCellsShip:Element[] = []
    wrackedShips:number = 0
    allWracked:number = 0
    waiting:boolean = false
    soundStatus:boolean = true
    repeatStrike:boolean = true
    modalWindowDisplayStyle:string ='block'
    displayFieldControlBlock:string = 'grid' 
    objectOfModalWindow:IobjectOfModalWindow = rules[0]
    time:number = 60
    pause:boolean = false
    addShips = (arrayOfLengthShips:{name:string,length:number}[],oponentsField:Element):null=>{
        const rowIndex:number = this.randomIndex(0,9)
        const columnIndex:number = this.randomIndex(0,9)
        const length:number = arrayOfLengthShips[0].length
        const row:Element = oponentsField.children[rowIndex]
        let allFindElement:Element[][] = []
        this.addCoordinateInElement(oponentsField)
        if(length === 1){
            const arrayOfFreeElements:Element[] = []
            for(let i = 0; i < oponentsField.children.length;i++){
                const row = oponentsField.children[i]
                for(let j = 0; j < row.children.length;j++){
                    const element = row.children[j]
                    if(!element.classList.contains('green') && !element.getAttribute('busy_cells')){
                        arrayOfFreeElements.push(element)
                    }
                }
            }
            const randomIndex:number = this.randomIndex(0,arrayOfFreeElements.length)
            const randomElement:Element = arrayOfFreeElements[randomIndex]
            this.oponentsCellsShip = [...this.oponentsCellsShip,randomElement]
            randomElement.classList.add('green')
            randomElement.setAttribute('lengthShip',String(length))
            addingShips.addOrRemoveAttributeInCells(randomElement,'busy_cells',arrayOfLengthShips[0].name,'add')
            arrayOfLengthShips.shift()
            if(arrayOfLengthShips.length > 0){
                this.addShips(arrayOfLengthShips,oponentsField)
            }
            return null
        }
        const callback = (element:Element):boolean=>{
            if(element.classList.contains('green') || element.getAttribute('busy_cells')){
                return true
            }
            else{
                return false
            }
        }
        allFindElement = this.findNeighborElements(row,oponentsField,rowIndex,columnIndex,0,length,callback)
        allFindElement =  allFindElement.filter((arrayOfElement)=>{
            if(arrayOfElement.length === length){
                return arrayOfElement
            }
        })
        if(allFindElement.length>0){
          const randomIndex = this.randomIndex(0,allFindElement.length)
          const randomFindArray:Element[] = allFindElement[randomIndex]
          this.oponentsCellsShip = [...this.oponentsCellsShip,...randomFindArray]
          randomFindArray.forEach((element)=>{
              element.classList.add('green')
              element.setAttribute('lengthShip',String(length))
              addingShips.addOrRemoveAttributeInCells(element,'busy_cells',arrayOfLengthShips[0].name,'add')
          })
          arrayOfLengthShips.shift()
        }
        if(arrayOfLengthShips.length>0){
           return this.addShips(arrayOfLengthShips,oponentsField) 
        }
        else{
            return null
        }
    }
    findNeighborElements = (row:Element,oponentsField:Element,rowIndex:number,columnIndex:number,firstIndex:number,length:number,callback?:(element:Element)=>boolean):Element[][]=>{
        const previousElement:Element[] = []
        const nextElement:Element[] = []
        const previousRowElement:Element[] = []
        const nextRowElement:Element[] = []
        for(let i = firstIndex; i < length;i++){
            let firstElement = row.children[columnIndex-i]
            if( firstElement && !(callback?callback(firstElement):undefined)){
                previousElement.push(firstElement)
            }
            let secondElement = row.children[columnIndex+i]
            if(secondElement && !(callback?callback(secondElement):undefined)){
                nextElement.push(secondElement)
            }
            let firdElement = oponentsField.children[rowIndex-i]
            if( firdElement && !(callback?callback(firdElement.children[columnIndex]):undefined)){
                previousRowElement.push(firdElement.children[columnIndex])
            }
            let fourthElement = oponentsField.children[rowIndex+i]
            if(fourthElement && !(callback?callback(fourthElement.children[columnIndex]):undefined)){
                nextRowElement.push(fourthElement.children[columnIndex])
            }
        }
        return [previousElement,nextElement,previousRowElement,nextRowElement]
    }
    randomIndex = (min:number,max:number):number=>{
        return Math.floor(Math.random()*(max-min))+min
    }
    addCoordinateInElement = (arrayOfElement:Element):void=>{
        arrayOfElement.childNodes.forEach((row,rowIndex)=>{
            row.childNodes.forEach((element,columnIndex)=>{
                arrayOfElement.children[rowIndex].children[columnIndex].setAttribute('coordinateX',String(columnIndex))
                arrayOfElement.children[rowIndex].children[columnIndex].setAttribute('coordinateY',String(rowIndex))
            })
        })
    }
    fireOnTheOponentsField = (element:EventTarget & HTMLDivElement):string|null=>{
        if(element.classList.contains('black-cells') || element.classList.contains('red-cells') || element.classList.contains('orange-cells') || this.waiting || this.pause){
            return null
        }
        this.waiting = true
        const className:string = this.classDefention(element,this.oponentsCellsShip)
        if(className === 'background-gif-water'){
            this.repeatStrike = false
            const callback = ()=>{
                addingShips.fire()
            }
            addingShips.setTimeoutFunction(5000,callback)
        }
        else{
            this.allWracked++
            if(element.classList.contains('red-cells')){
                this.wrackedShips++
                const callback = ()=>{
                    const answer:string|null = this.checkedWinGame()
                }
                addingShips.setTimeoutFunction(3000,callback)
            }
            this.waiting = false
        }
        this.time = 60
        return className
    }
    playAudio = (src:string):void=>{
        if(this.soundStatus){
            const audio = new Audio()
            audio.src = require(`../audio/${src}.mp3`)
            audio.autoplay = true
        }
    }
    classDefention = (element:Element,array:Element[]):string=>{
        if(array.includes(element)){
            const nameShip = element.getAttribute('busy_cells')
            const wreckedShipsCurrentLength = array.filter((element)=>{
                if(element.getAttribute('busy_cells') === nameShip && element.classList.contains('orange-cells')){
                    return element
                } 
            })
            if(wreckedShipsCurrentLength.length === Number(element.getAttribute('lengthShip'))-1){
                const elementAttribute = element.getAttribute('shipName')
                if(elementAttribute){
                    addingShips.arrayWrackedShipName.push(elementAttribute)
                }
                element.classList.add('red-cells')
                wreckedShipsCurrentLength.forEach((element)=>{
                    element.classList.remove('orange-cells')
                    element.classList.add('red-cells')
                })
            }
            else{
                element.classList.add('orange-cells')
            }
            this.playAudio('explosion')
            return 'background-gif-explosion'
        }
        else{
            this.playAudio('explosion-water')
            element.classList.add('black-cells')
            return 'background-gif-water'
        }
    }
    checkedWinGame = ():string|null=>{
        if(addingShips.allWracked === 20){
            this.createdObjectOfModalWindow('lost')
            return 'win'
        }
        if(this.allWracked === 20){
            this.createdObjectOfModalWindow('win')
            return 'lost'
        }
        return null
    }
    createdObjectOfModalWindow = (gameStatus:string)=>{
        this.modalWindowDisplayStyle = 'block'
        if(gameStatus === 'win'){
            this.objectOfModalWindow = {
                title:'Поздравляем, вы выиграли!',
                subTitle:'Статистика',
                mainText:{
                    firstParagraph:`Подбитые корабли-10, соперник-${addingShips.wrackedShips}`,
                    secondParagraph: `Попадания-20, соперник-${addingShips.allWracked}`
                },
                firstButtonText:'Начать с начала',
            }
        }
        else if(gameStatus === 'lost'){
            this.objectOfModalWindow = {
                title:'К сожалению, вы проиграли!',
                subTitle:'Статистика',
                mainText:{
                    firstParagraph:`Подбитые корабли-${this.wrackedShips}, соперник-10`,
                    secondParagraph: `Попадания-${this.allWracked}, соперник-20`
                },
                firstButtonText:'Начать с начала',
            }
            
        }
    }
    restartGame = ()=>{
        window.location.reload()
    }
}
export default new OponentsField