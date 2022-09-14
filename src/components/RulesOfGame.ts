import { IobjectOfModalWindow } from "../types/types"
export const rules:IobjectOfModalWindow[] = [
    {
        title:'Правила игры',
        mainText:{
            firstParagraph:'1.Расставьте корабли в порядке уменьшения их длины.',
            secondParagraph:'Для этого нажмите на клавишу "добавить", а затем нажмите на клетку левого поля.',
            firdPagagraph:'Для изменения положения корабля нажмите кнопку "удалить", а затем повторить попытку.'
        },
        firstButtonText:'Закрыть',
        secondButtonText:'Далее'
    },
    {
        title:'Правила игры',
        mainText:{
            firstParagraph:'2.При расстановке корабля отмечайте клетки только в одну сторону.',
            secondParagraph:'Корабли не могут соприкасаться гранями между собой.',
            firdPagagraph:'На поле должны быть расставлены все корабли.'
        },
        firstButtonText:'Назад',
        secondButtonText:'Далее'
    },
    {
        title:'Правила игры',
        mainText:{
            firstParagraph:'3. После расстановки кораблей нажмите на кнопку "играть".',
            secondParagraph:'Если вы нажмете на кнопку "играть" изменить расстановку будет нельзя.',
            firdPagagraph:'Игра ведется до тех пор, пока у игроков есть неподбитые корабли.'
        },
        firstButtonText:'Назад',
        secondButtonText:'Далее'
    },
    {
        title:'Правила игры',
        mainText:{
            firstParagraph:'4. На выстрел у игрока есть минута, если игрок не уложился в минуту он пропускает ход.',
            secondParagraph:'Если игрок попал в корабль он продолжает стрелять до тех пор, пока не промахнется.',
            firdPagagraph:'Корабль считается подтопленным если у него подбиты все клетки.'
        },
        firstButtonText:'Назад',
        secondButtonText:'Закрыть'
    }
]