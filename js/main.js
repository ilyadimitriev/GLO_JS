'use strict';

// Присвоение значений
const income = '30000';
const mission = 3e5;
const period = 8;

//Урок 3

//Пункт 2
const money = +(prompt('Ваш месячный доход?', 40000));
//Пункт 3
const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Интернет, Подписки, Такси, Психолог, Донаты');
//Пункт 4
const deposit = confirm('Есть ли у вас депозит в банке?');
//Пункт 5
const expenses1 = prompt('Введите обязательную статью расходов', 'Квартплата');
const amount1 = +(prompt('Во сколько это обойдется?', 15000));
const expenses2 = prompt('Введите обязательную статью расходов', 'Еда');
const amount2 = +(prompt('Во сколько это обойдется?', 18000));

// Урок 4

// Пункт 1
function getExpensesMonth(){
    return amount1 + amount2;
}
// Пункт 2
function  getAccumulatedMonth(){
    return +income + money - (amount1 + amount2);
}
// Пункт 3
const accumulatedMonth = getAccumulatedMonth();
// Пункт 4
function getTargetMonth(){
    return Math.ceil(mission / accumulatedMonth);
}
// Пункт 6
const budgetDay = Math.floor(accumulatedMonth / 30);
// Пункт 7
function showTypeOf(a){
    return a + ', ' + typeof(a);
}
function getStatusIncome(a){
    if (a >= 1200) {
            return 'У вас высокий уровень дохода';
        }
        else if (a >= 600) {
            return'У вас средний уровень дохода';
        }
        else if (a >= 0 ) {
            return'К сожалению у вас уровень дохода ниже среднего';
        }
        else {
            return'Что то пошло не так';
        }
}
console.log('Бюджет на месяц: ' + showTypeOf(accumulatedMonth));
console.log('Бюджет на день: ' + showTypeOf(budgetDay));
console.log('Расходы за месяц: ' + getExpensesMonth());
console.log((addExpenses.toLowerCase()).split(', '));
console.log('Cрок достижения цели в месяцах: ' + getTargetMonth());
console.log('Бюджет на день: ' + budgetDay);
console.log(getStatusIncome(budgetDay));


