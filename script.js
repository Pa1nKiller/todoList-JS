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


function printList(list, ul) {
    ul.innerHTML = "";
    for (let index = 0; index < list.length; index++) {
        ul.appendChild(list[index]);
    }
}


let list = [];
let ul = document.querySelector('.list');

let input = document.getElementById('input');

let btnAdd = document.getElementById('btnAdd');
let btnDell = document.getElementById('btnDell');
let btnAccept = document.getElementById('btnAccept');

btnAdd.addEventListener('click', function () {
    if (input.value.length == 0) return;

    let li = document.createElement('li');
    let p = document.createElement('p');
    p.classList.toggle('item-content');

    let text = document.createElement('p');
    text.textContent = input.value;
    input.value = "";

    let del = document.createElement('i');
    del.classList.toggle('ico-times');
    del.setAttribute("role", "img");
    del.setAttribute("aria-label", "Cancel");
    del.id = "btnDell";
    del.addEventListener('click', function () {
        list.splice(list.indexOf(this.parentNode.parentNode), 1);
        printList(list, ul);
    });

    let acc = document.createElement('i');
    acc.classList.toggle('ico-check');
    acc.setAttribute("role", "img");
    acc.setAttribute("aria-label", "Accept");
    acc.id = "btnAccept";
    acc.addEventListener('click', function () {
        this.parentNode.lastChild.classList.toggle("active");
        printList(list, ul);
    });


    p.appendChild(del);
    p.appendChild(acc);
    p.appendChild(text);

    li.appendChild(p);

    list.push(li);
    printList(list, ul);
});
