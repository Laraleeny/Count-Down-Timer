//создать переменные
const header = document.querySelector('#title-date');
const timerHeader = document.querySelector('h1');
const btnStart = document.querySelector('#btn');
const btnReset = document.querySelector('#btn-reset');
const blockInput = document.querySelector('.input');
const blockOutput = document.querySelector('.output');
const dateMonth = document.querySelector('#date');
const headerComplete = document.querySelector('.complete');
const headerStorage = localStorage.getItem('header');
const dateStorage = localStorage.getItem('date');
let currentDate = moment(); // дата на сегодняшний день
let timerDate, headerValue;
let intervalID = null;

timerDate = dateMonth.value;

// сброс - все в начальное состояние
const handleReset = () => {
  clearInterval(intervalID);
  timerHeader.textContent = 'Создать новый таймер обратного отсчета';
  header.value = '';
  dateMonth.valueAsDate = null;
  headerComplete.textContent = '';

  //скрыть кнопку "Сброс" и вывести кнопку "Начать"
   btnStart.classList.remove('hide');
   btnReset.classList.add('hide');
   //скрыть блок с аутпут и вывести блок с инпутам
   blockInput.classList.remove('hide');
   blockOutput.classList.add('hide');

   localStorage.removeItem('header');
   localStorage.removeItem('date');
};

btnReset.addEventListener('click', handleReset);

const switchScreen = () => {
  //скрыть кнопку "Начать" и вывести кнопку "Сброс"
  btnStart.classList.add('hide');
  btnReset.classList.remove('hide');
  //скрыть блок с инпутами и вывести блок с аутпут
  blockInput.classList.add('hide');
  blockOutput.classList.remove('hide');
};

//создаем функцию для добовления "0" перед значением
const putZero = (dateID) => {
  let result = dateID < 10 ? "0" + dateID : dateID;
  return result;
};

//создаем функцию с обратным отсчетом
const countDown = () => {
   currentDate = moment();
  //проверка на завершение таймера
  if (moment(timerDate).diff(currentDate) <= 0) {
    clearInterval(intervalID);
    headerComplete.classList.remove('hide');
    headerComplete.textContent = `${headerValue} завершился ${timerDate}`;
    return;
  }
  const days = Math.floor(moment(timerDate).diff(currentDate, 'days'));
  const hours = Math.floor(moment(timerDate).diff(currentDate, 'hours') % 24);
  const minutes = Math.floor(
    moment(timerDate).diff(currentDate, 'minutes') % 60);
  const seconds = Math.floor(
    moment(timerDate).diff(currentDate, 'seconds') % 60);
  document.querySelector('.numbers').textContent = 
  `${putZero(days)}:${putZero(hours)}:${putZero(minutes)}:${putZero(seconds)}`;
};


const startCount = () => {
    switchScreen();
    countDown();
    //вызываем функцию каждую секунду
    intervalID = setInterval(countDown, 1000);
  
}

// при нажатии кнопки "Начать" запускается таймер
const startTimer = () => {
  //меняем значение заголовка
  headerValue = header.value;
  timerHeader.innerHTML = headerValue; 
  //дату отсчета запоминаем в переменную
  timerDate = dateMonth.value;
  
  localStorage.setItem('header', headerValue);
  localStorage.setItem('date', timerDate);
  
  //проверка значения даты
  //проверка дата уже прошла
  if (moment(timerDate).isBefore(currentDate)) {
    alert("Дата уже прошла");
    return;
  }
  if (timerDate === '') {
    alert("Пожалуйста введите дату");
  } else {
    startCount();
  }
  
};

const isStorage = () => {
  if (!headerStorage && !dateStorage){
    return;
  }
  if (!!headerStorage) {
    timerHeader.textContent = headerStorage;
    timerDate = dateStorage;
  }
  
  startCount();
}

isStorage();

btnStart.addEventListener('click', startTimer);


