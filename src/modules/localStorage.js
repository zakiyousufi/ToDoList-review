const getLocalStorage = () => JSON.parse(localStorage.getItem('tasks'));
const setLocalStorage = (arrTasks) => {
  localStorage.setItem('tasks', JSON.stringify(arrTasks));
};

export { setLocalStorage, getLocalStorage };