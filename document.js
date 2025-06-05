let data = [];
const inputTextEl = document.getElementById("input-box");
const listContainerEl = document.getElementById("main-list");
let statusChecked = "";
let counterCompleted = 0;
const addButtonEl = document.getElementById("newtodo");
let selectedButton = "all-selected";
const optionbuttonEl = document.getElementsByClassName(
  "option-button-container"
);

optionbuttonEl[0].children[0].addEventListener("click", allFilterTodo);
optionbuttonEl[0].children[1].addEventListener("click", activeFilterTodo);
optionbuttonEl[0].children[2].addEventListener("click", completeFilterTodo);

function allFilterTodo(event) {
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
    alert("empty");
    return;
  }
  var clearCompletedEl = document.getElementById("clear-completed");
  clearCompletedEl.addEventListener("click", clearCompletedFunction);

}

document.addEventListener("keydown", enter);
addButtonEl.addEventListener("click", addToDo);
function enter(event) {
  if (event.keyCode == 13) {
    addToDo();
  }
}

function render() {

  let listEl = "";
  if (data.length == 0) {
    listContainerEl.innerHTML = `<div class="container-empty">
            <p>No tasks yet. Add one above!</p>
          </div>`;
  } else {
    counterCompleted = 0;
    switch (selectedButton) {
      case "all-selected":
        for (let i = 0; i < data.length; i++) {
        
          if (data[i].status == "Active") {
            listEl =
              listEl +
              `<div id="container-listActive" class="list-box-active">
                <div class="container-unchecked-box flex">
                  <input type="checkbox" class="checkbox" onchange="changeStatus(${data[i].id})" />
                  <span>${data[i].title}</span>
                </div>
                <button class="delete-button" onclick="deleteTodo(${data[i].id})">Delete</button>
              </div>`;
          } else {
            listEl =
              listEl +
              `<div id="Container-listComplete" class="list-box-completed">
                <div class="container-checked-box flex">
                  <input type="checkbox" class="checkbox" checked onchange="changeStatus(${data[i].id})" />
                  <span>${data[i].title}</span>
                </div>
                <button class="delete-button" onclick="deleteTodo(${data[i].id})">Delete</button>
              </div>`;
            counterCompleted++;
          }
        }
        listEl =
          listEl +
          `<div class="container-summary">
          <span id="summary" class="summary">${counterCompleted} of ${data.length} tasks completed</span>
          <span id="clear-completed" class="clearCompleted" onclick="clearCompletedFunction()"
            >Clear completed</span
          >
        </div>`;

        listContainerEl.innerHTML = listEl;

        break;
      case "active-selected":
        let counterActive = 0;
        for (let i = 0; i < data.length; i++) {
          if (data[i].status === "Active") {
            listEl =
              listEl +
              `<div id="container-listActive" class="list-box-active">
                  <div class="container-unchecked-box flex">
                    <input type="checkbox" class="checkbox" onchange="changeStatus(${data[i].id})" />
                    <span>${data[i].title}</span>
                  </div>
                  <button class="delete-button" onclick="deleteTodo(${data[i].id})">Delete</button>
                </div>`;
            counterActive++;
          }
        }
        if (counterActive === 0) {
          listEl =
            listEl +
            `<div class="container-empty">
            <p>No tasks yet. Add one above!</p>
          </div>`;
        }
        listEl =
          listEl +
          `<div class="container-summary">
          <span id="summary" class="summary">${
            data.length - counterActive
          } of ${data.length} tasks completed</span>
          <span id="clear-completed" class="clearCompleted" onclick="clearCompletedFunction()"
            >Clear completed</span
          >
        </div>`;

        listContainerEl.innerHTML = listEl;
        break;
      case "complete-selected":
        counterCompleted = 0;
        for (let i = 0; i < data.length; i++) {
          if (data[i].status === "Completed") {
            listEl =
              listEl +
              `<div id="Container-listCompleted" class="list-box-completed">
                  <div class="container-checked-box flex">
                    <input type="checkbox" class="checkbox" checked onchange="changeStatus(${data[i].id})" />
                    <span>${data[i].title}</span>
                  </div>
                  <button class="delete-button" onclick="deleteTodo(${data[i].id})">Delete</button>
                </div>`;
            counterCompleted++;
          }
        }
        if (counterCompleted == 0) {
          listEl =
            listEl +
            `<div class="container-empty">
          <p>No tasks yet. Add one above!</p>
        </div>`;
        } else {
          listEl =
            listEl +
            `<div class="container-summary">
          <span id="summary" class="summary">${counterCompleted} of ${data.length} tasks completed</span>
          <span id="clear-completed" class="clearCompleted" onclick="clearCompletedFunction()"
            >Clear completed</span
          >
        </div>`;
        }

        listContainerEl.innerHTML = listEl;

        break;
    }
  }
}

render();

function deleteTodo(id) {
  let newArray = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].id !== id) {
      newArray.push(data[i]);
    }
  }
  data = newArray;
  render();
}

function clearCompletedFunction() {
 
  let newArray = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].status !== "Completed") {
      newArray.push(data[i]);
    }
  }
  data = newArray;

  render();
}

function changeStatus(id) {
  data= data.map((todo)=> {
    if (todo.id===id)  {
    todo.status= todo.status==="Active"? "Completed" :"Active" ;     
    }
    return todo;
  } )
  render();
}
