// let phones = ['samsung', 'redmi', 'iphone', 'realme', 'huawei','samsung', 'redmi', 'iphone'];
// function uniqueArr(arr) {
//    let result = [];
//    for(let i = 0; i < arr.length; i++) {
//        if(!result.includes(arr[i])) {
//            result.push(arr[i]);
//        };
//    };
//    return result;
// };
// console.log(uniqueArr(phones));


const elForm = document.querySelector('.form');
const elInput = document.querySelector('.form__input');
const elBtn = document.querySelector('.form__btn');
const elList = document.querySelector('.list');
const elTemplate = document.querySelector('.template').content;  

let todosArr = JSON.parse(window.localStorage.getItem('todos')) || []; 

const deleteTodos = (e) => {
    let dataId = e.target.dataset.id
    let foundIndex = todosArr.find(i => i.id == dataId);
    todosArr.splice(foundIndex, 1)
    renderTodos(todosArr, elList);
    window.localStorage.setItem('todos', JSON.stringify(todosArr));
}

const checkTodo = (e)  => {
    let dataId = e.target.dataset.id;
    let foundTodo = todosArr.find(t => t.id == dataId);
    foundTodo.isCompleted = !foundTodo.isCompleted;
    renderTodos(todosArr, elList);
    window.localStorage.setItem('todos', JSON.stringify(todosArr));
   
};

function renderTodos(arr, list) {   
    list.innerHTML = null;
    arr.forEach(i => {
        const cloneTemplate = elTemplate.cloneNode(true);
        let todoContent = cloneTemplate.querySelector('.list__item-content');
        let deleteBtn = cloneTemplate.querySelector('.list__item-btn');
        let todoCheck = cloneTemplate.querySelector('.list__item-input');

        if(i.isCompleted) {
            todoContent.style.textDecoration = 'line-through';
        };

        todoContent.textContent = i.content;
        deleteBtn.dataset.id = i.id;
        todoCheck.dataset.id = i.id;
        todoCheck.checked = i.isCompleted;
        deleteBtn .addEventListener('click', deleteTodos);
        todoCheck.addEventListener('change', checkTodo);
        list.appendChild(cloneTemplate);
    });
};


elForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let inputValue = elInput.value.trim();
    todosArr.push({
        id: new Date().getTime(),
        content: inputValue,
        isCompleted: false
    });
    window.localStorage.setItem('todos', JSON.stringify(todosArr));
    renderTodos(todosArr, elList);
    elInput.value = null;
});

renderTodos(todosArr, elList);