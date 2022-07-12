import _, { endsWith } from 'lodash';// eslint-disable-line no-unused-vars
import './style.css';
import Task from './modules/lists.js';
import checkboxAction from './modules/interactivList.js';// eslint-disable-line import/no-cycle
import { setLocalStorage, getLocalStorage } from './modules/localStorage.js';

const tasksObject = new Task(getLocalStorage());
const creatNewTasks = () => {
  const { arrTasks } = tasksObject;
  arrTasks.sort((a, b) => a.index - b.index);
  const tasks = document.getElementById('tasks');
  tasks.innerHTML = '';
  const everyTasks = document.createElement('div');
  everyTasks.setAttribute('id', 'tasksDiv');
  everyTasks.classList.add('tasks');
  arrTasks.forEach((task) => {
    const everyTask = `<div class="task"><input type="checkbox" class="taskCheck" id="check${task.index}" ${task.completed ? 'checked' : ''}><input id="input${task.index}" type="text" class="taskInput ${task.completed ? 'completedTask' : ''}" name="task" value="${task.description}"><a id="remove${task.index}"><i class="fa-solid fa-trash-can"></i></a><i class="fa-solid fa-ellipsis-vertical drop"></i></div>
    `;
    everyTasks.insertAdjacentHTML('beforeend', everyTask);
  });
  tasks.appendChild(everyTasks);
  setLocalStorage(arrTasks);
  addEventListenerToTasks();// eslint-disable-line no-use-before-define
};
const removeTask = (event) => {
  const eventId = event.target.id;
  if (eventId.includes('remove')) {
    const index = parseInt(eventId.replace('remove', ''), 10);
    tasksObject.remove(index);
    creatNewTasks();
  }
};
const editTask = (event) => {
  const eventId = event.target.id;
  const description = event.target.value;
  if (eventId.includes('input')) {
    const index = parseInt(eventId.replace('input', ''), 10);
    if (description !== tasksObject.arrTasks[index].description) {
      tasksObject.edit(index, description);
      creatNewTasks();
    }
  }
};
const addEventListenerToTasks = () => {
  const taskDiv = document.getElementById('tasksDiv');
  taskDiv.addEventListener('click', (e) => removeTask(e));
  taskDiv.addEventListener('focusout', (e) => editTask(e));
  checkboxAction();
};

const addNewTask = () => {
  const inputAdd = document.getElementById('inputAdd');
  tasksObject.add(inputAdd.value);
  creatNewTasks();
  inputAdd.value = '';
};

const changeCompletedStatusInObject = (index) => {
  tasksObject.changeCompletedStatus(index);
  creatNewTasks();
};
const removeCompletedTasksAction = () => {
  tasksObject.removeCompletedTask();
  creatNewTasks();
};

window.addEventListener('DOMContentLoaded', () => {
  const addPart = document.getElementById('addPart');
  const inputAdd = document.createElement('input');
  const addButton = document.createElement('i');
  addButton.classList.add('fa-solid');
  addButton.classList.add('fa-plus');
  inputAdd.setAttribute('type', 'text');
  inputAdd.setAttribute('placeholder', 'Add to your list...');
  inputAdd.setAttribute('id', 'inputAdd');
  addPart.appendChild(inputAdd);
  addPart.appendChild(addButton);
  creatNewTasks();
  addButton.addEventListener('click', () => addNewTask());
  const clearCompletedTasks = document.getElementById('deletCompleted');
  const clearCompletedTasksBtn = document.createElement('a');
  clearCompletedTasksBtn.innerText = 'Clear all completed';
  clearCompletedTasksBtn.classList.add('completedTaskBtn');
  clearCompletedTasks.appendChild(clearCompletedTasksBtn);
  clearCompletedTasksBtn.addEventListener('click', () => removeCompletedTasksAction());
});

export default changeCompletedStatusInObject;