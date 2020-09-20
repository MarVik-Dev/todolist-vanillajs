// Selectors
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todo')

// Event Listeners
document.addEventListener('DOMContentLoader', getTodos)
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck)
filterOption.addEventListener('input', filterTodo)

// Functions
function addTodo (event) {
// Prevent from submitting
  event.preventDefault()
  //   todo DIV
  const todoDiv = document.createElement('div')
  todoDiv.classList.add('todo')
  //   Create LI
  const newTodo = document.createElement('li')
  newTodo.innerText = todoInput.value
  newTodo.classList.add('todo-item')
  todoDiv.appendChild(newTodo)
  //   ADD TODO TO LOCALSTORAGE
  saveLocalTodos(todoInput.value)
  //   CHECK MARK BUTTON
  const completedButton = document.createElement('button')
  completedButton.innerHTML = '<i class="fas fa-check"></i>'
  completedButton.classList.add('completed-btn')
  todoDiv.appendChild(completedButton)
  //   CHECK TRASH BUTTON
  const trashButton = document.createElement('button')
  trashButton.innerHTML = '<i class="fas fa-trash"></i>'
  trashButton.classList.add('trash-btn')
  todoDiv.appendChild(trashButton)
  //   APPEND TO LIST
  todoList.appendChild(todoDiv)
  //   CLEAR todo INPUT VALUE
  todoInput.value = ''
}

function deleteCheck (e) {
  const item = e.target
  //   DELETE TODO
  if (item.classList[0] === 'trash-btn') {
    const todo = item.parentElement
    // ANIMATION
    todo.classList.add('fall')
    removeLocalTodos(todo)
    todo.addEventListener('transitionend', function () {
      todo.remove()
    })
  }
  //   CHECK MARK
  if (item.classList[0] === 'completed-btn') {
    const todo = item.parentElement
    todo.classList.toggle('completed')
  }
}

function filterTodo (e) {
  const todos = document.querySelectorAll('.todo')
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case 'all':
        todo.style.display = 'flex'
        break
      case 'completed':
        if (todo.classList.contains('completed')) {
          todo.style.display = 'flex'
        } else {
          todo.style.display = 'none'
        }
        break
      case 'uncompleted':
        if (!todo.classList.contains('completed')) {
          todo.style.display = 'flex'
        } else {
          todo.style.display = 'none'
        }
        break
    }
  })
}

function saveLocalTodos (todo) {
  // CHECK -- DO I ALREADY HAVE THING IN THERE?
  let todos
  if (localStorage.getItem('todos') === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }
  todos.push(todo)
  localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodos () {
  // CHECK -- DO I ALREADY HAVE THING IN THERE?
  let todos
  if (localStorage.getItem('todos') === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }
  todos.forEach(function (todo) {
    //   todo DIV
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')
    //   Create LI
    const newTodo = document.createElement('li')
    newTodo.innerText = todo
    newTodo.classList.add('todo-item')
    todoDiv.appendChild(newTodo)
    //   CHECK MARK BUTTON
    const completedButton = document.createElement('button')
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add('completed-btn')
    todoDiv.appendChild(completedButton)
    //   CHECK TRASH BUTTON
    const trashButton = document.createElement('button')
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add('trash-btn')
    todoDiv.appendChild(trashButton)
    //   APPEND TO LIST
    todoList.appendChild(todoDiv)
  })
}

function removeLocalTodos (todo) {
  // CHECK -- DO I ALREADY HAVE THING IN THERE?
  let todos
  if (localStorage.getItem('todos') === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }
  const todoIndex = todo.children[0].innerText
  todos.splice(todos.indexOf(todoIndex), 1)
  localStorage.setItem('todos', JSON.stringify(todos))
}
