'use strict';
let money;

function isNumber(num) {
    return !isNaN(num) && !isNaN(parseFloat(num)) && (isFinite(num));
}

do {
    money = prompt('Ваш месячный доход?', 65000);
} while (!isNumber(money));

let appData = {
    mission: 3e5,
    budget: +money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMounth: 0,
    expenses: {},
    getExpensesMonth: function(){
        let sum = 0;
        for (let key in appData.expenses) {
            sum += appData.expenses[key];
        }
        return sum;
    },
    getBudget: function(){
        return +appData.budget - appData.expensesMounth;
    },
    getTargetMonth: function(){
        if (Math.ceil(appData.mission / appData.budgetMonth) < 0 || appData.budgetMonth === 0) {
            return 'Цель не будет достигнута';
        }
        else {
            return Math.ceil(appData.mission / appData.budgetMonth);
        }
    },
    getStatusIncome: function(){
        if (appData.budgetDay >= 1200) {
                return 'У вас высокий уровень дохода';
            }
        else if (appData.budgetDay >= 600) {
            return'У вас средний уровень дохода';
        }
        else if (appData.budgetDay >= 0 ) {
            return'К сожалению у вас уровень дохода ниже среднего';
        }
        else {
            return'Что то пошло не так';
        }
    },
    asking: function(){
        let obj = {};
        for (let i = 0, cost, expense; i < 2; i++) {
            expense = prompt('Введите обязательную статью расходов (' + (i + 1) + ' из 2)');
            do {
                cost = prompt('Во сколько это обойдется?', 8000);
            } while (!isNumber(cost));
            obj[expense] = +cost;
        }
        return obj;
    }
};

function start(){
    appData.expenses = appData.asking();
    appData.expensesMounth = appData.getExpensesMonth();
    appData.budgetMonth = appData.getBudget();
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    console.log('Расходы за месяц: ' + appData.expensesMounth);
    console.log('Cрок достижения цели в месяцах: ' + appData.getTargetMonth());
    console.log(appData.getStatusIncome());
    console.log('Наша программа включает в себя данные:');
    for (let key in appData) {
        if (typeof(appData[key]) === 'object') {
            console.log(key + ':');
            console.log(appData[key]);
        }
        else if (typeof(appData[key]) !== 'function') {
            console.log(key + ': ' + appData[key]);
        }
        else {
            continue;
        }
    }
}

start();



