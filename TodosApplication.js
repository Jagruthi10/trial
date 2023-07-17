let todoItemsContainer = document.getElementById("todoItemsContainer");
let addButton = document.getElementById("addButton");
let saveButton = document.getElementById("saveButton");

saveButton.onclick = function () {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}
function getTodoListFromLocalStorag() {
    let getTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(getTodoList);
    if (parsedTodoList === null) {
        return [];
    }
    else {
        return parsedTodoList;
    }
}
todoList = getTodoListFromLocalStorag();

let todoCount = todoList.length;

function changeStatus(checkboxId, labelId, todoItemId) {
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked");

    let todoObjectIndex = todoList.findIndex(function (eachTodo) {
        let eachTodoId = "todoItem" + eachTodo.uniqueNo;
        if (eachTodoId === todoItemId) {
            return true;
        }
        else {
            return false;
        }
    });

    let todoObject = todoList[todoObjectIndex];
    if (todoObject.isChecked === true) {
        todoObject.isChecked = false;
    }
    else {
        todoObject.isChecked = true;
    }
}

function deleteTodoItem(todoItemId) {
    let todoElement = document.getElementById(todoItemId);
    todoItemsContainer.removeChild(todoElement);
    let deletedItemIndex = todoList.findIndex(function (eachTodo) {
        let eachTodoId = "todoItem" + eachTodo.uniqueNo;
        if (eachTodoId === todoItemId) {
            return true;
        }
        else {
            return false;
        }
    });
    todoList.splice(deletedItemIndex, 1);
}

function addTodoItem(todo) {
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;
    let todoItemId = "todoItem" + todo.uniqueNo;

    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoElement.id = todoItemId;
    todoItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.checked = todo.isChecked;
    inputElement.classList.add("checkbox");
    inputElement.onclick = function () {
        changeStatus(checkboxId, labelId, todoItemId);
    }
    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.textContent = todo.text;
    labelElement.classList.add("checkbox-label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id = labelId;
    if (todo.isChecked === true) {
        labelElement.classList.add("checked");
    }
    labelContainer.appendChild(labelElement);

    let iconContainer = document.createElement("div");
    iconContainer.classList.add("delete-icon");
    labelContainer.appendChild(iconContainer);

    let iconElement = document.createElement("i");
    iconElement.classList.add("far", "fa-trash-alt", "delete-icon");
    iconElement.onclick = function () {
        deleteTodoItem(todoItemId);
    }
    iconContainer.appendChild(iconElement);
}

for (let todo of todoList) {
    addTodoItem(todo);
}

function addNewTodoItem() {
    let userInputElement = document.getElementById("userInput");
    let userInput = userInputElement.value;

    if (userInput === "") {
        alert("Enter Valid Text");
        return;
    }

    todoCount = todoCount + 1;
    let newTodoItems = {
        text: userInput,
        uniqueNo: todoCount,
        isChecked: false
    }

    addTodoItem(newTodoItems);
    userInputElement.value = "";
    todoList.push(newTodoItems);

}

addButton.onclick = function () {
    addNewTodoItem();
}