import countTimer from './modules/countTimer';
import smoothScroll from './modules/smoothScroll';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import changeCommandPhoto from './modules/changeCommandPhoto';
import restrictInput from './modules/restrictInput';
import checkInputData from './modules/checkInputData';
import calc from './modules/calc';
import sendForm from './modules/sendForm';

import Validator from './plugins/Validator';
import sliderCarousel from './plugins/sliderCarousel';

// Таймер
countTimer(new Date().getTime() + 52342000);

// Плавная прокрутка
document.querySelector(`main>a`).addEventListener(`click`, event => {
	smoothScroll(event);
});

// Управление меню
toggleMenu();

// Всплывающее окно
togglePopUp();

// Переключение табов Наши услуги
tabs();

// Слайдер
slider();

// Карусель для партнеров
const carousel = new sliderCarousel({
	wrap: `.companies-hor`,
	main: `.companies-wrapper`,
	slidesToShow: 6,
	infinity: true,
	responsive: [
		{
			breakpoint: 1024,
			slidesToShow: 4
		},
		{
			breakpoint: 768,
			slidesToShow: 3
		},
		{
			breakpoint: 576,
			slidesToShow: 2
		}
	]
});
carousel.init();

// Наведение на фото команды
changeCommandPhoto();

// Ограничение на ввод символов в полях ввода имени, сообщения, телефона, эл. почты и данных калькулятора
restrictInput();

// Проверка и приведение введенных данных на валидность
checkInputData();

const validMain = new Validator({
	selector: `#form1`,
	method: {
		'form1-phone': [
			[`notEmpty`],
			[`pattern`, `phone`]
		],
		'form1-email': [
			[`notEmpty`],
			[`pattern`, `email`]
		],
		'form1-name': [
			[`notEmpty`],
			[`pattern`, `name`]
		]
	},
});
const validFooter = new Validator({
	selector: `#form2`,
	method: {
		'form2-phone': [
			[`notEmpty`],
			[`pattern`, `phone`]
		],
		'form2-email': [
			[`notEmpty`],
			[`pattern`, `email`]
		],
		'form2-name': [
			[`notEmpty`],
			[`pattern`, `name`]
		],
		'form2-message': [
			[`notEmpty`],
			[`pattern`, `text`]
		]
	},
});
const validPopUp = new Validator({
	selector: `#form3`,
	method: {
		'form3-phone': [
			[`notEmpty`],
			[`pattern`, `phone`]
		],
		'form3-email': [
			[`notEmpty`],
			[`pattern`, `email`]
		],
		'form3-name': [
			[`notEmpty`],
			[`pattern`, `name`]
		]
	},
});

// Калькулятор
calc(100);

//Отправка формы
sendForm(`#form1`, validMain);
sendForm(`#form2`, validFooter);
sendForm(`#form3`, validPopUp);
