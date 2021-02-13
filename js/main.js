'use strict';

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

// Создаем массив, где будут храниться данные
let todoData = [];

const render = function(prevData){
    // Удалаем предыдущее содержимое программы
    todoList.textContent = '';
    todoCompleted.textContent = '';

    todoData.forEach(function(item){
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
                        '<div class="todo-buttons">' +
                            '<button class="todo-remove"></button>' +
                            '<button class="todo-complete"></button>' +
                        '</div>';
        if (item.completed) {
            todoCompleted.append(li);
        }
        else {
            todoList.append(li);
        }
        const todoComplete = li.querySelector('.todo-complete');
        todoComplete.addEventListener('click', function(){
            // Запоминаем прежнее состояние todoData
            const prevData = todoData.slice();
            item.completed = !item.completed;
            render(prevData);
        });
        const todoRemove = li.querySelector('.todo-remove');
        todoRemove.addEventListener('click', function(){
            // Запоминаем прежнее состояние todoData
            const prevData = todoData.slice();
            todoData.pop(item);
            render(prevData);
        });
    });
    // Если в todoData не осталось данных, то очищаем localStorage
    if (todoData.length === 0) {
        localStorage.removeItem('data');
        return;
    }
    // Если в todoData данные изменились, то обновляем localStorage
    if (prevData !== todoData) {
        localStorage.setItem('data', JSON.stringify(todoData));
    }
};

todoControl.addEventListener('submit', function(event){
    event.preventDefault();
    const prevData = todoData.slice();
    if (headerInput.value === '') {
        return;
    }
    const newTodo = {
        value: headerInput.value,
        completed: false,
    };
    todoData.push(newTodo);
    headerInput.value = '';
    headerInput.focus();
    render(prevData);
});

// При загрузке страницы проверяем: если в localStorage не пусто, то подгружаем данные в todoData и запускаем рендер
if (localStorage.getItem('data') !== null) {
    todoData = JSON.parse(localStorage.getItem('data'));
    // В качестве прежнего состояния todoData передаем в render() его нынешнее,так как на этом этапе в todoData еще не вносились изменения с последнего сохранения данных
    render(todoData);
}