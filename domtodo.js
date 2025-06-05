let data = [];
let selectedButton = "all-selected";
let counterCompleted = 0;
let listEl = "";

const addButtonEl = document.getElementById("newtodo");
const inputTextEl = document.getElementById("input-box");
const listContainerEl = document.getElementById("main-list");
const optionbuttonEl = document.getElementsByClassName(
  "option-button-container"
);

optionbuttonEl[0].children[0].addEventListener("click", allFilterTodo);
optionbuttonEl[0].children[1].addEventListener("click", activeFilterTodo);
optionbuttonEl[0].children[2].addEventListener("click", completeFilterTodo);
addButtonEl.addEventListener("click", addToDo);
document.addEventListener("keydown", enter);

function allFilterTodo() {
  optionbuttonEl[0].children[0].className = "selected-button";
  optionbuttonEl[0].children[1].className = "option-button";
  optionbuttonEl[0].children[2].className = "option-button";
  selectedButton = "all-selected";
  render();
}
function activeFilterTodo() {
  optionbuttonEl[0].children[0].className = "option-button";
  optionbuttonEl[0].children[1].className = "selected-button";
  optionbuttonEl[0].children[2].className = "option-button";
  selectedButton = "active-selected";
  render();
}
function completeFilterTodo() {
  optionbuttonEl[0].children[0].className = "option-button";
  optionbuttonEl[0].children[1].className = "option-button";
  optionbuttonEl[0].children[2].className = "selected-button";
  selectedButton = "complete-selected";
  render();
}
function addToDo() {
  if (inputTextEl.value !== "") {
    data.push({
      title: inputTextEl.value,
      status: "Active",
      id: Date.now(),
    });
    inputTextEl.value = "";
    render();
  } else {
    alert("Please enter a task!");
    return;
  }
}

function enter(event) {
  if (event.keyCode == 13) {
    addToDo();
  }
}

function render() {
  listEl = "";
  if (data.length == 0) {
    notTodo();
    listContainerEl.innerHTML = listEl;
  } else {
    counterCompleted = 0;
    switch (selectedButton) {
      case "all-selected":
        for (let i = 0; i < data.length; i++) {
          listEl =
            listEl +
            `<div class="list-box">
                <div class=${
                  data[i].status === "Active"
                    ? "container-unchecked-box flex"
                    : "container-checked-box flex"
                }>
                  <input type="checkbox" ${
                    data[i].status === "Active" ? "" : "checked"
                  } onchange="changeStatus(${data[i].id})" />
                  <span>${data[i].title}</span>
                </div>
                <button class="delete-button" onclick="deleteTodo(${
                  data[i].id
                })">Delete</button>
              </div>`;
          if (data[i].status == "Completed") counterCompleted++;
        }
        countCompleted();
        listContainerEl.innerHTML = listEl;
        break;
      case "active-selected":
        let counterActive = 0;
        for (let i = 0; i < data.length; i++) {
          if (data[i].status === "Active") {
            listEl =
              listEl +
              `<div class="list-box">
                  <div class="container-unchecked-box flex">
                    <input type="checkbox" onchange="changeStatus(${data[i].id})" />
                    <span>${data[i].title}</span>
                  </div>
                  <button class="delete-button" onclick="deleteTodo(${data[i].id})">Delete</button>
                </div>`;
            counterActive++;
          }
        }
        if (counterActive === 0) {
          notTodo();
        }
        counterCompleted = data.length - counterActive;
        countCompleted();
        listContainerEl.innerHTML = listEl;
        break;
      case "complete-selected":
        counterCompleted = 0;
        for (let i = 0; i < data.length; i++) {
          if (data[i].status === "Completed") {
            listEl =
              listEl +
              `<div class="list-box">
                  <div class="container-checked-box flex">
                    <input type="checkbox" checked onchange="changeStatus(${data[i].id})" />
                    <span>${data[i].title}</span>
                  </div>
                  <button class="delete-button" onclick="deleteTodo(${data[i].id})">Delete</button>
                </div>`;
            counterCompleted++;
          }
        }
        if (counterCompleted == 0) {
          notTodo();
        }
        countCompleted();
        listContainerEl.innerHTML = listEl;
        break;
    }
  }
}

render();

function deleteTodo(id) {
  if (confirm("Are you sure?")) {
    let newArray = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].id !== id) {
        newArray.push(data[i]);
      }
    }
    data = newArray;
    render();
  }
}

function clearCompletedFunction() {
  if (counterCompleted == 0) {
    alert("No completed tasks yet!");
    return;
  } else {
    if (confirm("Are you sure?")) {
      let newArray = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].status !== "Completed") {
          newArray.push(data[i]);
        }
      }
      data = newArray;
      render();
    }
  }
}
function changeStatus(id) {
  data = data.map((todo) => {
    if (todo.id === id) {
      todo.status = todo.status === "Active" ? "Completed" : "Active";
    }
    return todo;
  });
  render();
}

function notTodo() {
  listEl =
    listEl +
    `<div class="container-empty">
           <p>No tasks yet. Add one above!</p>
       </div>`;
}

function countCompleted() {
  listEl =
    listEl +
    `<div class="container-summary">
          <p class="summary" >${counterCompleted} of ${data.length} tasks completed</p>
          <p class="clearCompleted" onclick="clearCompletedFunction()"
          >Clear completed</p>
      </div>`;
}
