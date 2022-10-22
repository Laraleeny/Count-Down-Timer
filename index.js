//создать переменные 
let header = document.querySelector('#title-date');
let date = document.querySelector('#date');
let btnStart = document.querySelector('#btn');
let btnReset = document.querySelector('#btn-reset');

// сброс - все в начальное состояние
const handleReset = () => {
    console.log('Reset');
}

btnReset.addEventListener('click', handleReset);

// при нажатии кнопки "Начать" запускается таймер
const startTimer = () => {
    console.log('D/H/M/S');
}

btnStart.addEventListener('click', startTimer);