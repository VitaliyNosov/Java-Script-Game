var $start = document.querySelector('#start')
var $game = document.querySelector('#game')
var $time = document.querySelector('#time')
var $result = document.querySelector('#result')
var $timeHeader = document.querySelector('#time-header')
var $resultHeader = document.querySelector('#result-header')
var $gameTime = document.querySelector('#game-time')

var colors = ['red','blue','green','yellow','pink'] // массив цветов

var score = 0
var isGameStarted = false

// Добавляем прослушки событий

$start.addEventListener('click', startGame)
$game.addEventListener('click', handlBoxClick)
$gameTime.addEventListener('input', setGameTime)


function show($el) { // функция показывает елементы игры
  $el.classList.remove('hide')
}

function hide($el) { // функция прячит элементы игры
  $el.classList.add('hide')
}


function startGame() {
  score = 0 // обноляем наше значение для того чтобы можно было игру запускать повторно
  setGameTime() // вызоваем функцию
  $gameTime.setAttribute('disabled', 'true') // блокируем input что бы вовремя игры не было возможности менять время
  isGameStarted = true // значение true игра началась
  console.log('start')
  hide($start) // скрываем кнопку
  $game.style.backgroundColor = '#fff' // красим поле где будет игра

  var interval = setInterval(function() { // переменная с функцией интервала времени

    var time = parseFloat($time.textContent)
    if(time <= 0) {
      clearInterval(interval) // метод который прерывает интервал
      endGame() // функция окончания игры
    } else{
      $time.textContent = (time - 0.1).toFixed(1) 
    }
    console.log(interval, $time.textContent)

  },100)

  renderBox() // вызываем функцию которая генерит кладраты
}

function setGameScore() {
  $result.textContent = score.toString() // добавляем результат в выбранный элемент result
}

function setGameTime() {
  var time = +$gameTime.value // значение input, через + приводим значение к числу
  $time.textContent = time.toFixed(1) // задаем значение в один знак
  show($timeHeader) // скрываем элемент
  hide($resultHeader) // добавляем элемент
}

function endGame() {

  isGameStarted = false // значения false и игра закончена
  setGameScore() // вызываем функцию с результатом значений кликов
  $gameTime.removeAttribute('disabled') // отключаем блокировку input 
  show($start) // удаляем скрытие элемента hide
  $game.innerHTML = '' // удалаяем квадрат по завершению игры
  $game.style.backgroundColor = '#ccc' // возвращаем цвет
  hide($timeHeader) // показываем timeHeader
  show($resultHeader) // показываем результат
 
}

function handlBoxClick(event){
  console.log(event.target.dataset.box)
  
  if(!isGameStarted) { // проверка на завершение игры
    return
  }
  
  if(event.target.dataset.box){ // отлавливаем клик по квадрату
    score++  // добавляем клик для вывода значения
    renderBox()
  }

}

function renderBox(){
  //console.log(getRandom(30, 100)) // можно увидеть случайное значение в консоли

  $game.innerHTML = '' // очищаем квадрат от повторений в DOM при клике

  var boxSize = getRandom(30, 100) // переменная случайных координат квадрата

  var gameSize = $game.getBoundingClientRect() // переменна с фукцией которая определяет размер поля игры

  console.log(gameSize)
  
  var maxTop = gameSize.height - boxSize // высчитываем отклонение сверху
  var maxLeft = gameSize.width - boxSize // высчитываем отклонени слева
  var randomColorIndex = getRandom(0, colors.length) // задает случайный цвет беря его из массива
  var box = document.createElement('div') // создаем квадрат

  box.style.height = box.style.width = boxSize + 'px' // задаем размер
  box.style.position = 'absolute' // задаем позиционирование
  box.style.backgroundColor = colors[randomColorIndex] // задаем цвет
  box.style.top = getRandom(0, maxTop) + 'px'  // Задаем оступы
  box.style.left = getRandom(0, maxLeft) + 'px' // Задаем оступы 
  box.style.cursor = 'pointer' // Задаем свойство курсора
  box.setAttribute('data-box', 'true') // добавляем атрибут


  $game.insertAdjacentElement('afterbegin', box) // добавляем сам елемент

}

function getRandom(min, max) { // фукция случайного значения
  return Math.floor(Math.random() * (max - min) + min) // задаем случайное значение
}



