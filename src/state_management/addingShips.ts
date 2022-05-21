import { makeAutoObservable } from "mobx"
import oponentsField from '../state_management/addingShipInOponentsField';
class AddingShips{
    constructor(){
        makeAutoObservable(this)
    }
    arrayOfCellsShip:HTMLDivElement[] | never[] = []
    arrayOfAllElements:(Element | never)[] = []
    currentShipLength:number = 0
    shipLength:number = 0
    playButtonDisplay:string = 'none'
    arrayOfButtonBlockCells:undefined|Element
    wrackedShips:number = 0
    arrayWrackedShipName:string[] = []
    allWracked:number = 0
    shipName:string = ''
    arrayOfNeighborElement:Element[][] = []
    addInMyField = (element: HTMLDivElement):string|null=>{
        if(!this.currentShipLength){
            return null   
        }
        if(element.classList.contains('blue-cells') || element.getAttribute('busy_cells')){
            return null
        }
        if(this.arrayOfCellsShip.length>0){
            const index:number = this.arrayOfCellsShip.length-1
            const firstAsnwer:boolean = this.checkedNeighborElement(element,index)
            if(firstAsnwer){
                if(this.arrayOfCellsShip[0].getAttribute('coordinateX') === element.getAttribute('coordinateX') || this.arrayOfCellsShip[0].getAttribute('coordinateY') === element.getAttribute('coordinateY')){   
                    this.currentShipLength--
                    this.arrayOfCellsShip = [...this.arrayOfCellsShip,element]
                    element.setAttribute('shipName',String(this.shipName))
                    element.setAttribute('lengthShip',String(this.shipLength))
                    this.arrayOfAllElements = [...this.arrayOfAllElements,element]
                    if(this.currentShipLength === 0){
                        this.playButtonDisplay =  this.arrayOfAllElements.length===20?'block':'none'
                        this.arrayOfCellsShip.forEach((element)=>{
                            this.addOrRemoveAttributeInCells(element,'busy_cells',this.shipName,'add')
                        })
                        this.arrayOfCellsShip = [] 
                    }
                    return 'blue-cells'
                }
            }
        }
        else{
            element.setAttribute('shipName',String(this.shipName))
            element.setAttribute('lengthShip',String(this.shipLength))
            this.currentShipLength--
            this.arrayOfCellsShip = [...this.arrayOfCellsShip,element]
            this.arrayOfAllElements = [...this.arrayOfAllElements,element]
            if(this.currentShipLength === 0){
                this.playButtonDisplay =  this.arrayOfAllElements.length===20?'block':'none'
                this.addOrRemoveAttributeInCells(element,'busy_cells',this.shipName,'add')
                this.arrayOfCellsShip = []
            }
            return 'blue-cells'
        }
        return null
    }
    checkedNeighborElement = (element:EventTarget & HTMLDivElement,indexOfArray:number):boolean=>{
        const elementInArray = this.arrayOfCellsShip[indexOfArray]
        const attributeLastElement:number = Number(elementInArray.getAttribute('coordinateX'))
        if(elementInArray.nextElementSibling === element || elementInArray.previousElementSibling === element){
            return true
        }
        if(elementInArray.parentElement?.nextElementSibling){
            const elementInNextRow = elementInArray.parentElement?.nextElementSibling.children[attributeLastElement]
            if(elementInNextRow === element){
                return true
            }
        }
        if(elementInArray.parentElement?.previousElementSibling){
            const elementInPreviousRow = elementInArray.parentElement?.previousElementSibling.children[attributeLastElement]
            if(elementInPreviousRow === element){
                return true
            }
        }
        return false
    }
    addOrRemoveAttributeInCells = (element:EventTarget & HTMLDivElement | Element,attribute:string,attributeValue:string,command?:string):void=>{
        if(element.nextElementSibling){
            command?element.nextElementSibling.setAttribute(attribute,attributeValue):element.nextElementSibling.removeAttribute(attribute)
        }
        if(element.previousElementSibling){
            command?element.previousElementSibling.setAttribute(attribute,attributeValue):element.previousElementSibling.removeAttribute(attribute)
        }
        const attributeElement:number = Number(element.getAttribute('coordinateX'))
        if(element.parentElement?.nextElementSibling){
            const elementInNextRow = element.parentElement.nextElementSibling.children[attributeElement]
            command?elementInNextRow.setAttribute(attribute,attributeValue):elementInNextRow.removeAttribute(attribute)
        }
        if(element.parentElement?.previousElementSibling){
            const elementInPreviousRow = element.parentElement.previousElementSibling.children[attributeElement]
            command?elementInPreviousRow.setAttribute(attribute,attributeValue):elementInPreviousRow.removeAttribute(attribute)
        }
    }
    removeShipOfThisLength = (name:string):void=>{
        this.arrayOfAllElements = this.arrayOfAllElements.filter((element)=>{
            if(element.getAttribute('shipName') === name){
                element.classList.remove('blue-cells')
                element.removeAttribute('lengthShip')
                element.removeAttribute('shipName')
                this.addOrRemoveAttributeInCells(element,'busy_cells',name)
            }
            else{
                return element
            }
        })
        this.arrayOfCellsShip = []
    }
    fire = ()=>{
        const field = this.arrayOfAllElements[0].parentElement?.parentElement
        let arrayOfFreeElement:Element[] = []
        if(field){
            if(this.arrayOfNeighborElement.length>0){
                this.repeatedFire(field,field)
                return null
            }
            field.childNodes.forEach((row,rowIndex)=>{
                row.childNodes.forEach((item,columnIndex)=>{
                   const freeElement = field.children[rowIndex].children[columnIndex]
                   const freeElementAttribute = freeElement.getAttribute('busy_cells')
                   if(!freeElement.classList.contains('red-cells') && !freeElement.classList.contains('orange-cells') && !freeElement.classList.contains('black-cells')){
                        let bool:boolean = true
                        if(freeElementAttribute){
                            bool = this.arrayWrackedShipName.includes(freeElementAttribute)?false:true
                        }
                        if(bool){
                            arrayOfFreeElement = [...arrayOfFreeElement,freeElement]
                        }   
                   }
                })
            })
            const randomIndex:number = oponentsField.randomIndex(0,arrayOfFreeElement.length)
            const randomElement = arrayOfFreeElement[randomIndex]
            const className = oponentsField.classDefention(randomElement,this.arrayOfAllElements)
            const callback = ()=>{
                randomElement.classList.remove(className)
            }
            this.setTimeoutFunction(3000,callback)
            randomElement.classList.add(className)
            if(className === 'background-gif-water'){
                oponentsField.waiting = false
                oponentsField.repeatStrike = true
            }
            else{
                this.allWracked++
                let callback:()=>void
                oponentsField.repeatStrike = false
                if(randomElement.classList.contains('red-cells')){
                    this.wrackedShips++
                    callback = ()=>{
                        const answer:string|null = oponentsField.checkedWinGame()
                        if(answer){
                            return null
                        }
                        this.fire()
                    }
                }
                else{
                    callback = ()=>{
                        this.repeatedFire(field,randomElement)
                    } 
                }
                this.setTimeoutFunction(5000,callback)
            }
        }
    }
    repeatedFire = (field:Element,element:Element)=>{
        const row = element.parentElement
        const coordinateXOfElement:number = Number(element.getAttribute('coordinateX'))
        const coordinateYOfElement:number = Number(element.getAttribute('coordinateY'))
        let randomArray:Element[] = []
        let className:string = ''
        let randomIndex:number = 0
        if(this.arrayOfNeighborElement.length > 0){
            if(this.arrayOfNeighborElement[0][0].classList.contains('orange-cells')){
                this.arrayOfNeighborElement[0].shift()
                if(this.arrayOfNeighborElement[0].length === 0){
                    this.arrayOfNeighborElement.shift()
                } 
            }
            else{
                randomIndex = oponentsField.randomIndex(0,this.arrayOfNeighborElement.length)
            }
            randomArray = this.arrayOfNeighborElement[randomIndex]
            className = oponentsField.classDefention(this.arrayOfNeighborElement[randomIndex][0],this.arrayOfAllElements)
        }
        else{
            if(row){
                let arrayOfNeighborElements = oponentsField.findNeighborElements(row,field,coordinateYOfElement,coordinateXOfElement,1,4)
                arrayOfNeighborElements = arrayOfNeighborElements.filter((smallArray)=>{
                    if(smallArray.length !== 0 && !smallArray[0].classList.contains('black-cells')){
                        return smallArray
                    }
                })
                this.arrayOfNeighborElement = arrayOfNeighborElements
                randomIndex = oponentsField.randomIndex(0,arrayOfNeighborElements.length)
                randomArray = arrayOfNeighborElements[randomIndex]
                className = oponentsField.classDefention(randomArray[0],this.arrayOfAllElements)
            }
        }
        randomArray[0].classList.add(className)
        if(randomArray[0].classList.contains('red-cells')){
            this.allWracked++
            oponentsField.repeatStrike = false
            this.wrackedShips++
            this.arrayOfNeighborElement = []
            const callback = ()=>{
                randomArray[0].classList.remove(className)
                const answer:string|null = oponentsField.checkedWinGame()
                if(answer){
                    return null
                }
                this.fire()
            }
            this.setTimeoutFunction(5000,callback)
            return null
        }
        if(className === 'background-gif-explosion'){
            this.allWracked++
            oponentsField.repeatStrike = false
            let plane:string|null = ''
            if(randomArray[0].getAttribute('coordinateX') === String(coordinateXOfElement)){
                plane = randomArray[0].getAttribute('coordinateX')
            }
            else{
                plane = randomArray[0].getAttribute('coordinateY')
            }
            this.arrayOfNeighborElement = this.arrayOfNeighborElement.filter((array,index)=>{
                if((array[0].getAttribute('coordinateX') === plane || array[0].getAttribute('coordinateY') === plane) && index !== randomIndex ){
                    return array
                }
            })
            this.arrayOfNeighborElement.unshift(randomArray)
            const callback = ()=>{
                randomArray[0].classList.remove(className)
                const answer:string|null = oponentsField.checkedWinGame()
                if(answer){
                    return null
                }
                this.repeatedFire(field,element)
            }
            this.setTimeoutFunction(5000,callback)
        }
        else{
            oponentsField.repeatStrike = true
            this.arrayOfNeighborElement = this.arrayOfNeighborElement.filter((array,index)=>{
                if(randomIndex !== index && !array[0].classList.contains('black-cells')){
                    return array
                }
            })
            oponentsField.waiting = false
            const callback = ()=>{
                randomArray[0].classList.remove(className)
            }
            this.setTimeoutFunction(5000,callback)
        }
    }
    setTimeoutFunction = (time:number,callback:()=>void)=>{
        setTimeout(callback,time)
    } 
}
export default new AddingShips