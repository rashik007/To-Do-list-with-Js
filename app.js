//selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');



//event listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//functions
function addTodo(event) {

    //prevent form from submitting
    event.preventDefault();

    //todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //add todo to localstorage
    saveLocalTodos(todoInput.value);

    //check mark button
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add('complete-btn');
    todoDiv.appendChild(completeButton);


    //check trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);


    //append to list
    todoList.appendChild(todoDiv);

    //clear todo input value
    todoInput.value = '';

    //
}

function deleteCheck(e) {
    // console.log(e.target);
    const item = e.target;

    //delete todo
    if(item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeLocalTodos(todo);

        //animation
        todo.addEventListener('transitionend', () => {
            todo.remove();
        });
    }

    if(item.classList[0] === 'complete-btn') {
        const todo =  item.parentElement;
        todo.classList.toggle('completed');
    }
}


function filterTodo(e) {
    const todos = todoList.childNodes;
    console.log(todos);
    todos.forEach(function(todo) {
        switch(e.target.value) {
            case 'all':
                todo.style.display = "flex";
                break;
            case 'completed':
                if(todo.classList.contains('completed')) {
                    todo.style.display = "flex";
                }else {
                    todo.style.display = "none";
                }
                break;
            case 'incomplete' :
                if(todo.classList.contains('completed') )  {
                    todo.style.display = "none";
                }else {
                    todo.style.display = "flex";
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    //check if item already exists
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];

    }else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);

    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    //check if item already exists
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];

    }else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo) {
        //todo div
        //todo div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        //create li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        //add todo to localstorage
        // saveLocalTodos(todoInput.value);

        //check mark button
        const completeButton = document.createElement('button');
        completeButton.innerHTML = '<i class="fas fa-check"></i>';
        completeButton.classList.add('complete-btn');
        todoDiv.appendChild(completeButton);


        //check trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);


        //append to list
        todoList.appendChild(todoDiv);

    });
}

// localStorage.clear();
function removeLocalTodos(todo) {
    let todos;

    if(localStorage.getItem('todos') === null) {
        todos = [];

    }else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    console.log('tis the array' + todos);
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexof(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}