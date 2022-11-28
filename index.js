'use strict';

const mainTitle = document.querySelector('h1');
const titleCounter = document.querySelector('#title-date');
const dateCounter = document.querySelector('#date');
const btnStart = document.querySelector('#btn');
const numbers = document.querySelector('.numbers');
const mainTitleTwo = document.querySelector('h2');
const btnReset = document.querySelector('#btn-reset');
const complete = document.querySelector('.complete');

let newDateCounter = dateCounter.value;
let dateNow = moment();
let deadline = '';
let timerId = null;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

const start = () => {
    deadline = dateCounter.value;

    if(dateCounter.value === '') {
        alert('Пожалуйста введите дату');
        return;
    } else {
        mainTitle.textContent = titleCounter.value;

        changeApp();
    }
}

const changeApp = () => {
    btnReset.classList.remove('hide');
    document.querySelector('.output').classList.remove('hide');
    complete.classList.remove('hide');

    document.querySelector('.input').classList.add('hide');
    btnStart.classList.add('hide');
}

function countDown() {
    dateNow = moment();
    let counter = moment(deadline).diff(dateNow);

    if(counter <= 0) {
        clearInterval(timerId);
		complete.classList.remove('hide');
        complete.textContent = `${titleCounter.value} завершился ${deadline}`;
        return;
    }

    createValues();
    startTimer();
}

const addZero = (numID) => {
	let result = numID < 10 ? '0' + numID : numID;
	return result;
};

const createValues = () => {
    const days = Math.floor(moment(deadline).diff(dateNow, 'days'));
    const hours = Math.floor(moment(deadline).diff(dateNow, 'hours')) % 24;
    const minutes = Math.floor(moment(deadline).diff(dateNow, 'minutes') % 60);
    const seconds = Math.floor(moment(deadline).diff(dateNow, 'seconds')) % 60;

    numbers.textContent = `${addZero(days)}:${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`;
}

const startTimer = () => {
    timerId = setInterval(countDown, 1000);

    localStorage.setItem('title', titleCounter.value);
	localStorage.setItem('date', dateCounter.value);

}

const refresh = () => {
    const title = localStorage.getItem('title');
	const date = localStorage.getItem('date');

    if(!title && !date){
		return;
	}

    titleCounter.value = title;
	dateCounter.value = date;

    start();
	countDown();
	startTimer();
}


btnStart.addEventListener('click', start);
btnStart.addEventListener('click', countDown);
btnReset.addEventListener('click', () => {
    mainTitle.textContent = 'Создать новый таймер обратного отсчета';

    btnReset.classList.add('hide');
    document.querySelector('.output').classList.add('hide');
    complete.classList.add('hide');
    document.querySelector('.input').classList.remove('hide');
    btnStart.classList.remove('hide');

    dateCounter.value = '';
    titleCounter.value = '';

    localStorage.clear();

})

refresh();