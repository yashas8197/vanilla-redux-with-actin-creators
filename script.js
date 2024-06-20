import { createStore } from "redux";
import todoReducer from "./todoReducer";
import { addTodo, removeTodo } from "./actions";

const store = createStore(todoReducer);

store.subscribe(() => {
  console.log(store.getState());
  updateTodoList();
});

const todoInput = document.querySelector("#todoInput");
const addTodos = document.querySelector("#addTodo");
const todoList = document.querySelector("#todoList");

const addTodoHandler = () => {
  const todoValue = todoInput.value;
  if (todoValue) {
    store.dispatch(addTodo(todoValue));
  }
};

addTodos.addEventListener("click", addTodoHandler);

window.removeTodoHandler = (index) => {
  store.dispatch(removeTodo(index));
};

const updateTodoList = () => {
  const state = store.getState();
  todoList.innerHTML = state.todos
    .map(
      (todo, index) =>
        `<li>${todo}<button onClick="removeTodoHandler(${index})">remove</button></li>`,
    )
    .join("");
};

updateTodoList();
