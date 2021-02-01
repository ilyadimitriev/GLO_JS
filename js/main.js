// Присвоение значений
let money = 65e3;
const income = '30000';
let addExpenses = 'Интернет, Подписки, Такси, Психолог, Донаты';
let deposit = true;
const mission = 3e5;
const period = 8;
let budgetDay = money / 30;

money = Number(prompt('Ваш месячный доход?'));

let expenses1 = prompt('Введите обязательную статью расходов?');
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount1 = Number(prompt('Во сколько это обойдется?'));
let amount2 = Number(prompt('Во сколько это обойдется?'));

let budgetMonth = money - (amount1 + amount2);

budgetDay = budgetMonth / 30;

// Использование методов и свойств

// console.log(typeof(money));
// console.log(typeof(income));
// console.log(typeof(deposit));

// console.log(addExpenses.length);

// console.log('Период равен ' + period + ' мецяцев');
// console.log('Цель заработать ' + mission + ' рублей');

// console.log((addExpenses.toLowerCase()).split(', '));
// console.log(budgetDay);


//Урок 3

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');

deposit = prompt('Есть ли у вас депозит в банке?');


console.log(budgetMonth);

//За сколько месяцев будет достигнута цель
console.log(Math.ceil(mission / budgetMonth));

if (budgetDay >= 1200) {
    alert('У вас высокий уровень дохода');
}
else if (budgetDay >= 600) {
    alert('У вас средний уровень дохода');
}
else if (budgetDay >= 0 ) {
    alert('К сожалению у вас уровень дохода ниже среднего');
}
else {
    alert('Что то пошло не так');
}



