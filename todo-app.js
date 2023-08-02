//... - operator spread

//for of значение массива
//for in индекс(строкой) значения массива

/*
let helloWorld = function () {
    console.log("Hello World!");
}
let allUsers = [
    { name: 'Валя', age: 11 },
    { name: 'Таня', age: 24 },
    { name: 'Рома', age: 21 },
    { name: 'Надя', age: 34 },
    { name: 'Антон', age: 7 }
]
function getOlderUserArray(users) {
    var user = users.reduce(function (prev, current) {
        if (+current.age > +prev.age) {
            return current;
        } else {
            return prev;
        }
    });

    return user.name;
}
let OlderUserArray = getOlderUserArray(allUsers)
console.log(OlderUserArray);

let objects = [
    { name: 'Василий', surname: 'Васильев' },
    { name: 'Иван', surname: 'Иванов' },
    { name: 'Иван', surname: 'Петров' }
]
function filter(objects, key, value) {
    let filter = [];

    for (const iterator of objects) {
        if (iterator[key] === value) {
            filter.push(iterator);
        }
    }

    return filter;
}
let filterArray = filter(objects, 'name', 'Иван');
for (const iterator of filterArray) {
    console.log(iterator);
}
*/


(function () {
    function dataToJson(data) {
        return JSON.stringify(data);
    }

    function jsonToData(data) {
        return JSON.parse(data);
    }

    function getTodoData() {
        return localStorage.getItem('todoData');
    }

    function setTodoData(data) {
        localStorage.setItem('todoData', data);
    }

    function addTodoData(data) {
        let todoData = getTodoData();

        todoData = todoData ? jsonToData(todoData) : [];

        todoData.push(data);
        setTodoData(dataToJson(todoData));
    }

    function removeFromTodo(todoData) {
        let todoItems = jsonToData(getTodoData());
        let newTodoItems = [];
        for (let index = 0; index < todoItems.length; index++) {
            if (todoItems[index].name != todoData) {
                newTodoItems.push(todoItems[index])
            }
        }
        setTodoData(dataToJson(newTodoItems));
    }

    function updateFromTodo(todoData){
        let todoItems = jsonToData(getTodoData());
        let newTodoItems = [];
        for (let index = 0; index < todoItems.length; index++) {
            if (todoItems[index].name == todoData) {
                todoItems[index].state = todoItems[index].state == "nonActive" ? "active" : "nonActive";
            }
            newTodoItems.push(todoItems[index])
        }
        setTodoData(dataToJson(newTodoItems));
    }

    function printAllTodoList(todoList) {
        let todoItems = jsonToData(getTodoData());

        if (todoItems) {
            for (const iterator of todoItems) {
                let itemList = createTodoItem(iterator.name);
                createEventsOnButton(itemList);
                if (iterator.state == "active"){
                    itemList.item.children[0].lastChild.classList.toggle('active');
                }
                todoList.append(itemList.item);
            }
        }
    }

    function createEventsOnButton(todoItem) {
        todoItem.acc.addEventListener('click', function () {
            todoItem.item.children[0].lastChild.classList.toggle('active');
            updateFromTodo(todoItem.content);
        });

        todoItem.del.addEventListener('click', function () {
            for (const iterator of jsonToData(getTodoData())) {
                if (iterator.name == todoItem.content) {
                    todoItem.item.remove();
                    removeFromTodo(todoItem.content);
                }
            }
        });
    }

    function createButton(idName, ...classMames) {
        let btn = document.createElement('button');
        btn.classList.toggle(classMames);
        btn.id = idName;
        return btn;
    }

    function createAppTitle(title) {
        let appTitle = document.createElement('h2');
        appTitle.textContent = title;
        return appTitle;
    }

    function createTodoItemForm() {
        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWrapper = document.createElement('div');
        let button = document.createElement('button');

        input.placeholder = 'Ввод пункта';
        button.textContent = 'Добавить запись';

        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);

        return {
            form,
            input,
            button,
        };
    }

    function createTodoList() {
        let list = document.createElement('ul');
        return list;
    }

    function createTodoItem(content) {
        let item = document.createElement('li');
        let p = document.createElement('p');
        p.classList.toggle('item-content');

        let text = document.createElement('p');
        text.textContent = content;

        let del = createButton('btnDell', 'ico-times');
        let acc = createButton('btnAccept', 'ico-check');

        p.append(del);
        p.append(acc);
        p.append(text);

        item.append(p);
        return {
            item,
            del,
            acc,
            content,
        };
    }

    document.addEventListener('DOMContentLoaded', function () {
        let container = document.getElementById('todo-app');

        let todoAppTitle = createAppTitle('Список дел');
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();

        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);

        printAllTodoList(todoList);

        todoItemForm.form.addEventListener('submit', function (e) {
            e.preventDefault();

            if (!todoItemForm.input.value) {
                return;
            }

            let todoItem = createTodoItem(todoItemForm.input.value);
            addTodoData({name: todoItemForm.input.value, state: "nonActive"});
            createEventsOnButton(todoItem);

            console.log(todoItem);

            todoList.append(todoItem.item);
            todoItemForm.input.value = '';
        });
    });
})();