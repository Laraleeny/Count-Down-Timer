//создать переменные
const header = document.querySelector("#title-date");
const timerHeader = document.querySelector("h1");
const btnStart = document.querySelector("#btn");
const btnReset = document.querySelector("#btn-reset");
const blockInput = document.querySelector(".input");
const blockOutput = document.querySelector(".output");
const dateMonth = document.querySelector("#date");
let currentDate = moment(); // дата на сегодняшний день
let timerDate;
let intervalID = null;

timerDate = dateMonth.value;

// сброс - все в начальное состояние
const handleReset = () => {
  console.log("Reset");
};

btnReset.addEventListener("click", handleReset);

const switchScreen = () => {
  //скрыть кнопку "Начать" и вывести кнопку "Сброс"
  btnStart.classList.add("hide");
  btnReset.classList.remove("hide");
  //скрыть блок с инпутами и вывести блок с аутпут
  blockInput.classList.add("hide");
  blockOutput.classList.remove("hide");
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
    document.querySelector(".complete").classList.remove("hide");
    document.querySelector(
      ".complete"
    ).textContent = `${header.value} завершился ${timerDate}`;
    return;
  }
  const days = Math.floor(moment(timerDate).diff(currentDate, "days"));
  const hours = Math.floor(moment(timerDate).diff(currentDate, "hours") % 24);
  const minutes = Math.floor(
    moment(timerDate).diff(currentDate, "minutes") % 60);
  const seconds = Math.floor(
    moment(timerDate).diff(currentDate, "seconds") % 60);
  document.querySelector(".numbers").textContent = 
  `${putZero(days)}:${putZero(hours)}:${putZero(minutes)}:${putZero(seconds)}`;
};

// при нажатии кнопки "Начать" запускается таймер
const startTimer = () => {
  //меняем значение заголовка
  timerHeader.innerHTML = header.value;
  header.value = "";

  //дату отсчета запоминаем в переменную
  timerDate = dateMonth.value;
  //проверка значения даты
  //проверка дата уже прошла
  if (moment(timerDate).isBefore(currentDate)) {
    alert("Дата уже прошла");
    return;
  }
  if (timerDate === "") {
    alert("Пожалуйста введите дату");
  } else {
    switchScreen();
    countDown();
    //вызываем функцию каждую секунду
    intervalID = setInterval(countDown, 1000);
  }
};

btnStart.addEventListener("click", startTimer);
