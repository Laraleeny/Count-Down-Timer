//создать переменные
const header = document.querySelector('#title-date');
const timerHeader = document.querySelector('h1');
const btnStart = document.querySelector('#btn');
const btnReset = document.querySelector('#btn-reset');
const blockInput = document.querySelector('.input');
const blockOutput = document.querySelector('.output');
const dateMonth = document.querySelector('#date');
const headerComplete = document.querySelector('.complete');
// let currentDate = moment(); // дата на сегодняшний день
// let timerDate;
let headerValue;
let intervalID = null;

class Timer {
  constructor(date) {
    this.timerDate = date;
    this.currentDate = null;
  }

  //создаем функцию для добовления "0" перед значением
  putZero(dateID) {
    return dateID < 10 ? "0" + dateID : dateID;
  }

  //создаем функцию с обратным отсчетом
  countDown() {
    this.currentDate = moment();
  //проверка на завершение таймера
    if (moment(this.timerDate).diff(this.currentDate) <= 0) {
    clearInterval(intervalID);
    headerComplete.classList.remove('hide');
    headerComplete.textContent = `${headerValue} завершился ${this.timerDate}`;
    return;
    }
    const days = Math.floor(moment(this.timerDate).diff(this.currentDate, 'days'));
    const hours = Math.floor(moment(this.timerDate).diff(this.currentDate, 'hours') % 24);
    const minutes = Math.floor(
    moment(this.timerDate).diff(this.currentDate, 'minutes') % 60);
    const seconds = Math.floor(
    moment(this.timerDate).diff(this.currentDate, 'seconds') % 60);
    document.querySelector('.numbers').textContent = 
    `${timer.putZero(days)}:${timer.putZero(hours)}:${timer.putZero(minutes)}:${timer.putZero(seconds)}`;
    };
}

let timer = new Timer(dateMonth.value);

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

const startCount = () => {
    switchScreen();
    timer.countDown();
    //вызываем функцию каждую секунду
    intervalID = setInterval(timer.countDown, 1000);
  
}

// при нажатии кнопки "Начать" запускается таймер
const startTimer = () => {
  //меняем значение заголовка
  headerValue = header.value;
  timerHeader.innerHTML = headerValue; 
  //дату отсчета запоминаем в переменную
  this.timerDate = dateMonth.value;
  
  localStorage.setItem('header', headerValue);
  localStorage.setItem('date', this.timerDate);
  
  //проверка значения даты
  //проверка дата уже прошла
  if (moment(this.timerDate).isBefore(this.currentDate)) {
    alert("Дата уже прошла");
    return;
  }
  if (this.timerDate === '') {
    alert("Пожалуйста введите дату");
  } else {
    startCount();
  }
  
};

const isStorage = () => {
  const headerStorage = localStorage.getItem('header');
  const dateStorage = localStorage.getItem('date');
  if (!headerStorage && !dateStorage){
    return;
  }
  if (!!headerStorage) {
    timerHeader.textContent = headerStorage;
    this.timerDate = dateStorage;
  }
  
  startCount();
}

isStorage();

btnStart.addEventListener('click', startTimer);


