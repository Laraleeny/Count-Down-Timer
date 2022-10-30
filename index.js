//создать переменные 
const header = document.querySelector('#title-date');
const timerHeader = document.querySelector('h1');
const btnStart = document.querySelector('#btn');
const btnReset = document.querySelector('#btn-reset');
const blockInput = document.querySelector('.input');
const blockOutput = document.querySelector('.output');
const dateMonth = document.querySelector('#date');
let valueDate ;

// сброс - все в начальное состояние
const handleReset = () => {
    console.log('Reset');
};

btnReset.addEventListener('click', handleReset);

const switchScreen = () => {
    //скрыть кнопку "Начать" и вывести кнопку "Сброс"
   btnStart.classList.add('hide');
   btnReset.classList.remove('hide');
   //скрыть блок с инпутами и вывести блок с аутпут
   blockInput.classList.add('hide');
   blockOutput.classList.remove('hide');
}

// при нажатии кнопки "Начать" запускается таймер
 const startTimer = () => {
    //меняем значение заголовка
    timerHeader.innerHTML = header.value;
    header.value = '';
   //проверка значения даты
   valueDate = dateMonth.value;
   if (valueDate === '') {
        alert("Пожалуйста введите дату");
   } else {
        switchScreen();
   }
};

btnStart.addEventListener('click', startTimer);

