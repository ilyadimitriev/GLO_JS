// Присвоение значений
const income = '30000';
const mission = 3e5;
const period = 8;

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

//Пункт 2
const money = Number(prompt('Ваш месячный доход?'));
//Пункт 3
const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
//Пункт 4
const deposit = prompt('Есть ли у вас депозит в банке?');
//Пункт 5
const expenses1 = prompt('Введите обязательную статью расходов?');
const amount1 = Number(prompt('Во сколько это обойдется?'));
const expenses2 = prompt('Введите обязательную статью расходов?');
const amount2 = Number(prompt('Во сколько это обойдется?'));
//Пункт 6
const budgetMonth = money - (amount1 + amount2);
console.log(budgetMonth);
//Пункт 7
console.log(Math.ceil(mission / budgetMonth));
//Пункт 8
const budgetDay = Math.floor(budgetMonth / 30);
//Пункт 9
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



