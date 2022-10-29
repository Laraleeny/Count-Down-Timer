//создать переменные 
const header = document.querySelector('#title-date');
const btnStart = document.querySelector('#btn');
const btnReset = document.querySelector('#btn-reset');

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
   document.querySelector('.input').classList.add('hide');
   document.querySelector('.output').classList.remove('hide');
}

// при нажатии кнопки "Начать" запускается таймер
 const startTimer = () => {
    //меняем значение заголовка
    document.querySelector('h1').innerHTML = header.value;
    header.value = '';
   //проверка значения даты
   const valueDate = document.querySelector('#date').value;
   if (valueDate === '') {
        alert("Пожалуйста введите дату");
   } else {
        switchScreen();
   }
};

btnStart.addEventListener('click', startTimer);

