'use strict';

const income = '30000';
const mission = 3e5;
const period = 8;
let money = 65000;
const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Интернет, Подписки, Такси, Психолог, Донаты');

const deposit = confirm('Есть ли у вас депозит в банке?');
let expenses = [];

function isNumber(num) {
    return !isNaN(num) && !isNaN(parseFloat(num)) && (isFinite(num));
}

do {
    money = prompt('Ваш месячный доход?', 65000);
} while (!isNumber(money));

function getExpensesMonth(){
    let sum = 0;
    for (let i = 0, cost; i < 2; i++) {
        expenses[i] = prompt('Введите обязательную статью расходов', 'Еда');
        for (cost = prompt('Во сколько это обойдется?', 8000);!isNumber(cost);) {
            cost = prompt('Во сколько это обойдется?', 8000);
        }
        sum += +cost;
    }
    return sum;
}

const expensesAmount = getExpensesMonth();

function  getAccumulatedMonth(){
    return +money - expensesAmount;
}

const accumulatedMonth = getAccumulatedMonth();

function getTargetMonth(){
    if (Math.ceil(mission / accumulatedMonth) < 0 || accumulatedMonth === 0) {
        return 'Цель не будет достигнута';
    }
    else {
        return Math.ceil(mission / accumulatedMonth);
    }
}

const budgetDay = Math.floor(accumulatedMonth / 30);

function showTypeOf(varName){
    return varName + ', ' + typeof(varName);
}
function getStatusIncome(income){
    if (income >= 1200) {
            return 'У вас высокий уровень дохода';
        }
        else if (income >= 600) {
            return'У вас средний уровень дохода';
        }
        else if (income >= 0 ) {
            return'К сожалению у вас уровень дохода ниже среднего';
        }
        else {
            return'Что то пошло не так';
        }
}
console.log('Бюджет на месяц: ' + showTypeOf(accumulatedMonth));
console.log('Бюджет на день: ' + showTypeOf(budgetDay));
console.log('Наличие депозита: ' + showTypeOf(deposit));
console.log('Расходы за месяц: ' + expensesAmount);
console.log((addExpenses.toLowerCase()).split(', '));
console.log('Cрок достижения цели в месяцах: ' + getTargetMonth());
console.log(getStatusIncome(budgetDay));


