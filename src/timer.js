import { header, timerHeader, startCount } from './index.js';

export default class Timer {
  constructor(date, title) {
    this.timerDate = date;
    this.currentDate = null;
    this.intervalID = null;
    this.headerValue = title;
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
      headerComplete.textContent = `${this.headerValue} завершился ${this.timerDate}`;
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
    timerHeader.innerHTML = this.headerValue;
    localStorage.setItem('header', this.headerValue);
    localStorage.setItem('date', this.timerDate);
    startCount();
  }
}