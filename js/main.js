// Присвоение значений

const money = 65e3;
const income = '30000';
const addAdress = 'Интернет, Подписки, Такси, Психолог, Донаты';
const deposit = true;
const mission = 3e5;
const period = 8;

// Использование методов и свойств

console.log(typeof(money));
console.log(typeof(income));
console.log(typeof(deposit));

console.log(addAdress.length);

console.log('Период равен ' + period + ' мецяцев');
console.log('Цель заработать ' + mission + ' рублей');

console.log((addAdress.toLowerCase()).split(', '));

const budgetDay = money / 30;
console.log(budgetDay);