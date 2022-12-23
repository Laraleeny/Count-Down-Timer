import '../style.css';
import Timer from './timer.js';

// создать переменные
export const header = document.querySelector('#title-date');
export const timerHeader = document.querySelector('h1');
const btnStart = document.querySelector('#btn');
const btnReset = document.querySelector('#btn-reset');
const blockInput = document.querySelector('.input');
const blockOutput = document.querySelector('.output');
const dateMonth = document.querySelector('#date');
const headerComplete = document.querySelector('.complete');
let timer; 

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

export const startCount = (localData) => {
  switchScreen();
  timer = new Timer(localData? localData : dateMonth.value, header.value);
  timer.init();
  timerHeader.innerHTML = localStorage.getItem('header');
};

// при нажатии кнопки "Начать" запускается таймер
const startTimer = () => {
  timer = new Timer(dateMonth.value, header.value);
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
