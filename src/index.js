import '../style.css';
// создать переменные
const header = document.querySelector('#title-date');
const timerHeader = document.querySelector('h1');
const btnStart = document.querySelector('#btn');
const btnReset = document.querySelector('#btn-reset');
const blockInput = document.querySelector('.input');
const blockOutput = document.querySelector('.output');
const dateMonth = document.querySelector('#date');
const headerComplete = document.querySelector('.complete');
let headerValue;
let timer;

class Timer {
  constructor(date) {
    this.timerDate = date;
    this.currentDate = null;
    this.intervalID = null;
  }

  init() {
    this.countDown();
    // вызываем функцию каждую секунду
    this.intervalID = setInterval(this.countDown.bind(this), 1000);
  }

  // создаем функцию для добовления "0" перед значением
  putZero(dateID) {
    return dateID < 10 ? `0${dateID}` : dateID;
  }

  // создаем функцию с обратным отсчетом
  countDown() {
    this.currentDate = moment();

    // проверка на завершение таймера

    if (moment(this.timerDate).diff(this.currentDate) <= 0) {
      clearInterval(this.intervalID);
      headerComplete.classList.remove('hide');
      headerComplete.textContent = `${headerValue} завершился ${this.timerDate}`;
      return;
    }
    const days = Math.floor(moment(this.timerDate).diff(this.currentDate, 'days'));
    const hours = Math.floor(moment(this.timerDate).diff(this.currentDate, 'hours') % 24);
    const minutes = Math.floor(moment(this.timerDate).diff(this.currentDate, 'minutes') % 60);
    const seconds = Math.floor(moment(this.timerDate).diff(this.currentDate, 'seconds') % 60);
    const counter = `${this.putZero(days)}:${this.putZero(hours)}:${this.putZero(minutes)}:${this.putZero(seconds)}`;
    document.querySelector('.numbers').textContent = counter;
  }

  // проверка значения даты
  // проверка дата уже прошла
  checkDate() {
    this.currentDate = moment();
    if (moment(this.timerDate).isBefore(this.currentDate)) {
      alert('Дата уже прошла');
      return;
    }
    if (this.timerDate === '') {
      alert('Пожалуйста введите дату');
      return;
    }
    // меняем значение заголовка
    headerValue = header.value;
    timerHeader.innerHTML = headerValue;
    localStorage.setItem('header', headerValue);
    localStorage.setItem('date', this.timerDate);
    startCount();
  }
}

// сброс - все в начальное состояние
const handleReset = () => {
  clearInterval(timer.intervalID);
  timerHeader.textContent = 'Создать новый таймер обратного отсчета';
  header.value = '';
  dateMonth.valueAsDate = null;
  headerComplete.textContent = '';

  // скрыть кнопку "Сброс" и вывести кнопку "Начать"
  btnStart.classList.remove('hide');
  btnReset.classList.add('hide');
  // скрыть блок с аутпут и вывести блок с инпутам
  blockInput.classList.remove('hide');
  blockOutput.classList.add('hide');

  localStorage.removeItem('header');
  localStorage.removeItem('date');
  timer = null;
};

btnReset.addEventListener('click', handleReset);

const switchScreen = () => {
  // скрыть кнопку "Начать" и вывести кнопку "Сброс"
  btnStart.classList.add('hide');
  btnReset.classList.remove('hide');
  // скрыть блок с инпутами и вывести блок с аутпут
  blockInput.classList.add('hide');
  blockOutput.classList.remove('hide');
};

const startCount = (localData) => {
  switchScreen();
  timer = new Timer(localData? localData : dateMonth.value);
  timer.init();
  timerHeader.innerHTML = localStorage.getItem('header');
};

// при нажатии кнопки "Начать" запускается таймер
const startTimer = () => {
  timer = new Timer(dateMonth.value);
  timer.checkDate();
};

const isStorage = () => {
  const headerStorage = localStorage.getItem('header');
  const dateStorage = localStorage.getItem('date');
  
  if (!headerStorage && !dateStorage) {
    return;
  }

  startCount(dateStorage);
};

isStorage();

btnStart.addEventListener('click', startTimer);
