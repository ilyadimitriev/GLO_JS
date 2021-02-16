'use strict';
const calc = document.getElementById('start');
const cancel = document.getElementById('cancel');
const plusAddIncome = document.getElementsByTagName('button')[0];
const plusAddExpenses = document.getElementsByTagName('button')[1];
const checkbox = document.querySelector('#deposit-check');
const addIncomeItem = document.querySelectorAll('.additional_income-item');
const budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
const addIncomeValue = document.getElementsByClassName('additional_income-value')[0];
const addExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
const incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
const targetMonthValue = document.getElementsByClassName('target_month-value')[0];
const budgetMonthValue = document.querySelector('.budget_month-value');
const salaryAmount = document.querySelector('.salary-amount');
const incomeTitle = document.querySelector('input.income-title');
const incomeAmount = document.querySelector('.income-amount');
const expensesTitle = document.querySelector('input.expenses-title');
const expensesAmount = document.querySelector('.expenses-amount');
let expensesItems = document.querySelectorAll('.expenses-items');
let incomeItems = document.querySelectorAll('.income-items');
const addExpensesItem = document.querySelector('.additional_expenses-item');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');

const AppData = function(){
    this.income = {};
    this.addIncome = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.target = 0;
    this.mission = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.incomeMonth = 0;
    this.expenses = {};
    this.addExpenses = [];
    this.period = 0;
};

