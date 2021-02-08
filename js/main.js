'use strict';
let money;

function isNumber(num) {
    return !isNaN(num) && !isNaN(parseFloat(num)) && (isFinite(num));
}

function isString(str) {
    return (isNaN(Number(str))) ? true : false;
}

do {
    money = prompt('Ваш месячный доход?', 65000);
} while (!isNumber(money));

let appData = {
    income: {},
    addIncome: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    target: 0,
    mission: 3e5,
    budget: +money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    expenses: {},
    addExpenses: [],
    period: 4,
    getExpensesMonth: function(){
        let sum = 0;
        for (let key in appData.expenses) {
            sum += appData.expenses[key];
        }
        appData.expensesMonth = sum;
    },
    getBudget: function(){
        appData.budgetMonth = +appData.budget - appData.expensesMonth;
    },
    getTargetMonth: function(){
        if (Math.ceil(appData.mission / appData.budgetMonth) < 0 || appData.budgetMonth === 0) {
            appData.target = 'Цель не будет достигнута';
        }
        else {
            appData.target =  Math.ceil(appData.mission / appData.budgetMonth);
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
        if (confirm('Есть ли у вас дополнительный источник заработка?')) {
            let itemIncome;
            let cashIncome;
            do {
                itemIncome = prompt('Какой у вас дополнительный заработок?', 'Фриланс');
            } while (!isString(itemIncome));
            do {
                cashIncome = prompt('Сколько вы на этом зарабатываете?', 12000);
            } while (!isNumber(cashIncome));
            appData.income[itemIncome] = cashIncome;
        }
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Интернет, Подписки, Такси, Психолог, Донаты');
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        let obj = {};
        for (let i = 0, cost, expense; i < 2; i++) {
            do {
                expense = prompt('Введите обязательную статью расходов (' + (i + 1) + ' из 2)');
            } while (!isString(expense));
            do {
                cost = prompt('Во сколько это обойдется?', 8000);
            } while (!isNumber(cost));
            obj[expense] = +cost;
        }
        appData.expenses = obj;
    },
    getInfoDeposit: function(){
        if(appData.deposit){
            let percent;
            let cash;
            do {
                percent = prompt('Какой годовой процент?', 8);
            } while (!isNumber(percent));
            appData.percentDeposit = percent;
            do {
                cash = prompt('Какая сумма заложена?', 12000);
            } while (!isNumber(cash));
            appData.moneyDeposit = cash;
        }
    },
    calcSavedMoney: function(){
        return appData.budgetMonth * appData.period;
    }
};

function start(){
    appData.asking();
    appData.getInfoDeposit();
    appData.getExpensesMonth();
    appData.getBudget();
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    console.log('Расходы за месяц: ' + appData.expensesMonth);
    appData.getTargetMonth();
    console.log('Cрок достижения цели в месяцах: ' + appData.target);
    console.log(appData.getStatusIncome());
    console.log('Наша программа включает в себя данные:');
    for (let key in appData) {
        if (typeof(appData[key]) === 'object') {
            console.log('%s',key + ': ', appData[key]);
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

console.log(appData.addExpenses.map(function(word){
    return word.charAt(0).toUpperCase() + word.slice(1);
}).join(', '));