AppData.prototype.forbit = function(item, type) {
    if (type === 'text') {
        item.value = item.value.replace(/[^а-яА-ЯёЁ !?.,:;"']/g, '');
    }
    if (type=== 'num') {
        item.value = item.value.replace(/[^\d]/g, '');
    }
};
AppData.prototype.inputEventListener = function(place){
    place.querySelectorAll('input').forEach((item) => {
        if (item.getAttribute('placeholder') === 'Сумма') {
            item.addEventListener('keyup', () => {
                this.forbit(item, 'num');
            });
        }
        if (item.getAttribute('placeholder') === 'Наименование') {
            item.addEventListener('keyup', () => {
                this.forbit(item, 'text');
            });
        }
    });
};
AppData.prototype.eventListeners = function(){
    calc.addEventListener('click', this.start.bind(this));
    cancel.addEventListener('click', this.reset.bind(this));
    plusAddExpenses.addEventListener('click', this.addExpensesBlock.bind(this));
    plusAddIncome.addEventListener('click', this.addIncomeBlock.bind(this));
    periodSelect.addEventListener('input', () => {
        this.period = +periodSelect.value;
        document.querySelector('.period-amount').textContent = periodSelect.value;
    });
    this.inputEventListener(document);
};
AppData.prototype.start = function() {
    if (salaryAmount.value === '') {
        alert('Поле "Месячный доход" должно быть заполнено!');
        return;
    }
    document.querySelectorAll('.data input').forEach(function(item){
        if(item.getAttribute('type') === 'text') {
            item.disabled = true;
        }
    });
    calc.style.display = 'none';
    cancel.style.display = 'block';
    this.budget = +salaryAmount.value;
    this.getExpenses();
    this.getExpensesMonth();
    this.getIncome();
    this.getIncomeMonth();
    this.getAddIncome();
    this.getAddExpenses();
    this.getIncome();
    this.getBudget();
    this.getBudgetDay();
    this.getTargetMonth();
    this.period = +periodSelect.value;
    this.showResult();
};
AppData.prototype.reset = function() {
    document.querySelectorAll('.data input').forEach(function(item){
        if(item.getAttribute('type') === 'text') {
            item.disabled = false;
        }
    });
    calc.style.display = 'block';
    cancel.style.display = 'none';
    this.income = {};
    this.addIncome = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.target = 0;
    this.mission = 0;
    this. budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this. incomeMonth = 0;
    this.expenses = {};
    this.addExpenses = [];
    this.period = 0;
    this.resetResult();
};
AppData.prototype.showResult = function(){
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    addExpensesValue.value = this.addExpenses.map(function(word){
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(', ');
    addIncomeValue.value = this.addIncome.map(function(word){
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(', ');
    targetMonthValue.value = this.target;
    incomePeriodValue.value = this.calcSavedMoney();
    periodSelect.addEventListener('input', () => incomePeriodValue.value = this.calcSavedMoney());
};
AppData.prototype.resetResult = function(){
    document.querySelectorAll('input[type=text]').forEach(function(input){
        input.value = '';
    });
    periodSelect.value = 1;
    document.querySelector('.period-amount').textContent = periodSelect.value;
    if (expensesItems.length === 3) {
       document.querySelector('.expenses').insertAdjacentHTML('beforeend', '<button class="btn_plus expenses_add">+</button>');
       plusAddExpenses.addEventListener('click', this.addExpensesBlock);
    }
    for (let i = expensesItems.length; i > 1; i--) {
        document.querySelector('.expenses-items').remove();
    }
    if (incomeItems.length === 3) {
        document.querySelector('.income').insertAdjacentHTML('beforeend', '<button class="btn_plus income_add">+</button>');
        plusAddIncome.addEventListener('click', this.addIncomeBlock);
    }
    for (let i = incomeItems.length; i > 1; i--) {
        document.querySelector('.income-items').remove();
    }
};
AppData.prototype.getAddExpenses = function(){
    this.addExpenses = [];
    let addExpenses = addExpensesItem.value.split(',');
    addExpenses.forEach((item) => {
        item = item.trim();
        if (item !== ''){
            this.addExpenses.push(item);
        }
    });
};
AppData.prototype.getAddIncome = function(){
    this.addIncome = [];
    addIncomeItem.forEach((item) => {
        let itemValue = item.value.trim();
        if (itemValue !== ''){
            this.addIncome.push(itemValue);
        }
    });
};
AppData.prototype.addExpensesBlock = function(){
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.querySelector('.expenses-title').value = '';
    cloneExpensesItem.querySelector('.expenses-amount').value = '';
    plusAddExpenses.before(cloneExpensesItem);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3){
        plusAddExpenses.remove();
    }
    this.inputEventListener(expensesItems[expensesItems.length - 1]);
};
AppData.prototype.addIncomeBlock = function(){
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.querySelector('.income-title').value = '';
    cloneIncomeItem.querySelector('.income-amount').value = '';
    plusAddIncome.before(cloneIncomeItem);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3){
        plusAddIncome.remove();
    }
    this.inputEventListener(incomeItems[incomeItems.length - 1]);
};
AppData.prototype.getExpenses = function(){
    expensesItems.forEach((item) => {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== ''){
            this.expenses[itemExpenses] = +cashExpenses;
        }
    });
};
AppData.prototype.getIncome = function(){
    incomeItems.forEach((item) => {
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if (itemIncome !== '' && cashIncome !== ''){
            this.income[itemIncome] = +cashIncome;
        }
    });
};
AppData.prototype.getIncomeMonth = function(){
    let sum = 0;
    for (let key in this.income) {
        sum += +this.income[key];
        this.incomeMonth = sum;
    }
};
AppData.prototype.getExpensesMonth = function(){
    let sum = 0;
    for (let key in this.expenses) {
        sum += this.expenses[key];
    }
    this.expensesMonth = sum;
};
AppData.prototype.getBudget = function(){
    this.budgetMonth = +this.budget + this.incomeMonth - this.expensesMonth;
};
AppData.prototype.getBudgetDay = function(){
    this.budgetDay = Math.floor(this.budgetMonth / 30);
};
AppData.prototype.getTargetMonth = function(){
    if (Math.ceil(+targetAmount.value / this.budgetMonth) < 0 || this.budgetMonth === 0) {
        this.target = 'Цель не будет достигнута';
    }
    else {
        this.target =  Math.ceil(+targetAmount.value / this.budgetMonth);
    }
};
AppData.prototype.getStatusIncome = function(){
    if (this.budgetDay >= 1200) {
            return 'У вас высокий уровень дохода';
        }
    else if (this.budgetDay >= 600) {
        return'У вас средний уровень дохода';
    }
    else if (this.budgetDay >= 0 ) {
        return'К сожалению у вас уровень дохода ниже среднего';
    }
    else {
        return'Что то пошло не так';
    }
};
AppData.prototype.getInfoDeposit = function(){
    if(this.deposit){
        let percent;
        let cash;
        do {
            percent = prompt('Какой годовой процент?', 8);
        } while (!this.forbit(percent, 'num'));
        this.percentDeposit = percent;
        do {
            cash = prompt('Какая сумма заложена?', 12000);
        } while (!this.forbit(cash, 'num'));
        this.moneyDeposit = cash;
    }
};
AppData.prototype.calcSavedMoney = function(){
    return this.budgetMonth * this.period;
};

const appData = new AppData();
appData.eventListeners();